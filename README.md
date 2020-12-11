# How Much Reddit Gold?

Deployed at [howmuchreddit.gold](http://www.howmuchreddit.gold)

Inspired by a reddit post asking how much reddit premium a user would've received from the awards on a post, I decided to create a quick website to visualise how many times a reddit post has been awarded. It gives info on the different types of awards, the amount of premium the Original Poster would have received, and the number of coins used and their equivalent value in USD (wildly innaccurate - I imagine most awards are redeemed with free coins reddit gives out).

## Description

This is a simple React app with an Express backend with only one endpoint. Originally I intended to use the reddit API, but all of the information I needed was already included in the reddit post's JSON. The only issue with this is that it can be *slow* - the JSON for the [one of the most upvoted posts ever](https://www.reddit.com/r/news/comments/jptqj9/joe_biden_elected_president_of_the_united_states/), announcing Joe Biden's victory in the 2020 election, can take more than 20s for the server to respond. Nevertheless, this made for simple work to sift through and find the information I needed.

## ToDo

- Reddit's new app links, `reddit.app.link`, do not work. They are redirected when opened in a browser, and so I need to work on this.
- No mobile support atm, need to add some table responsiveness.
- Also some prettier number formatting etc.