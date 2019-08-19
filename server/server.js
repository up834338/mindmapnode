'use-strict';
require('env2')('.env');
const express = require('express')
const app = express()
const NodeServices  = require('./NodeServices')
const bodyParser = require("body-parser");
const port = process.env.SERVER_PORT
const dir = process.env.SERVER_DIR;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/home', express.static('client/'))
app.use('/content', express.static('content/'))

app.get('/home', (req, res) => {
    res.sendFile(dir + '/client/index.html')
})

app.post('/createUpdateNode', async (req, res) => {
    let result = await NodeServices.createUpdateNode(req.body);
    res.json(result);
}) 

app.get('/listNodes', async (req, res) => {
    NodeServices.listNodes().then(data => {
        res.json(data);
    })
})

app.get('/listNodeTypes', async (req, res) => {
    let result = await NodeServices.listNodeTypes();
    res.json(result);
})

app.post('/getNode', async (req, res) => {
    let result = await NodeServices.getNode(req.body);
    res.json(result);
})

//delete node

// page requests

app.get('/createNodePage', (req, res) => {
    res.sendFile(dir + '/pages/createNode.html');
})

app.listen(port, () => console.log(`listening on port ${port}!`))