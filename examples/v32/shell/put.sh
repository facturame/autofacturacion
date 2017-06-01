curl --request PUT \
  --url https://rest.facturame.mx/api/v3/businesses/remissions/007654KL32F8427129GRC3.json \
  --header 'content-type: application/json' \
  --header 'x-access-token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0' \
  --data '{\n	"remission": {\n		"is_available": true\n	}\n}'
