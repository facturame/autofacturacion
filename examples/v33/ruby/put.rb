require 'uri'
require 'net/http'

url = URI("https://rest.facturame.mx/api/v3/businesses/cfdi/v33/007654KL32F8427129GRC3.json")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Put.new(url)
request["content-type"] = 'application/json'
request["x-access-token"] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0'
request.body = "{\n\t\"cfdi\": {\n\t\t\"is_available\": true\n\t}\n}"

response = http.request(request)
puts response.read_body
