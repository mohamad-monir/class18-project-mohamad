const { execQuery, connection, mysql } = require('./db.js');

// we should resive an array here
async function addInfo(house) {
  try {
    await execQuery(`INSERT INTO houses SET ?`, house);
  } catch (error) {
    console.log(error, 'query');
  }
}

async function bringInfo() {
  try {
    const data = await execQuery(`SELECT * FROM houses`);
    console.log(data, 'query');
    return data;
  } catch (error) {
    console.log(error, 'query');
  }
}

async function formData(condition, order_field, order_direction, HOUSES_PER_PAGE, offset, params) {
  try {
    const data = await execQuery(
      `
      Select * from houses 
      where 
      ${condition.join(' and ')} 
      order by 
      ${(connection.escapeId(order_field), true)} ${order_direction}
      limit ${HOUSES_PER_PAGE}
      offset ${offset}
      `,
      params,
    );
    return data;
  } catch (err) {
    console.log(err, `query new`);
  }
}

module.exports = {
  addInfo,
  bringInfo,
  formData,
};
