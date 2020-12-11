const axios = require('axios').default;
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/awards', (req, res) => {
  const { body } = req;
  // if (body.url.contains('reddit.app.link')) {
  //   axios.get(body.url).then((response) => {

  //   });
  // }
  const url = `${body.url}/.json`;
  axios.get(url).then((response) => {
    const json = response.data;
    console.log('Got response');
    if (json.length === 0 || json[0].data.children.length === 0) {
      throw Error('Unable to read link');
    }

    const { data } = json[0].data.children[0];
    const subreddit = data.subreddit_name_prefixed;
    const { title, author, score } = data;
    const awards = data.all_awardings.map((award) => ({
      name: award.name,
      price: award.coin_price,
      count: award.count,
      image: award.resized_icons.find((img) => img.width === 128).url,
      image_backup: award.icon_url,
      premium: award.days_of_premium,
    }));

    console.log('Sending response');
    res.json({
      data: {
      title,
      subreddit,
      awards,
      author,
      score
      },
      message: '',
    });
  }).catch((error) => {
    console.log(error);
    res.status = 400;
    res.json({
      message: 'Invalid URL',
    });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
