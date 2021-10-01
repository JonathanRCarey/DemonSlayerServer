require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");
//app.use(require("./middleware/headers"));
const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

app.use(require("./middleware/validate-jwt"));

app.use("/demon", controllers.demonslayercontroller);


dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3000, () => {
        console.log('[Server]: App is listening on 3000.');
    });
})

.catch((err) => {
    console.log('[Server]: Server Crashed. Error = ${err}');
})

app.use('/test', (req, res) => {
    res.send('This is a message from the test endpoint on the server!')
});

app.use("/demon", controllers.demonslayercontroller);