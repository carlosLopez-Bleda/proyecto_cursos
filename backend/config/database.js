const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configurar conexión con Clever Cloud
const sequelize = new Sequelize(
    process.env.MYSQL_DB, // Nombre de la base de datos
    process.env.MYSQL_USER, // Usuario
    process.env.MYSQL_PASSWORD, // Contraseña
    {
        host: process.env.MYSQL_HOST, // Servidor
        port: process.env.MYSQL_PORT, // Puerto (3306)
        dialect: 'mysql',
        logging: false // Desactiva logs SQL en consola
    }
);

// Verificar conexión
sequelize.authenticate()
    .then(() => console.log('✅ Conectado a MySQL en Clever Cloud'))
    .catch(err => console.error('❌ Error al conectar con MySQL:', err));

module.exports = sequelize;
