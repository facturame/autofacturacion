package main

import (
	"fmt"
	"strings"
	"net/http"
	"io/ioutil"
)

func main() {

	url := "https://rest.facturame.mx/api/v3/businesses/remissions/007654KL32F8427129GRC3.json"

	payload := strings.NewReader("{\n\t\"remission\": {\n\t\t\"is_available\": true\n\t}\n}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("content-type", "application/json")
	req.Header.Add("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBQUEwMTAxMDFBQUEiLCJleHAiOjE1MjI5NDQ1OTR9.CiieMYi7392dsMRot-S-58DDOUwutYsUi_oMiPdAGq0")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
