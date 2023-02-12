const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let addressbook = [
  {
    id: 1,
    firstname: "Joe",
    familyname: "Mama",
    phonenumber: "123-123-1234",
    email: "joemama@gmail.com",
  },
  {
    id: 2,
    firstname: "Tom",
    familyname: "Cruise",
    phonenumber: "123-456-5467",
    email: "tomcruise@gmail.com",
  },
  {
    id: 3,
    firstname: "Bob",
    familyname: "Builder",
    phonenumber: "123-789-7890",
    email: "bobbuilder@gmail.com",
  },
];

let counter = 3;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.get("/api/contacts", (req, res) => {
  res.send(addressbook);
});

app.post("/api/contacts", (req, res) => {
  const contact = {
    id: ++counter,
    firstname: req.body.firstname,
    familyname: req.body.familyname,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
  };
  addressbook.push(contact);
  res.send(contact);
});

app.delete("/api/contacts", (req, res) => {
  res.send(addressbook);
  addressbook = [];
  counter = 0;
});

app.get("/api/contacts/:contactId", (req, res) => {
  const contact = addressbook.find(
    (c) => c.id === parseInt(req.params.contactId)
  );
  if (!contact) {
    res.status(404).send("Contact not found");
  } else {
    res.send(contact);
  }
});

app.put("/api/contacts/:contactId", (req, res) => {
  const contact = addressbook.find(
    (c) => c.id === parseInt(req.params.contactId)
  );
  if (!contact) {
    res.status(404).send("Contact not found");
  } else {
    const index = addressbook.indexOf(contact);
    addressbook[index] = {
      id: parseInt(req.params.contactId),
      firstname: req.body.firstname,
      familyname: req.body.familyname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
    };
    res.send(addressbook[index]);
  }
});

app.delete("/api/contacts/:contactId", (req, res) => {
  const contact = addressbook.find(
    (c) => c.id === parseInt(req.params.contactId)
  );
  if (!contact) {
    res.status(404).send("Contact not found");
  } else {
    const index = addressbook.indexOf(contact);
    addressbook.splice(index, 1);
    res.send(contact);
  }
});
