const express = require('express')
const Twitter = require('twitter')
const {CONSUMER_KEY, CONSUMER_SECRET, BEARER_TOKEN} = require('./config')

const app = express();

const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  bearer_token: BEARER_TOKEN
});


app.set("port", process.env.PORT || 3001);


// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


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

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
