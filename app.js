const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const bodyParser = require('body-parser');
const dbConfig = require('./utils/dbConfig');
const authApi = require('./api/routes/userAuthApi')
const homeController = require('./models/homeController')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', homeController.getHome)
app.use('/auth', authApi)



app.listen(process.env.PORT, ()=>{
    console.log(`server started successfully!!! at port ${process.env.PORT}`)
    dbConfig.connect(() => console.log('DB connection established'))
})