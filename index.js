const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const main = require('./routes/main')
const cors = require('cors');

const machines = require('./routes/machines');
const statusMachines = require("./routes/statusMachines");
const createdb = require("./routes/createdb")

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/', main)
app.use('/api/statusMachines', statusMachines)
app.use('/api/machines', machines)
app.use('/api/createdb', createdb)

app.listen(4000, () => console.log('Express Server  is listning on  port 4000'))
