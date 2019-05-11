const apiRouter = require('express').Router();
const { addInfo } = require('../dataBase/query.js');
const { execQuery, connection } = require('../dataBase/db.js');
const { validateHouse } = require('../validation');

apiRouter
  .route('/houses')
  .get(async (req, res) => {
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

    const queryBody = `
    from houses 
    where 
    ${condition.join(' and ')} 
    `;

    const queryItem = `
    select * 
    ${queryBody}
    order by 
    ${(connection.escapeId(order_field), true)} ${order_direction}
    limit ${HOUSES_PER_PAGE}
    offset ${offset}
    `;
    const queryTotal = ` 
  select count(id) as total
  ${queryBody}
  `;

    try {
      const total = await execQuery(queryTotal, params);
      const item = await execQuery(queryItem, params);
      return res.json({ total: total[0].total, item, pageSize: HOUSES_PER_PAGE });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

    return res.json({ totalHouses, itemHouses });
  })
  .post((req, res) => {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'data should be an array' });
    }

    const processedData = req.body.map(validateHouse);

    const validHouses = [];
    const invalidHouses = [];

    processedData.forEach(house => {
      if (house.valid) {
        validHouses.push(house);
      } else {
        invalidHouses.push(house);
      }
    });

    const report = {
      valid: validHouses.length,
      invalid: invalidHouses,
    };

    if (validHouses.length) {
      try {
        validHouses.map(house => {
          return addInfo(house.raw);
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

apiRouter.use((req, res) => {
  res.status(404).end();
});

module.exports = apiRouter;
