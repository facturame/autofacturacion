import requests

url = "https://rest.facturame.mx/api/v3/businesses/cfdi/v33/007654KL32F8427129GRC3.json"

payload = "{\n\t\"cfdi\": {\n\t\t\"is_available\": true\n\t}\n}"
headers = {
    'content-type': "application/json",
    'x-access-token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0"
    }

response = requests.request("PUT", url, data=payload, headers=headers)

print(response.text)
