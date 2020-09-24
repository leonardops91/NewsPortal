const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('241aa8df417f4b4f9980b7587e040c75');

module.exports = {
  async index (req, res) {
    try {
      await newsapi.v2.topHeadlines({
        country: 'br',
      })
      .then(news => {
        return res.send(news);
      })


    } catch (exception) {
      console.error(exception);
    }
  },
  async search (req, res) {
    try {
      const search = req.query;
      await newsapi.v2.topHeadlines(search).then(news => {res.send(news)});
    } catch (exception) {
      console.error(exception);
    }
  }
}