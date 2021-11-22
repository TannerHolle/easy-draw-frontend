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

app.post("/api/invoices", (req, res, next) => {
  const invoice = req.body;
  console.log(invoice);
  res.status(201).json({
    message: 'company added successfully'
  });
});

app.get('/api/invoices' , (req, res, next) => {
  const invoices = [
    {id: "asdv231", company: "tanners Plumbing", companyAddress: "123 tanner st", project: "2541", category: "Plumbing", invoiceNum: "2541", invoiceAmt: "5232.00"},
    {id: "dgn123", company: "tylers framing", companyAddress: "123 tyler st", project: "2541", category: "Framing", invoiceNum: "5212", invoiceAmt: "6532.00"},
  ];
  res.status(200).json({
    message: 'invoices fetched Successfully',
    invoices: invoices
  });
});

module.exports = app

// anhePHrVcNGba0L5
