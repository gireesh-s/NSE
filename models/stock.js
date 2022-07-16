const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    currentMarketPrice: {
        type: Number,
        required: true,
    },
    marketCap: {
        type: Number,
        required: true,
    },
    stockPE: {
        type: Number,
        required: true,
    },
    dividendYield: {
        type: Number,
        required: true,
    },
    roce: {
        type: Number,
        required: true,
    },
    roePreviousAnnum: {
        type: Number,
        required: true,
    },
    debtToEquity: {
        type: Number,
        required: true,
    },
    eps: {
        type: Number,
        required: true,
    },
    reserves: {
        type: Number,
        required: true,
    },
    debt: {
        type: Number,
        required: true,
    },
}, { timestamps: true }
)

module.exports = mongoose.model("Stock", stockSchema);