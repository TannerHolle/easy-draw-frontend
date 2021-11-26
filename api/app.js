const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { mongoose } = require('./db/mongoose');

const { Project } = require('./db/models/project.model')
const { Company } = require('./db/models/company.model')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


//get all the projects in the database
app.get('/projects', (req, res) => {
  Project.find({}).then((projects) => {
    res.send(projects);
  }).catch((e) => {
    res.send(e);
  });
});

//get info for one of the projects in the database
app.get('/projects/:id', (req, res) => {
  Project.find({"_id": req.params.id}).then((projects) => {
    res.send(projects);
  }).catch((e) => {
    res.send(e);
  });
});

//Create a new project in the database
app.post('/projects', (req, res) => {
  let body = req.body;

  let newProject = new Project({
    name: body.name,
    address: body.address,
    homeOwners: body.homeOwners,
    phone: body.phone,
    email: body.email,
    budget: body.budget,
    categories: body.categories,
    draws: body.draws
  });
  console.log(newProject);

  newProject.save().then((projectDoc) => {
    res.send(projectDoc);
  });
});

//This is an api call to update a project in db
app.post('/projects/:id', (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  })
});

//This is an api call to delete a project in db
app.delete('/projects/:id', (req, res) => {
  Project.findOneAndRemove({
    _id: req.params.id
  }).then((removedProject) => {
    res.send(removedProject)
  });
})

//The next four api calls are for companies
//This is an api call to get all companies in db
app.get('/companies', (req, res) => {
  Company.find({}).then((companies) => {
    res.send(companies);
  }).catch((e) => {
    res.send(e);
  });
});

//This is an api call to create a new company in db
app.post('/companies', (req, res) => {
  let body = req.body;

  let newCompany = new Company({
    Name: body.Name,
    Address: body.Address,
    TaxID: body.TaxID,
    Notes: body.Notes
  });

  newCompany.save().then((companyDoc) => {
    res.send(companyDoc);
  });
});

//This is an api call to update a company in db
app.post('/companies/:id', (req, res) => {
  Company.findOneAndUpdate({ _id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  })
});

//This is an api call to delete a company in db
app.delete('/companies/:id', (req, res) => {
  Company.findOneAndRemove({
    _id: req.params.id
  }).then((removedCompany) => {
    res.send(removedCompany)
  });
})

















app.get('/projects', (req, res) => {
  Project.find({}).then((projects) => {
    res.send(projects);
  }).catch((e) => {
    res.send(e);
  });
});

app.post('/projects', (req, res) => {
  let title = req.body.title;

  let newProject = new Project({
    title
  });

  newProject.save().then((projectDoc) => {
    res.send(projectDoc);
  });

})


app.post("/api/projects", (req, res, next) => {
  const project = req.body;
  // console.log(project);
  res.status(201).json({
    message: 'project added successfully'
  });
});

app.get('/api/projects' , (req, res, next) => {
  const json = require("../src/app/models/projectTests.json");
  const projects = json.projects;
  res.status(200).json({
    message: 'invoices fetched Successfully',
    projects: projects
  });
});

app.get('/api/projects/:id/invoices' , (req, res, next) => {
  const json = require("../src/app/models/projectTests.json");
  const projects = json.projects;
  const invoices = projects.filter(obj => {
    return obj.projectId === id;
  });
  res.status(200).json({
    message: 'invoices fetched Successfully',
    invoices: invoices
  });
});

app.post("/api/:projectId/invoices/:invoiceId", (req, res, next) => {
  const invoice = req.body;
  //console.log(invoice);
  res.status(201).json({
    message: 'company added successfully'
  });
});

app.get('/api/invoices' , (req, res, next) => {
  const invoices = require("../src/assets/testInvoices.json");
  res.status(200).json({
    message: 'invoices fetched Successfully',
    invoices: invoices
  });
});

app.post("/api/companies", (req, res, next) => {
  const company = req.body;
  // console.log(company);
  res.status(201).json({
    message: 'company added successfully'
  });
});

app.get('/api/companies' , (req, res, next) => {
  const companies = [
    {id: "asdv231", Name: "E Builders", Address: "123 tanner st", TaxID: "2541", Notes: "This is the original Company"},
    {if: "asd5346as", Name: "Ivory Homes", Address: "589 tyler st", TaxID: "6985", Notes: ""}
  ];
  res.status(200).json({
    message: 'Companies fetched Successfully',
    companies: companies
  });
});



module.exports = app

// anhePHrVcNGba0L5
