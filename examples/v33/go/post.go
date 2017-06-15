package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rest.facturame.mx/api/v3/businesses/cfdi/v33.json"

	payload := strings.NewReader("{\n\t\"cfdi\": {\n\t\t\"ref_id\": \"123abc\",\n\t\t\"ticket_number\": \"QFAuxk5l6CWQ/xZyuFN2\",\n\t\t\"direct_emission\": false,\n\t\t\"branch_id\": 1,\n\t\t\"document\": \"DOCUMENT CONTENT GOES HERE\"\n\t}\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("x-access-token", "YOUR TOKEN GOES HERE")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}