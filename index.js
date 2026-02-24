const express = require('express');
const cors = require('cors'); // Importamos cors
const app = express();

// Middleware de CORS. Al dejarlo vacío, permite peticiones desde cualquier origen (ideal para desarrollo local).
app.use(cors());

// Middleware para poder recibir JSON en el body
app.use(express.json());

// Base de datos en memoria
let routes = [
  {
    "id": 1,
    "name": "Ruta 1",
    "image": "https://via.placeholder.com/150",
    "thumbnail": "https://via.placeholder.com/150",
    "description": "Descripción de la ruta 1",
    "distance": 10,
    "duration": "1 hora",
    "difficulty": "fácil",
    "likes": 10,
    "comments": [
      {
        "id": 1,
        "name": "Comentario 1",
        "description": "Descripción del comentario 1"
      }
    ]
  }
];

// 1. Endpoint GET: Obtener todas las rutas
app.get('/api/routes', (req, res) => {
  res.json(routes);
});

// 2. Endpoint PATCH: Actualizar likes y/o agregar comentarios
app.patch('/api/routes/:id', (req, res) => {
  const routeId = parseInt(req.params.id);
  const { likes, newComment } = req.body;

  // Buscar la ruta por ID
  const routeIndex = routes.findIndex(r => r.id === routeId);

  if (routeIndex === -1) {
    return res.status(404).json({ error: 'Ruta no encontrada' });
  }

  // Si envían una nueva cantidad de likes, se actualiza
  if (likes !== undefined) {
    routes[routeIndex].likes = likes;
  }

  // Si envían un nuevo comentario, se agrega
  if (newComment && newComment.name && newComment.description) {
    const nextCommentId = routes[routeIndex].comments.length > 0
      ? Math.max(...routes[routeIndex].comments.map(c => c.id)) + 1
      : 1;

    routes[routeIndex].comments.push({
      id: nextCommentId,
      name: newComment.name,
      description: newComment.description
    });
  }

  // Devolver la ruta actualizada
  res.json({
    message: 'Ruta actualizada con éxito',
    route: routes[routeIndex]
  });
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});