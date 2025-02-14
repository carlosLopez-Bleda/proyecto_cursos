const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const sequelize = require('./config/database'); // Conexión a MySQL

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Conectar a la base de datos
sequelize.sync()
    .then(() => console.log("✅ Conectado a MySQL y base de datos sincronizada"))
    .catch(err => console.error("❌ Error al conectar con MySQL:", err));

// ✅ Importar rutas de la API
const cursosRoutes = require('./routes/cursos');
const centrosRoutes = require('./routes/centros');
const alumnosRoutes = require('./routes/alumnos');
const matriculasRoutes = require('./routes/matriculas');
const estadisticasRoutes = require('./routes/estadisticas');

app.use('/api/cursos', cursosRoutes);
app.use('/api/centros', centrosRoutes);
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/matriculas', matriculasRoutes);
app.use('/api/estadisticas', estadisticasRoutes);


// ✅ Servir archivos estáticos desde "frontend/public"
app.use('/public', express.static(path.join(__dirname, '../frontend/public')));
app.get('/test-static', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/js/main.js'));
});
// ✅ Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/views/index.html'));
});

// ✅ Ruta dinámica para otras páginas en "frontend/views"
const paginasValidas = ['index', 'cursos', 'gestion', 'estadisticas', 'alumnos', 'centros'];

app.get('/:pagina', (req, res) => {
    const pagina = req.params.pagina;
    const filePath = path.join(__dirname, `../frontend/views/${pagina}.html`);

    if (paginasValidas.includes(pagina)) {
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error(`❌ Error al cargar ${pagina}.html:`, err);
                res.status(500).send('❌ Error interno del servidor');
            }
        });
    } else {
        res.status(404).send('<h1>❌ Página no encontrada</h1>');
    }
});

// ✅ Ruta de prueba
app.get('/test', (req, res) => {
    res.send('✅ Servidor corriendo y conectado a MySQL');
});

// ✅ Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
