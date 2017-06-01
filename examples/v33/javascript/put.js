var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://rest.facturame.mx/api/v3/businesses/cfdi/v33/007654KL32F8427129GRC3.json",
  "method": "PUT",
  "headers": {
    "content-type": "application/json",
    "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0"
  },
  "processData": false,
  "data": "{\n\t\"cfdi\": {\n\t\t\"is_available\": true\n\t}\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
