const express = require('express');
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require('fs');
const cors = require("cors");

const {dbConnection} = require("../db/config");
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //conectar a BD
        this.dbConnection();

        //middlewares
        this.addOptions();

        //rutas de aplicación
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    addOptions(){
        this.app.use(cors())
        this.app.set('views', path.join(__dirname+'\\..\\', 'views'));
        this.app.set('view engine', 'hbs');
        this.app.use(logger('dev'));
        //Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    /**
     * Permite cargar las rutas de archivos que se agregan en la carpeta routes de forma dinamica, no permite premite
     * creación recursiva de carpetas
     */
    async routes() {
        const directoryPath = path.join(__dirname, '/../routes');
        var app = this.app;
        await fs
            .readdirSync(directoryPath, (err, files)=>{
                if (err) {
                    return console.log('Unable to scan directory: ' + err);
                }
            })
            .forEach( (file) => {
                file = file.replace('.js','');
                const routeGenerate = require(`./../routes/${file}`);
                if(file.includes('index')){
                    file = file.replace('index','');
                }
                this.app.use(`/${file}`, routeGenerate);
            });
    }

    getApp(){
        return this.app;
    }
}

module.exports = Server;