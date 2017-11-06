const express = require('express')
const Twitter = require('twitter')
const {CONSUMER_KEY, CONSUMER_SECRET, BEARER_TOKEN} = require('./config')
const path = require('path')

const app = express();

const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  bearer_token: BEARER_TOKEN
});


app.set("port", process.env.PORT || 3001);

app.get("/api/search", (req, res) => {
  const param = req.query.q;

  const options = {
    q: param,
    result_type: 'recent',
    count: 20
  }

  client.get('search/tweets', options, function (error, tweets, response) {
    res.json(tweets);
  });
});


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  const staticFiles = express.static("client/build")
  app.use(staticFiles)
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
  });
}

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
