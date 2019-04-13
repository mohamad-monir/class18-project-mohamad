const apiRouter = require('express').Router();
const { addInfo, bringInfo } = require('../dataBase/query.js');
const { validateHouse } = require('../validation');

apiRouter
  .route('/houses')
  .get((req, res) => {
    bringInfo().then(result => res.send(result));
  })
  .post((req, res) => {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'data should be an array' });
    }

    const processedData = req.body.map(validateHouse);

    const validData = [];
    const invalidData = [];

    processedData.forEach(el => {
      if (el.valid) {
        validData.push(el);
      } else {
        invalidData.push(el);
      }
    });

    const report = {
      valid: validData.length,
      invalid: invalidData,
    };

    if (validData.length) {
      try {
        validData.map(el => {
          return addInfo(el.raw);
        });
        return res.send(report);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }
    } else {
      res.json(report);
    }
  });

apiRouter
  .route('/houses/:id')
  .get((req, res) => {
    const { id } = req.params;
    const item = fakeDB.find(house => {
      return house.houseId === parseInt(id, 10);
    });
    console.log(id);
    if (item) {
      res.json(item);
    } else {
      res.send(`there is no house with this ID`);
    }
  })
  .delete((req, res) => {
    const { id } = req.params;

    const index = fakeDB.findIndex(house => {
      return house.houseId === parseInt(id, 10);
    });

    if (index > -1) {
      fakeDB.splice(index, 1);

      res.send(`this house id ${index} was deleted`);
    } else {
      res.send(`there is no house with this id`);
    }
  });

apiRouter.use((req, res) => {
  res.status(404).end();
});

module.exports = apiRouter;
