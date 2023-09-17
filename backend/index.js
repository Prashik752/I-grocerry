const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")

mongoDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json())
const userRouter = require('./routes/Auth');
app.use('/api/auth', userRouter);


app.use(express.json())
const Displaydata = require('./routes/Displaydata');
app.use('/api/auth', Displaydata);

app.use(express.json())
app.use('/api/auth',require('./routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})