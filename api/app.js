const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { mongoose } = require('./db/mongoose');

const { Project } = require('./db/models/project.model')
const { Invoice } = require('./db/models/invoice.model')
const { Company } = require('./db/models/company.model')
const { Category } = require('./db/models/category.model')

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

app.use("/", express.static(path.join(__dirname, "angular")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"))
})

/* INVOICE API CALLS */

/**
 * POST /invoices
 * Purpose: Create a new invoice
 */
app.post('/api/invoices', (req, res) => {
  let body = req.body;

  let newInvoice = new Invoice({
    company: body.company,
    address: body.address,
    category: body.category,
    invoiceNum: body.invoiceNum,
    invoiceAmt: body.invoiceAmt,
  });

  console.log(newInvoice)
  console.log(body.project._id)

  Project.findOneAndUpdate(
    {
      "_id": req.body.project._id
    },
    { $push: { "draws.$[a].invoices": newInvoice } },
    {
      "new": true,
      "arrayFilters": [
        { "a.name": body.draw },
      ]
    }).then(() => {
          res.sendStatus(200)
    });
});

/* PROJECT API CALLS */

/**
 * GET /projects
 * Purpose: Get all projects in the db
 */
app.get('/api/projects', (req, res) => {
  Project.find({}).then((projects) => {
    res.send(projects);
  }).catch((e) => {
    res.send(e);
  });
});

/**
 * GET /projects/:id
 * Purpose: Get one project filtered by project id
 */
app.get('/api/projects/:id', (req, res) => {
  Project.find({"_id": req.params.id}).then((projects) => {
    console.log(projects)
    res.send(projects);
  }).catch((e) => {
    console.log(e)
    res.send(e);
  });
});

/**
 * POST /projects
 * Purpose: Create a new project
 */
app.post('/api/projects', (req, res) => {
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

/**
 * POST /projects/:id
 * Purpose: Update a project
 */
app.post('/api/projects/:id', (req, res) => {
  Project.findOneAndUpdate({ _id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  })
});

/**
 * DELETE /projects/:id
 * Purpose: Delete a project from the db
 */
app.delete('/api/projects/:id', (req, res) => {
  Project.findOneAndRemove({
    _id: req.params.id
  }).then((removedProject) => {
    res.send(removedProject)
  });
})

/* COMPANY API CALLS */

/**
 * GET /companies
 * Purpose: Get a list of all the companies
 */
app.get('/api/companies', (req, res) => {
  Company.find({}).then((companies) => {
    res.send(companies);
  }).catch((e) => {
    res.send(e);
  });
});

/**
 * POST /companies
 * Purpose: Create a new company
 */
app.post('/api/companies', (req, res) => {
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

/**
 * POST /companies/:id
 * Purpose: Update a company in the db
 */
app.post('/api/companies/:id', (req, res) => {
  Company.findOneAndUpdate({ _id: req.params.id}, {
    $set: req.body
  }).then(() => {
    res.sendStatus(200);
  })
});

/**
 * DELETE /companies/:id
 * Purpose: Delete a company from the db
 */
app.delete('/api/companies/:id', (req, res) => {
  Company.findOneAndRemove({
    _id: req.params.id
  }).then((removedCompany) => {
    res.send(removedCompany)
  });
});

/* Catgory API CALLS */

/**
 * POST /categories
 * Purpose: Create a new category
 */
 app.post('/api/categories', (req, res) => {
  let body = req.body;

  let newCategory = new Category({
    costCode: body.costCode,
    category: body.category,
    budget: body.budget,
  });

  console.log(newCategory);
  console.log(body.projectId);

  Project.findOneAndUpdate({ "_id": body.projectId},
    { $push: { "categories": newCategory } }).then(() => {
          res.sendStatus(200)
    });
});

module.exports = app

