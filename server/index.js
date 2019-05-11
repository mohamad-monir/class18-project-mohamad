const app = require('./app');
//const axios = require('axios');

//axios.get(url).then(res => console.log(res.data));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`the server listening to http://localhost:${PORT}`));
