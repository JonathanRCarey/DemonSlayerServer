require("dotenv").config();
const express = require('express');
const app = express();
const dbConnection = require("./db");
const controllers = require("./controllers");
app.use(express.json());
app.use(require("./middleware/headers"));

let user = require("./controllers/usercontroller");
app.use("/user", user)


app.use(require("./middleware/validate-jwt"));

let demon= require("./controllers/demonslayercontroller");
app.use("/demon", demon)



dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(4000, () => {
        console.log('[Server]: App is listening on 4000.');
    });
})

.catch((err) => {
    console.log(`[Server]: Server Crashed. Error = ${err}`);
})

// app.use('/test', (req, res) => {
//     res.send('This is a message from the test endpoint on the server!')
// });

//app.use("/demon", controllers.demonslayercontroller);