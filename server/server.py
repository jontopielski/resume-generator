from flask import Flask, request, jsonify
from pylatex import Document, Section, Subsection, Command, Package, UnsafeCommand, Tabular
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

class rSubsectionEnv(Environment):
  _latex_name = 'rSubsection'

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

  # if (not is_json_valid(json_body)):
    # return error_message('Problem validating json in request body with json-schema.')
  print json_body

  doc = Document('resume', documentclass='resume')

  geometry_options = 'left=0.25in,top=0.25in,right=0.25in,bottom=0.25in'
  doc.preamble.append(Package('geometry', options=geometry_options))

  resume_sections = json_body['sections']

  section_dict = {}

  for i in range(0, len(resume_sections)):
    section_dict[resume_sections[i]['sectionName']] = resume_sections[i]

  if 'header' in section_dict:
    header_data = section_dict['header']
    # TODO: Perform phone number and email validation on FE
    subheader_str = NoEscape('(%s)~$\cdot$~%s~$\cdot$~%s \\\\ %s' % (
      header_data['phoneNumber'][0:3],
      header_data['phoneNumber'][3:6],
      header_data['phoneNumber'][6:10],
      header_data['email']
    ))
    doc.preamble.append(Command('name', header_data['name']))
    doc.preamble.append(Command('address', subheader_str))

  if 'education' in section_dict:
    with doc.create(RSectionEnv(arguments='Education')) as education_section:
      education_data = section_dict['education']
      university_str = NoEscape('{\\bf %s} \\hfill {\\em Expected %s}' % (
        education_data['college'],
        education_data['graduationDate']
      ))
      degree_str = NoEscape('\\\\ %s' % (education_data['degreeType']))
      is_major_gpa_str = 'Major ' if education_data['isMajorGpa'] else ''
      gpa_str = NoEscape('\\\\ %sGPA: {\\bf %s/%s}' % (
        is_major_gpa_str,
        education_data['gpa'],
        education_data['maxGpa']
      ))
      education_section.append(university_str)
      education_section.append(degree_str)
      education_section.append(gpa_str)

  for i in range(0, len(resume_sections)):
    section_data = resume_sections[i]
    section_name = section_data['sectionName']
    if is_special_section(section_name):
      continue
    with doc.create(RSectionEnv(arguments=section_name.title())) as curr_section:
      section_items = section_data['listItems']
      for j in range(0, len(section_items)):
        curr_item = section_items[j]
        date_worked_str = '%s - %s' % (curr_item['startDate'], curr_item['endDate'])
        with doc.create(rSubsectionEnv(arguments=(
          curr_item['primaryText'],
          date_worked_str,
          curr_item['secondaryText'],
          curr_item['location'])
        )) as curr_subsection:
          description_items = section_items[j]['descriptionItems']
          for k in range(0, len(description_items)):
            description_str = NoEscape('\\item %s' % description_items[k])
            curr_subsection.append(description_str)

  if 'skills' in section_dict:
    with doc.create(RSectionEnv(arguments='Skills')) as skills_section:
      with doc.create(Tabular(NoEscape('@{} >{\\bfseries}l @{\\hspace{6ex}} l'))) as skills_table:
        skills_list = section_dict['skills']['skillsList']
        for i in range(0, len(skills_list)):
          skill_name = skills_list[i]['listName']
          list_items = skills_list[i]['listItems']
          skills_str = NoEscape('%s & %s \\\\' % (skill_name, ', '.join(list_items)))
          skills_table.append(skills_str)
  

  print 'Generating pdf..'
  doc.generate_pdf()
  doc.generate_tex()

  populate_aws_credentials()

  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  f = open('resume.pdf', 'rb')
  print 'Uploading file..'
  conn.upload('resume.pdf', f, 'resume-gen')

  return jsonify('Ok')

