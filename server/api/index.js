const apiRouter = require('express').Router();
const { addInfo, bringInfo, formData } = require('../dataBase/query.js');
const { validateHouse } = require('../validation');

apiRouter
  .route('/houses')
  .get((req, res) => {
    console.log(req.query);
    let {
      price_min = 0,
      price_max = 1000000,
      order = 'location_country_asc',
      page = 1,
      location_city = '',
    } = req.query;

    price_min = parseInt(price_min, 10);

    if (Number.isNaN(price_min) || price_min < 0) {
      return res.status(400).json({
        error: `the price_min should be positive number`,
      });
    }

    price_max = parseInt(price_max, 10);

    if (Number.isNaN(price_max) || price_max < 0) {
      return res.status(400).json({
        error: `the price_max should be positive number`,
      });
    }

    if (price_max <= price_min) {
      return res.status(400).json({
        error: `the price max should be higher than price min`,
      });
    }

    page = parseInt(page, 10);

    if (Number.isNaN(page) || page <= 0) {
      return res.status(400).json({
        error: `the page should positive number `,
      });
    }

    let order_field,
      order_direction = 'asc';

    let index = order.lastIndexOf('_');
    if (index > 0) {
      order_field = order.slice(0, index);
      order_direction = order.slice(index + 1);
      console.log(order_field, order_direction);

      if (['asc', 'desc'].indexOf(order_direction) === -1) {
        return res.status(400).json({
          error: `'order' params is wrong`,
        });
      }
    } else {
      return res.status(400).json({
        error: `'order' params is wrong`,
      });
    }

    const HOUSES_PER_PAGE = 3;
    const offset = (page - 1) * HOUSES_PER_PAGE;
    const condition = [`(price_value between ? and ?)`];
    const params = [price_min, price_max];

    if (location_city.length) {
      condition.push(`location_city=?`);
      params.push(location_city);
    }

    formData(condition, order_field, order_direction, HOUSES_PER_PAGE, offset, params).then(
      result => res.send(result),
    );
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

// apiRouter.route(`/houses/list`).get((req, res) => {
//   bringInfo().then(result => res.send(result));
// });

// apiRouter
//   .route('/houses/:id')
//   .get((req, res) => {
//     const { id } = req.params;
//     const item = fakeDB.find(house => {
//       return house.houseId === parseInt(id, 10);
//     });
//     console.log(id);
//     if (item) {
//       res.json(item);
//     } else {
//       res.send(`there is no house with this ID`);
//     }
//   })
//   .delete((req, res) => {
//     const { id } = req.params;

//     const index = fakeDB.findIndex(house => {
//       return house.houseId === parseInt(id, 10);
//     });

//     if (index > -1) {
//       fakeDB.splice(index, 1);

//       res.send(`this house id ${index} was deleted`);
//     } else {
//       res.send(`there is no house with this id`);
//     }
//   });

// apiRouter.use((req, res) => {
//   res.status(404).end();
// });

module.exports = apiRouter;
