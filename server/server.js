const express = require('express')
const app = express()
const db  = require('./DatabaseUtils')
const port = 3000 

app.get('/testsql', (req, res) => {
    //db.selectQuery().from('node').where({name:'sami'}).execute()
    //db.insertQuery().into('node').fields(['name', 'nodeTypeId', 'description']).values(['Trunk', 3, 'Main stem of a tree']).execute();
    res.send('done');
})

app.use('/home', express.static('client/', {extensions: ['html']}))

app.get('/test', (req, res) => res.sendFile('/Users/ximas/Desktop/github/mindmapserver/client/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))