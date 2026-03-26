const newsletterService = require('../services/newsletter.service');

exports.subscribe = (req, res) => {
  console.log(req.body);
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send('Email is required');
    }
    const ans = newsletterService.subscribe(email);
    res.json(ans);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
