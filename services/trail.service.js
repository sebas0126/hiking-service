const trails = require('../constants/trails.json')

exports.getTrails = () => {
  try {
    return trails;
  } catch (e) {
    throw Error(e)
  }
}

exports.updateTrail = (req, res) => {
  const routeId = parseInt(req.params.id);
  const { likes, newComment } = req.body;

  const routeIndex = routes.findIndex(r => r.id === routeId);

  if (routeIndex === -1) {
    return res.status(404).json({ error: 'Ruta no encontrada' });
  }

  if (likes !== undefined) {
    routes[routeIndex].likes = likes;
  }

  if (newComment && newComment.author && newComment.text) {
    routes[routeIndex].comments.push({
      author: newComment.author,
      text: newComment.text,
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    });
  }

  res.json({
    message: 'Ruta actualizada con éxito',
    route: routes[routeIndex]
  });
}