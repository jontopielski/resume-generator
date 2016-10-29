from flask import Flask, request
from pylatex import Document, Section, Subsection, Command, Package
from pylatex.utils import italic, NoEscape
import tinys3
import sys, fileinput

app = Flask(__name__)

aws_access_id = ''
aws_secret_id = ''

def populate_aws_credentials():
  global aws_access_id
  global aws_secret_id
  f = open('.aws_credentials', 'r+')
  keys = f.read().splitlines()
  aws_access_id = keys[0]
  aws_secret_id = keys[1]
  f.close()

@app.route('/')
def hello_world():
  return 'Hello, World!'

def fill_document(doc):
  """Add a section, a subsection and some text to the document.

  :param doc: the document
  :type doc: :class:`pylatex.document.Document` instance
  """
  with doc.create(Section('A section')):
      doc.append('Some regular text and some ')
      doc.append(italic('italic text. '))

      with doc.create(Subsection('A subsection')):
          doc.append('Also some crazy characters: $&#{}')

@app.route('/generate', methods=['POST'])
def generate_latex():
  print '/generate endpoint hit'
  if 'name' not in request.args or 'email' not in request.args or 'phoneNumber' not in request.args:
      return 'Missing parameters in request header'

  print 'Proper parameters passed in..'

  geometry_options = 'left=0.25in,top=0.25in,right=0.25in,bottom=0.25in'

  doc = Document('resume', documentclass='resume')

  # TODO: Perform phone number and email validation on FE
  subheader_str = NoEscape('(%s)~$\cdot$~%s~$\cdot$~%s \\\\ %s' % (request.args['phoneNumber'][0:3], request.args['phoneNumber'][3:6], request.args['phoneNumber'][6:10], request.args['email']))
  
  doc.preamble.append(Package('geometry', options=geometry_options))
  doc.preamble.append(Command('name', request.args['name']))
  doc.preamble.append(Command('address', subheader_str))

  doc.create(Section('Education'))

  print 'Generating pdf..'
  doc.generate_pdf()
  doc.generate_tex()

  populate_aws_credentials()

  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  f = open('resume.pdf', 'rb')
  print 'Uploading file..'
  conn.upload('resume.pdf',f,'resume-gen')


  return 'Ok'

if __name__ == "__main__":
  app.run()