const axios = require("axios").default;
const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/awards', (req, res) => {
  const body = req.body;
  const url = body.url + '/.json'
  axios.get(url).then(response => {
    const json = response.data;
    console.log("Got response")
    if (json.length === 0) {
      throw 'Unable to read link'
    }
    const children = json[0].data.children
    if (children.length === 0) {
      throw 'Unable to read link'
    }
    const awards = children[0].data.all_awardings
    console.log("Sending response")
    res.json(awards.map(award => {
      return { name: award.name,
        price: award.coin_price,
        count: award.count, 
        image: award.resized_icons.find(img => img.width == 128).url,
        image_backup: award.icon_url,
        premium: award.days_of_premium
      }
        
    }))
  }).catch( error => {
    console.log(error)
    res.status = 400
    res.send(error)
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
