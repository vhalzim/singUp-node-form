const { response } = require("express");
const express = require ("express");
const https = require ("https");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", (req,res)=>{
 res.sendFile(__dirname + "public/index.html")
})

app.post("/", (req,res)=>{
    var fName = req.body.fName;
    var lName = req.body.lName;
    var eMail = req.body.eMail;
    
    var data = {
        list_id: "1e90313361",
        members:[{
            email_address: eMail,
            status:"subscribed",
            merge_fields:{
                FNAME: fName,
                LNAME:lName,
            }
        }]
    }

    var jsonData = JSON.stringify(data)
    const url ="https://us10.api.mailchimp.com/3.0/lists/1e90313361"
    const options= {
        method:"POST",
        auth: "Carinao1:fe0d7950da74bfc10eb01836ef622f75-us10",

    }
    const httpRequest = https.request(url, options, (response)=>{
        response.on("data", (data)=>{
            (console.log(JSON.parse(data)))
        })

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/public/success.html")
        } else {
            res.sendFile(__dirname + "/public/error.html")
        }
    })
    


    httpRequest.write(jsonData);
    httpRequest.end();





})

app.post("/error", (req,res)=>{
    res.redirect("/")

})





app.listen("3000", ()=>{
    console.log("the server is running in port 3000")
})

//fe0d7950da74bfc10eb01836ef622f75-us10
//1e90313361