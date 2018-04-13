import sendgrid
import os
from sendgrid.helpers.mail import *

os.system('source sendgrid.env')

input_from_email = raw_input("From: ")
input_to_email = raw_input("To: ")
input_subject = raw_input("Subject: ")
input_content = raw_input("Content: ")

sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
from_email = Email(input_from_email)
to_email = Email(input_to_email)
subject = input_subject
content = Content("text/plain", input_content)
mail = Mail(from_email, subject, to_email, content)
response = sg.client.mail.send.post(request_body=mail.get())
print("\n" + str(response.status_code))
print(response.body)
print(response.headers)
