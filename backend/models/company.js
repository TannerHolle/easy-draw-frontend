const mongoose = require("mongoose");


const companySchema = mongoose.Schema({
  Name: { type: String, required: true },
  Address: { type: String, required: true },
  TaxID: { type: String, required: true },
  Notes: { type: String, required: true },
});

