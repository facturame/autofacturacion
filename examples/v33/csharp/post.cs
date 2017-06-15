var client = new RestClient("https://rest.facturame.mx/api/v3/businesses/cfdi/v33.json");
var request = new RestRequest(Method.POST);
request.AddHeader("x-access-token", "YOUR TOKEN GOES HERE");
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\n\t\"cfdi\": {\n\t\t\"ref_id\": \"123abc\",\n\t\t\"ticket_number\": \"QFAuxk5l6CWQ/xZyuFN2\",\n\t\t\"direct_emission\": false,\n\t\t\"branch_id\": 1,\n\t\t\"document\": \"DOCUMENT CONTENT GOES HERE\"\n\t}\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);