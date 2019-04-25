const validator = require('validator');

const requiredFields = [
  'link',
  'location_country',
  'location_city',
  'size_rooms',
  'price_value',
  'price_currency',
];

const validateHouse = houseObj => {
  let valid = true;
  let errors = [];

  if (typeof houseObj !== 'object') {
    valid = false;
    errors.push(`house should be object`);
  } else {
    requiredFields.forEach(field => {
      if (typeof houseObj[field] === 'undefined') {
        valid = false;
        errors.push(`${field}:is require`);
      }
    });
  }
  if (!validator.isURL(`${houseObj['link']}`)) {
    valid = false;
    errors.push(`valid link is require`);
  }
  if (!validator.isAlpha(`${houseObj['location_country']}`)) {
    valid = false;
    errors.push(`location_country is require`);
  }
  if (!validator.isAlpha(`${houseObj['location_city']}`)) {
    valid = false;
    errors.push(`location_city is require`);
  }
  if (!validator.isNumeric(`${houseObj['size_rooms']}`)) {
    valid = false;
    errors.push(`size_rooms is require`);
  }
  if (!validator.isNumeric(`${houseObj['price_value']}`)) {
    valid = false;
    errors.push(`price_value is require`);
  }
  if (!validator.isAlpha(`${houseObj['price_currency']}`)) {
    errors.push(`price_currency is require in euro`);
  }
  return {
    valid,
    errors,
    raw: houseObj,
  };
};

const houseObjAsParams = houseObj => {
  ['link', 'location_country', 'location_city', 'size_rooms', 'price_value', 'price_currency'].map(
    field => houseObj[field],
  );
};

module.exports = {
  validateHouse,
  houseObjAsParams,
};
