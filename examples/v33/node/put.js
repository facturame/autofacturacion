var http = require("https");

var options = {
  "method": "PUT",
  "hostname": "rest.facturame.mx",
  "port": null,
  "path": "/api/v3/businesses/cfdi/v33/007654KL32F8427129GRC3.json",
  "headers": {
    "content-type": "application/json",
    "x-access-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0",
    "content-length": "45"
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

req.write(JSON.stringify({ cfdi: { is_available: true } }));
req.end();
