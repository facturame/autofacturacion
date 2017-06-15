require 'uri'
require 'net/http'

url = URI("https://rest.facturame.mx/api/v3/businesses/cfdi/v33.json")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request["x-access-token"] = 'YOUR TOKEN GOES HERE'
request.body = "{\n\t\"cfdi\": {\n\t\t\"ref_id\": \"123abc\",\n\t\t\"ticket_number\": \"QFAuxk5l6CWQ/xZyuFN2\",\n\t\t\"direct_emission\": false,\n\t\t\"branch_id\": 1,\n\t\t\"document\": \"DOCUMENT CONTENT GOES HERE\"\n\t}\n}"

response = http.request(request)
puts response.read_body