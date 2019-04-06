const apiRouter = require('express').Router();

const fakeDB = [
  {
    houseId: 1,
    price: 300000,
    description: `3 rooms house`,
  },
  {
    houseId: 2,
    price: 150000,
    description: `1 room flat `,
  },
  {
    houseId: 3,
    price: 200000,
    description: `2 rooms flat`,
  },
];

let lastId = 3;
apiRouter
  .route('/houses')
  .get((req, res) => {
    res.send(fakeDB);
  })
  .post((req, res) => {
    let { price, description } = req.body;

    if (typeof price === 'undefined') {
      res.status(400).end(`price field is require`);
      return;
    }

    price = parseInt(price, 10);
    if (Number.isNaN(price) || price <= 0) {
      res.status(400).end(`the price should be positive`);
      return;
    } else {
      lastId++;

      const house = {
        houseId: lastId,
        price: price,
        description: description,
      };
      fakeDB.push(house);
      res.send(house);
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
