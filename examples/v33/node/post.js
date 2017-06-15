var http = require("https");

var options = {
  "method": "POST",
  "hostname": "rest.facturame.mx",
  "port": null,
  "path": "/api/v3/businesses/cfdi/v33.json",
  "headers": {
    "content-type": "application/json",
    "x-access-token": "YOUR TOKEN GOES HERE",
    "content-length": "171"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.write(JSON.stringify({ cfdi: 
   { ref_id: '123abc',
     ticket_number: 'QFAuxk5l6CWQ/xZyuFN2',
     direct_emission: false,
     branch_id: 1,
     document: 'DOCUMENT CONTENT GOES HERE' } }));
req.end();