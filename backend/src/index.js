const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

app.listen(config.port, async ()=>{
    console.log(`Server started at PORT ${config.port}`);
    await mongoose.connect(config.mongoose.url);
    console.log("Database connected");
})