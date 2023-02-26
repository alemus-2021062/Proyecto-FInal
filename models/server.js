const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriasPath = '/api/categorias'
        this.usuariosPath = '/api/usuarios'
        this.productosPath = '/api/productos'
        this.authPath = '/api/auth'

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConection()
    }

    middlewares(){

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.categoriasPath, require('../routes/categoria'));
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.productosPath , require('../routes/producto'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }

}

module.exports = Server;