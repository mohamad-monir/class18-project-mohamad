const db = require('./db.js');

const addHouses = `
INSERT INTO houses(
    link,
    location_country,
    location_city,
    size_rooms,
    price_value,
    price_currency
)values ?;
`;

// we should resive an array here
async function addInfo(house) {
  try {
    await db.execQuery(`INSERT INTO houses SET ?`, house);
  } catch (error) {
    console.log(error);
  }
}

async function bringInfo() {
  try {
    const data = await db.execQuery(`SELECT * FROM houses`);
    console.log(data, 'query');
    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addInfo,
  bringInfo,
};

// [
//   {
//     "link": "http://funda.nl/url",
//     "location_country": "Iraq",
//     "location_city": "baghdad",
//     "size_rooms": 2,
//     "price_value": 200150,
//     "price_currency": "EURO",
//   },
//   {
//     "link": "HI",
//     "location_city": "baghdad",
//     "size_rooms": "two",
//     "price_value": "$ 200150.00",
//     "price_currency": "USD",
//   },
// ];
