const express = require('express');
const fs = require('fs');
const hospitalData = require("./data/hospital.json");

const app = new express();
app.use(express.json());

// Routing for GET and POST start
app.route("/hospital")
    .get((request, response) => {
        response.send(hospitalData);
    })
    .post((request, response) => {
        hospitalData.push(request.body);
        fs.writeFile("./data/hospital.json", JSON.stringify(hospitalData), (error) => {
            if (error) {
                response.send("Error happened while creating!!!")
            }
            else {
                response.send("Created Successfully!!!")
            }
        })
    })
// Routing for GET and POST end

// Routing for PUT and DELETE start
app.route("/hospital/:id")
    .put((request, response) => {
        let id = request.params.id;
        hospitalData.forEach((array) => {
            if (array.hospitalId === id) {
                array.hospitalName = request.body.hospitalName;
                array.patientCount = request.body.patientCount;
                array.hospitalLocation = request.body.hospitalLocation;
            }
        })
        fs.writeFile("./data/hospital.json", JSON.stringify(hospitalData), (error) => {
            if (error) {
                response.send("Error happened while Updating!!!")
            }
            else {
                response.send("Updated Successfully!!!")
            }
        })
    })
    .delete((request, response) => {
        const id = request.params.id;
        const newHopsitalData = hospitalData.filter(array => array.hospitalId !== id);
        fs.writeFile("./data/hospital.json", JSON.stringify(newHopsitalData), (error) => {
            if (error) {
                response.send("Error Happened while deleting!!!")
            }
            else {
                response.send("Deleted Successfully!!!")
            }
        })
    })
// Routing for PUT and DELETE end

// Server listener
app.listen(3000, () => {
    console.log("Server is Running on the PORT 3000");
})