HttpResponse<String> response = Unirest.put("https://rest.facturame.mx/api/v3/businesses/remissions/007654KL32F8427129GRC3.json")
  .header("content-type", "application/json")
  .header("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0")
  .body("{\n\t\"remission\": {\n\t\t\"is_available\": true\n\t}\n}")
  .asString();
