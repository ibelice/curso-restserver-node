const express = require('express')
const cors = require('cors');
const { dbConennection } = require('../batabase/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();    
    }

    async conectarDB() {

        await dbConennection()
    }

    middlewares( ) {

        // Cors
        this.app.use(cors() );

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
       this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }

}





module.exports = Server;