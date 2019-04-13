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
  return {
    valid,
    errors,
    raw: houseObj,
  };
};

module.exports = {
  validateHouse,
};
