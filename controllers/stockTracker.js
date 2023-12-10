const stockTrackerModel = require('../models/stockTrackerModel');

exports.getProducts = (req, res, next) => {
    stockTrackerModel.findAll()
    .then(stock => {
      res.json({ stock });
      console.log(stock);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.deleteProducts = async(req, res, next) => {
  const uId = req.params.id;
  await stockTrackerModel.destroy({where:{id:uId}});
  res.sendStatus(200);
};

exports.postAddExpense = async (req, res, next) => {
  const candyNames = req.body.candyNames;
  const descriptions = req.body.descriptions;
  const prices = req.body.prices;
  const quantitys = req.body.quantitys;

  try {
    // Check if amounts is provided and not null
    const data = await stockTrackerModel.create({ candyNames, descriptions, prices, quantitys });
    res.status(201).json({ newExpenseDetail: data });
    console.log("The value is added");
  } 
  
  catch (error) {
    console.log("The value is not added");
    console.error('Error in Controller.js file. Controller.js main galti hai', error);
  }
};

exports.postEditProduct = (req, res, next) => {
  const ExpenseId = req.params.ExpenseId;
  const candyNames = req.body.candyNames;
  const descriptions = req.body.descriptions;
  const prices = req.body.prices;
  const quantitys = req.body.quantitys;

  stockTrackerModel.findByPk(ExpenseId)
    .then(stock => {
      if (!stock) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      stock.candyNames = candyNames;
      stock.descriptions = descriptions;
      stock.prices = prices;
      stock.quantitys = quantitys;

      return stock.save();
    })
    .then(updatedstock => {
      res.json({ stock: updatedstock });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const ExpenseId = req.params.ExpenseId;

  Expense.findByPk(ExpenseId)
    .then(Expense => {
      if (!Expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      return Expense.destroy();
    })
    .then(() => {
      res.json({ message: 'Expense deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
