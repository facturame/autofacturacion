var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://rest.facturame.mx/api/v3/businesses/cfdi/v33.json",
  "method": "POST",
  "headers": {
    "content-type": "application/json",
    "x-access-token": "YOUR TOKEN GOES HERE"
  },
  "processData": false,
  "data": "{\n\t\"cfdi\": {\n\t\t\"ref_id\": \"123abc\",\n\t\t\"ticket_number\": \"QFAuxk5l6CWQ/xZyuFN2\",\n\t\t\"direct_emission\": false,\n\t\t\"branch_id\": 1,\n\t\t\"document\": \"DOCUMENT CONTENT GOES HERE\"\n\t}\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});