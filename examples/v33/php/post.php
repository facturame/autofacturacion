<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://rest.facturame.mx/api/v3/businesses/cfdi/v33.json",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"cfdi\": {\n\t\t\"ref_id\": \"123abc\",\n\t\t\"ticket_number\": \"QFAuxk5l6CWQ/xZyuFN2\",\n\t\t\"direct_emission\": false,\n\t\t\"branch_id\": 1,\n\t\t\"document\": \"DOCUMENT CONTENT GOES HERE\"\n\t}\n}",
  CURLOPT_HTTPHEADER => array(
    "content-type: application/json",
    "x-access-token: YOUR TOKEN GOES HERE"
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