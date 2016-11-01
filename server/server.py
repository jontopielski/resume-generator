from flask import Flask, request, jsonify
from pylatex import Document, Section, Subsection, Command, Package, UnsafeCommand
from pylatex.base_classes import Environment
from pylatex.utils import italic, NoEscape
from jsonschema import validate, ValidationError, SchemaError
import json
import tinys3
import sys, fileinput

app = Flask(__name__)

aws_access_id = ''
aws_secret_id = ''

class RSectionEnv(Environment):
  _latex_name = 'rSection'

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
  try:
    json_body = json_loads_byteified(json.dumps(request.get_json(), ensure_ascii=False))
  except:
    return error_message('Unable to convert json in request body to readable format.')

  if json_body is None:
    return error_message('No valid json found in request body.')

  if (not is_json_valid(json_body)):
    return error_message('Problem validating json in request body with json-schema.')

  geometry_options = 'left=0.25in,top=0.25in,right=0.25in,bottom=0.25in'

  doc = Document('resume', documentclass='resume')

  # TODO: Perform phone number and email validation on FE
  subheader_str = NoEscape('(%s)~$\cdot$~%s~$\cdot$~%s \\\\ %s' %
      (
        request.args['phoneNumber'][0:3],
        request.args['phoneNumber'][3:6],
        request.args['phoneNumber'][6:10],
        request.args['email']
      ))

  # TODO: Read the JSON file and properly populate all the fields.
  
  doc.preamble.append(Package('geometry', options=geometry_options))
  doc.preamble.append(Command('name', request.args['name']))
  doc.preamble.append(Command('address', subheader_str))

  # doc.append(Environment('rSection', options=1, arguments=['Education']))
  with doc.create(RSectionEnv(arguments='Education')) as env:
    env.append('Education Section')

  with doc.create(RSectionEnv(arguments='Experience')) as env:
    env.append('Experience Section')

  with doc.create(RSectionEnv(arguments='Projects')) as env:
    env.append('Projects Section')

  with doc.create(RSectionEnv(arguments='Relevant Coursework')) as env:
    env.append('Relevant Coursework Section')

  with doc.create(RSectionEnv(arguments='Skills')) as env:
    env.append('Skills Section')

  print 'Generating pdf..'
  doc.generate_pdf()
  doc.generate_tex()

  populate_aws_credentials()

  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  f = open('resume.pdf', 'rb')
  print 'Uploading file..'
  conn.upload('resume.pdf',f,'resume-gen')

  return 'Ok'

def is_json_valid(json_data):
  json_schema_file = 'resume-json-schema.json'
  try:
    json_schema = json_load_byteified(open(json_schema_file))
  except IOError:
    print 'Error: Cannot open %s,' % (json_schema_file)
    return False

  try:
      validate(json_data, schema)
  except SchemaError:
    print 'Error: Invalid JSON Schema being used. Check %s.' % json_schema_file
    return False
  except ValidationError as err:
    print 'Error: Passed JSON not valid under %s. \nErrorMessage: %s.' % (json_schema_file, err)
    return False
  except:
    print 'Error: Something unexpected happened.'
    raise
  return True

def error_message(message):
  return jsonify({
    'error_message': message  
    }
  )

def json_load_byteified(file_handle):
    return byteify(
        json.load(file_handle, object_hook=byteify),
        ignore_dicts=True
    )

def json_loads_byteified(json_text):
    return byteify(
        json.loads(json_text, object_hook=byteify),
        ignore_dicts=True
    )


def byteify(data, ignore_dicts = False):
    # if this is a unicode string, return its string representation
    if isinstance(data, unicode):
        return data.encode('utf-8')
    # if this is a list of values, return list of byteified values
    if isinstance(data, list):
        return [ byteify(item, ignore_dicts=True) for item in data ]
    # if this is a dictionary, return dictionary of byteified keys and values
    # but only if we haven't already byteified it
    if isinstance(data, dict) and not ignore_dicts:
        return {
            byteify(key, ignore_dicts=True): byteify(value, ignore_dicts=True)
            for key, value in data.iteritems()
        }
    # if it's anything else, return it in its original form
    return data

if __name__ == "__main__":
  app.run()