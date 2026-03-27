var trailService = require('../services/trail.service')

exports.getTrails = (_req, res) => {
  try {
    const ans = trailService.getTrails();
    res.json(ans);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

exports.getTrailById = (req, res) => {
  try {
    const ans = trailService.getTrailById(req.params.id);
    if (ans) {
      res.json(ans);
    } else {
      res.status(404).send('Trail not found');
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}

exports.updateTrail = (req, res) => {
  try {
    const ans = trailService.updateTrail(req.params.id, req.body);
    res.json(ans);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

exports.createTrail = (req, res) => {
  try {
    const ans = trailService.createTrail(req.body);
    res.json(ans);
  } catch (e) {
    res.status(400).send(e.message);
  }
}