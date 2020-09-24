const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('241aa8df417f4b4f9980b7587e040c75');

module.exports = {
  async index (req, res) {
    try {
      await newsapi.v2.topHeadlines({
        country: 'br'
      }).then(news => res.header('x-total-count', news.totalResults));

      await newsapi.v2.topHeadlines({
        country: 'br',
        pagesize: 5,
        page: req.query.page,
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
      console.log(req.query.page);
      await newsapi.v2.topHeadlines(search).then(news => {res.send(news)});
    } catch (exception) {
      console.error(exception);
    }
  }
}