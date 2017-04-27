var client = new RestClient("https://rest.facturame.mx/api/v3/businesses/remissions/007654KL32F8427129GRC3.json");
var request = new RestRequest(Method.PUT);
request.AddHeader("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0");
request.AddHeader("content-type", "application/json");
request.AddParameter("application/json", "{\n\t\"remission\": {\n\t\t\"is_available\": true\n\t}\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);

