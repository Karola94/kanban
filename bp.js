const express = require('express');
const app = express();
const fetch = require('axios');

var cors = require("cors");
var allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:8080",
	"http://127.0.01:8080",
];
var bodyParser = require('body-parser')
const formidable = require('express-formidable');

app.use(bodyParser.urlencoded());

var myHeaders = {
    'X-Client-Id': '4191',
    'X-Auth-Token': '14dd3f89adf48badf8e81f0e073c5c8f'
};

const port = 3000

app.use(
  cors({
    origin: function(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use(formidable());

app.use((req, res) => {
  fetch({
    headers: myHeaders,
    method: req.method,
    url: String(req.url).slice(1),
    data: req.fields,
  }).then(function(resp) {
      res.send(resp.data)
      // console.log(resp.data);
  }).catch(err => {
    res.send('error')
    // console.log(err);
  })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
