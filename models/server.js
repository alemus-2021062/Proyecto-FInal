const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.categoriasPath = '/api/categorias'
        this.adminPath = '/api/admin'
        this.clientPath = '/api/client'
        this.carritoPath = '/api/carrito'
        this.facturaPath = '/api/factura'
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
        this.app.use(this.adminPath, require('../routes/admin'));
        this.app.use(this.clientPath, require('../routes/client'));
        this.app.use(this.productosPath , require('../routes/producto'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.carritoPath, require('../routes/carrito')),
        this.app.use(this.facturaPath, require('../routes/factura'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en el puerto ', this.port);
        })
    }

}

module.exports = Server;