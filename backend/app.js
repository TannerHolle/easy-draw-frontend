const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.post("/api/projects", (req, res, next) => {
  const project = req.body;
  // console.log(project);
  res.status(201).json({
    message: 'project added successfully'
  });
});

app.get('/api/projects' , (req, res, next) => {
  const json = require("/Users/tannerholle/Construction/easy-draw/src/app/models/projectTests.json");
  const projects = json.projects;
  res.status(200).json({
    message: 'invoices fetched Successfully',
    projects: projects
  });
});

app.get('/api/projects/:id/invoices' , (req, res, next) => {
  const json = require("/Users/tannerholle/Construction/easy-draw/src/app/models/projectTests.json");
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
  console.log(invoice);
  res.status(201).json({
    message: 'company added successfully'
  });
});

app.get('/api/invoices' , (req, res, next) => {
  const invoices = require("/Users/tannerholle/Construction/easy-draw/src/assets/testInvoices.json");
  res.status(200).json({
    message: 'invoices fetched Successfully',
    invoices: invoices
  });
});

app.post("/api/companies", (req, res, next) => {
  const company = req.body;
  console.log(company);
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
