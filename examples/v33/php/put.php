<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://rest.facturame.mx/api/v3/businesses/cfdi/v33/007654KL32F8427129GRC3.json",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "PUT",
  CURLOPT_POSTFIELDS => "{\n\t\"cfdi\": {\n\t\t\"is_available\": true\n\t}\n}",
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json",
    "x-access-token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
