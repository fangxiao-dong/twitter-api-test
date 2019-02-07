# Twitter-Api-Test

This is a simple GET test for the twitter [search API](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html) with Oauth authentication. The test is written in Node.js and asserts:

1. the status code after sucessful GET request to the service
2. the JSON response contains the querying keyword if the tweet is not truncated.

The default query keyword is `@Telsa` but is parametrized in the `configs/meta.json` file so you can change the query to other word(s) you like. **Note**: If you change the keyword(s), you are also supposed to change the asserting regular expression in the test because expected values in the test assertions are hardcoded. Of course, you can update the test to paramaterize the assertion. But I do not like it because I think tests are meant to be verbose and it should assert what you are changing and is supposed to fail when source code is updated instead of sliently pass tests even though they are right. This makes test scripts easy to be understood by anyone who reads the scripts.

This is merely a play with the twitter search API. We can further expand this to do more fun things. For example, we can use this to do analysis of most frequently used words in tweets from famous person who likes to tweet frequently.

## Usage:

Make sure you have Node.js 8 installed since this project uses promisify for the http(s) request. In the project root directory, run:

1. `npm i`
2. `npm test`


