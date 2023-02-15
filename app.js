// Required Modules
const express = require('express');
const https = require("http");
const fs = require("fs");
const parser = require('body-parser');

const app = express();

app.use(express.static('files'));
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "\\index.html");
})

app.post("/", (req, res) => {

    const userNumber = req.body.country_code + req.body.number;
    
    const url = `http://apilayer.net/api/validate?access_key=a79d3813ac372149da77b152dfca27ef&number=${userNumber}`;

    https.get(url, (response) => {
        response.on("data", (d) => {
            
            fs.writeFile(__dirname + "\\files/data.json",d, (err) => {
                if (err) {console.log(err);}
            })
        })
    })

    res.statusCode = 204;
    res.end();
})


app.listen(80, () => {
    console.log("Your server is running at Port 80")
});