'use strict';
//calling express module
const express = require('express');
//init app
const app = express();
//loading more dependencies
//body parser help us to obtain data from the request in order to procces it
const bodyParser = require('body-parser');
// setting up Cors packages
const cors = require('cors');
let contacts = require('./data');
// using our other depedencies on our express app

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// hostname and port configuration
const hostname  = 'localhost';
const port = 3001;

// Set up endpoints
// gel all contacts
app.get('/api/contacts',(request,response) => {

    if(!contacts){
        response.status(404).json({message: "No contacts found"});
    }
    else{
        response.json(contacts);
    }

});
// get contact by id
app.get('/api/contacts/:id',(request, response) => {
    var requestId = request.params.id;
    let contact = contacts.filter( contact => {
        return contact.id == requestId;
    });

    if(!contact[0]){
       console.log(contact[0]);
        response.status(404).json({message : 'Contact not found, check it out'});
        console.log('brr');

    }
    response.json(contact[0]);
});

// save contact
app.post('/api/contacts',(request,response) =>{
    const contact = {
        id: contacts.length + 1,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        email: request.body.email,
        website: request.body.website
    }
    contacts.push(contact);
    response.status(200).json({message:'New contact created'});
});
// update contact

app.put('/api/contacts/:id',(request,response)=>{
    var requestId = request.params.id;
    let contact = contacts.filter(contact => {
        return contact.id == requestId;
    })[0];
    
    var index = contacts.indexOf(contact);

    var keys = Object.keys(request.body);
    keys.forEach(key =>{
        contact[key] = request.body[key];
    });
    contacts[index] = contact;
    response.status(200).json({message:'Contact updated',contact: contacts[index]});
});
// delete contact
app.delete('/api/contacts/:id',(request,response) =>{
    
    var requestId = request.params.id ;
    var contact = contacts.filter(contact => {
        return contact.id == requestId;
    })[0];
    var indexToDelete = contacts.indexOf(contact);
    contacts.splice(indexToDelete,1);
    response.status(200).json({message:'Contact '+indexToDelete+' deleted'});
});
app.listen(port,hostname, () => {
  console.log('App started on http://'+ hostname+':'+port);
});