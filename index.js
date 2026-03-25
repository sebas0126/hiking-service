require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Importamos cors
const app = express();
const trailRoute = require('./routes/trail.route');
const favoriteRoute = require('./routes/favorite.route');
const galleryRoute = require('./routes/gallery.route');

// 1. Definimos un array con los dominios que tienen permiso
const allowedOrigins = [
  'https://sebas0126.github.io', // Tu frontend en GitHub Pages
  'http://127.0.0.1:5500'        // Entorno local
];

// 2. Configuramos el middleware de CORS con esas opciones
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir peticiones que no tienen origen (como Postman o curl)
    if (!origin) return callback(null, true);

    // Si el origen de la petición está en nuestro array, lo dejamos pasar
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Si no está, bloqueamos la petición
      callback(new Error('No permitido por CORS'));
    }
  }
};

// Usamos la configuración
app.use(cors(corsOptions));

// Middleware para poder recibir JSON en el body
app.use(express.json());

// Rutas
app.use(trailRoute);
app.use(galleryRoute);
app.use(favoriteRoute);

// Iniciar el servidor en el puerto 3001
const PORT = process.env.PORT || 3001;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.listen(PORT, HOSTNAME, () => {
  console.log(`Servidor corriendo en http://${HOSTNAME}:${PORT}`);
});