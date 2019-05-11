const { execQuery, connection, mysql } = require('./db.js');

// we should resive an array here
async function addInfo(house) {
  try {
    await execQuery(`INSERT INTO houses SET ?`, house);
  } catch (error) {
    throw error;
    console.log(error, 'query');
  }
}

async function bringInfo() {
  try {
    const data = await execQuery(`SELECT * FROM houses`);
    return data;
  } catch (error) {
    console.log(error, 'query');
  }
}

module.exports = {
  addInfo,
  bringInfo,
};
