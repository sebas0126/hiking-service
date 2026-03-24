var trailService = require('../services/trail.service')

exports.getTrails = (req, res) => {
  try {
    const ans = trailService.getTrails()
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

exports.updateTrail = (req, res) => {
  try {
    const ans = trailService.updateTrail(req.params.id, req.body)
    res.json(ans)
  } catch (e) {
    res.status(400).send(e.message)
  }
}