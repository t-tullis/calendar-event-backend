require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();

const pusher = new Pusher({
  appId: '568543',
  key: '6b3be05eee9a693f04ec',
  secret: 'aa4bd08caf417a21284e',
  cluster: 'us2'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) =>{
  res.send('Server used to post events')
});

app.post('/schedule', (req, res) => {
const {body} = req;
const data = {
  ...body,
};

pusher.trigger('schedule', 'new-event', data);
res.json(data);
})

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`server started on port ${port}`)
})