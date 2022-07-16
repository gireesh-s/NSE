const Stock = require("../models/stock");

exports.createStock = (req, res) => {
    const data = req.body;
    const stock = new Stock(data);
    stock.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.status(200).json({
        data
      });
    });
};

exports.getAllStocks = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortby ? req.query.sortby : "name";
    Stock.find().sort([[sortBy, order]]).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        res.status(200).json(data);
    });
};

exports.getOneStock = (req, res) => {
    Stock.findOne({name: req.params.stockByName}).exec((err, stock) => {
      if (err || !stock) {
        return res.status(400).json({
          error: "Stock not found",
        });
      }
      res.status(200).json(stock);
    });
};

exports.searchStocks = (req, res) => {
    const regex = new RegExp(req.query.name, "i");
    Stock.find({ name: regex})
    .exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        } else if (result.length === 0) {
            return res.status(400).json({
                error: "Stock not found"
            })
        }
        res.status(200).json(result)
    })
}