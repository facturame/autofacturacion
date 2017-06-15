curl --request POST \
  --url https://rest.facturame.mx/api/v3/businesses/cfdi/v33.json \
  --header 'content-type: application/json' \
  --header 'x-access-token: YOUR TOKEN GOES HERE' \
  --data '{\n	"cfdi": {\n		"ref_id": "123abc",\n		"ticket_number": "QFAuxk5l6CWQ/xZyuFN2",\n		"direct_emission": false,\n		"branch_id": 1,\n		"document": "DOCUMENT CONTENT GOES HERE"\n	}\n}'