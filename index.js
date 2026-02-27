const express = require('express');
const cors = require('cors'); // Importamos cors
const app = express();

// Middleware de CORS. Al dejarlo vacío, permite peticiones desde cualquier origen (ideal para desarrollo local).
app.use(cors());

// Middleware para poder recibir JSON en el body
app.use(express.json());

// Base de datos en memoria
const routes = [
  {
    id: 1,
    title: "Buena Vista",
    image: "./assets/images/landscape-1.webp",
    imageThumb: "./assets/images/landscape-1-thumb.webp",
    distance: "3.5 km",
    difficulty: "Fácil",
    time: "3 hrs",
    description: "Una de las mejores experiencias de senderismo en el Eje Cafetero se encuentra en Buenavista, un municipio conocido cariñosamente como el 'Balcón del Quindío' debido a su ubicación privilegiada en lo alto de una colina de la Cordillera Central, lo que le otorga las mejores vistas panorámicas de la región.",
    likes: 124,
    comments: [
      { author: "Juan Perez", text: "Excelente ruta, me encantó.", date: "12/02/2026" }
    ]
  },
  {
    id: 2,
    title: "Cascada del Silencio (Arenales)",
    image: "./assets/images/landscape-2.webp",
    imageThumb: "./assets/images/landscape-2-thumb.webp",
    distance: "5.2 km",
    difficulty: "Media",
    time: "4.5 hrs",
    description: "Un recorrido fascinante a través de densos bosques nativos y cruces de río que culmina en una majestuosa cascada escondida. Ideal para desconectar de la ciudad y conectar con la naturaleza, con varios tramos de ascensos moderados bajo la sombra de los árboles.",
    likes: 342,
    comments: [
      { author: "Ana M.", text: "El agua estaba helada pero valió la pena cada paso.", date: "20/02/2026" },
      { author: "Carlos G.", text: "Llevar buen calzado, hay mucho barro en la segunda mitad del trayecto.", date: "22/02/2026" }
    ]
  },
  {
    id: 3,
    title: "Cerro Tusa",
    image: "./assets/images/landscape-3.webp",
    imageThumb: "./assets/images/landscape-3-thumb.webp",
    distance: "4.8 km",
    difficulty: "Alta",
    time: "6 hrs",
    description: "El ascenso a la pirámide natural más alta del mundo. Una ruta muy exigente que requiere buena condición física y técnica de agarre, ya que la pendiente supera los 45 grados en varios tramos. La recompensa es una vista inigualable de 360 grados en la cumbre.",
    likes: 890,
    comments: [
      { author: "David", text: "La bajada es más dura que la subida. ¡Lleven guantes!", date: "24/02/2026" }
    ]
  }
];

const gallery = routes.map(route => ({
  id: route.id,
  image: route.imageThumb,
  title: route.title
}));

// 1. Endpoint GET: Obtener todas las rutas
app.get('/api/routes', (req, res) => {
  res.json(routes);
});

// 2. Endpoint GET: Obtener todas las galerías
app.get('/api/gallery', (req, res) => {
  res.json(gallery);
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
  if (newComment && newComment.author && newComment.text) {
    routes[routeIndex].comments.push({
      author: newComment.author,
      text: newComment.text,
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      })
    });
  }

  // Devolver la ruta actualizada
  res.json({
    message: 'Ruta actualizada con éxito',
    route: routes[routeIndex]
  });
});

// Estructura en memoria para los favoritos
// Formato esperado: { "uuid-del-usuario": [1, 2], "otro-uuid": [1] }
let userFavorites = {};

// 3. Endpoint POST: Agregar o quitar una ruta de favoritos (Toggle)
app.post('/api/routes/:id/favorite', (req, res) => {
  const routeId = parseInt(req.params.id);
  // Obtenemos el ID del usuario desde un header personalizado
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Falta el identificador del usuario (x-user-id en headers)' });
  }

  // Validar que la ruta principal exista
  const routeExists = routes.some(r => r.id === routeId);
  if (!routeExists) {
    return res.status(404).json({ error: 'Ruta no encontrada' });
  }

  // Si es la primera vez que este usuario guarda un favorito, inicializamos su array
  if (!userFavorites[userId]) {
    userFavorites[userId] = [];
  }

  const userFavs = userFavorites[userId];
  const index = userFavs.indexOf(routeId);

  // Si el ID ya está en su lista, lo quitamos (Desmarcar favorito)
  if (index !== -1) {
    userFavs.splice(index, 1);
    return res.json({
      message: 'Ruta removida de favoritos',
      favoriteIds: userFavs
    });
  } else {
    // Si no está, lo agregamos (Marcar favorito)
    userFavs.push(routeId);
    return res.json({
      message: 'Ruta agregada a favoritos',
      favoriteIds: userFavs
    });
  }
});

// 4. Endpoint GET: Obtener la lista de rutas favoritas completas de un usuario
app.get('/api/favorites', (req, res) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(400).json({ error: 'Falta el identificador del usuario' });
  }

  // Obtenemos los IDs guardados por el usuario (o un array vacío)
  const userFavsIds = userFavorites[userId] || [];

  // Filtramos la base de datos principal para devolver la data completa de esas rutas
  const favoriteRoutesData = routes.filter(r => userFavsIds.includes(r.id));

  res.json(favoriteRoutesData);
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});