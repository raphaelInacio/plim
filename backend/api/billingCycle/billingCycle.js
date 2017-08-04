const restFul = require('node-restful')
const mongoose = restFul.mongoose

const creditSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        min: 0,
        require: true
    }
})

const debtSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        min: 0,
        require: true
    },
    status: {
        type: String,
        require: true,
        uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    }
})

const billingCycle = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    month: {
        type: Number,
        min: 1,
        max: 12,
        require: true
    },
    year: {
        type: Number,
        min: 1970,
        max: 2100,
        require: true
    },
    credits: [creditSchema],
    debits: [debtSchema]
})

module.exports = restFul.model('BillingCycle', billingCycle)