# This generates using the JSON directly created by the FE forms
@app.route('/create_test', methods=['POST'])
def create_latex():
  try:
    json_body = json_loads_byteified(json.dumps(request.get_json(), ensure_ascii=False))
  except:
    return error_message('Unable to convert json in request body to readable format.')

  if json_body is None:
    return error_message('No valid json found in request body.')

  # if (not is_json_valid(json_body)):
    # return error_message('Problem validating json in request body with json-schema.')
  print json_body

  doc = Document('resume', documentclass='resume')

  geometry_options = 'left=0.25in,top=0.25in,right=0.25in,bottom=0.25in'
  doc.preamble.append(Package('geometry', options=geometry_options))

  if 'header' in json_body:
    header_data = json_body['header']
    # TODO: Perform phone number and email validation on FE
    subheader_str = NoEscape('(%s)~$\cdot$~%s~$\cdot$~%s \\\\ %s' % (
      header_data['phoneNumber'][0:3],
      header_data['phoneNumber'][3:6],
      header_data['phoneNumber'][6:10],
      header_data['email']
    ))
    doc.preamble.append(Command('name', header_data['name']))
    doc.preamble.append(Command('address', subheader_str))

  if 'education' in json_body:
    with doc.create(RSectionEnv(arguments='Education')) as education_section:
      education_data = json_body['education']
      university_str = NoEscape('{\\bf %s} \\hfill {\\em Expected %s}' % (
        education_data['college'],
        education_data['graduationDate']
      ))
      degree_str = NoEscape('\\\\ %s' % (education_data['degreeType']))
      is_major_gpa_str = 'Major ' if not not education_data['isMajorGpa'] else ''
      gpa_str = NoEscape('\\\\ %sGPA: {\\bf %s/%s}' % (
        is_major_gpa_str,
        education_data['gpa'],
        education_data['maxGpa']
      ))
      education_section.append(university_str)
      education_section.append(degree_str)
      education_section.append(gpa_str)

  if 'experience' in json_body:
    with doc.create(RSectionEnv(arguments='Experience')) as curr_section:
      section_items = json_body['experience']
      for j in range(0, len(section_items)):
        curr_item = section_items[j]
        date_worked_str = '%s - %s' % (curr_item['startDate'], curr_item['endDate'])
        with doc.create(rSubsectionEnv(arguments=(
          curr_item['primaryText'],
          date_worked_str,
          curr_item['secondaryText'],
          curr_item['location'])
        )) as curr_subsection:
          description_items = section_items[j]['descriptionItems']
          for k in range(0, len(description_items)):
            description_str = NoEscape('\\item %s' % description_items[k])
            curr_subsection.append(description_str)


  if 'projects' in json_body:
    with doc.create(RSectionEnv(arguments='Projects')) as curr_section:
      section_items = json_body['projects']
      for j in range(0, len(section_items)):
        curr_item = section_items[j]
        date_worked_str = '%s - %s' % (curr_item['startDate'], curr_item['endDate'])
        with doc.create(rSubsectionEnv(arguments=(
          curr_item['primaryText'],
          date_worked_str,
          curr_item['secondaryText'],
          curr_item['location'])
        )) as curr_subsection:
          description_items = section_items[j]['descriptionItems']
          for k in range(0, len(description_items)):
            description_str = NoEscape('\\item %s' % description_items[k])
            curr_subsection.append(description_str)

  if 'relevant-coursework' in json_body:
    with doc.create(RSectionEnv(arguments='Relevant Coursework')) as curr_section:
      section_items = json_body['experience']
      for j in range(0, len(section_items)):
        curr_item = section_items[j]
        date_worked_str = '%s - %s' % (curr_item['startDate'], curr_item['endDate'])
        with doc.create(rSubsectionEnv(arguments=(
          curr_item['primaryText'],
          date_worked_str,
          curr_item['secondaryText'],
          curr_item['location'])
        )) as curr_subsection:
          description_items = section_items[j]['descriptionItems']
          for k in range(0, len(description_items)):
            description_str = NoEscape('\\item %s' % description_items[k])
            curr_subsection.append(description_str)

  if 'skills' in json_body:
    with doc.create(RSectionEnv(arguments='Skills')) as skills_section:
      with doc.create(Tabular(NoEscape('@{} >{\\bfseries}l @{\\hspace{6ex}} l'))) as skills_table:
        skills_list = json_body['skills']['listItems']
        for i in range(0, len(skills_list)):
          skill_name = skills_list[i]['listName']
          list_items = skills_list[i]['listItems']
          skills_str = NoEscape('%s & %s \\\\' % (skill_name, ', '.join(list_items)))
          skills_table.append(skills_str)
  

  print 'Generating pdf..'
  doc.generate_pdf()
  doc.generate_tex()

  populate_aws_credentials()

  conn = tinys3.Connection(aws_access_id, aws_secret_id, endpoint='s3-us-west-2.amazonaws.com')
  f = open('resume.pdf', 'rb')
  print 'Uploading file..'
  conn.upload('resume.pdf', f, 'resume-gen')

  return jsonify('Ok')

def is_json_valid(json_data):
  json_schema_file = 'resume-json-schema.json'
  try:
    json_schema = json_load_byteified(open(json_schema_file))
  except IOError:
    print 'Error: Cannot open %s,' % (json_schema_file)
    return False

  try:
      validate(json_data, json_schema)
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

def is_special_section(section_name):
  special_sections = [
    'header',
    'education',
    'skills'
  ]
  for i in range(0, len(special_sections)):
    if section_name == special_sections[i]:
      return True
  return False

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