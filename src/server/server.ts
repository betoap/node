import * as express from 'express';
import * as http from 'http';
import * as bodyParser from "body-parser";
import { normalizePort, onError, onListening, Proxy } from '../utils/utils';

export class Server {
    // Create a new express application instance
    _application: express.Application;

    // Instance http
    _server:http.Server;

    // The port the express app will listen on
    _port: string | number | boolean;

    constructor() {
        this._application = express();
        this._server = http.createServer( this._application );
        this._port = normalizePort( process.env.PORT || 3000 );
        this.middleware();
    }

    public getServer (): http.Server {
        return this._server;
    }

    bootstrap(): Promise<Server>{
        return this.routes().then( () => this );
    }

    routes(): Promise<any>{
        return new Promise( Proxy.create( this, this.handleRoutes ) );
    }

    handleRoutes( resolve, reject ) {
        try {
            this._server.listen( this._port, Proxy.create( this, this.handleListen, resolve ) );
            this._server.on('error', onError( this._server ) );
            this._server.on('listening', onListening( this._server ) );
        } catch (error) {
            reject( error );
        }
    }

    handleListen ( resolve ) {
        resolve( this._server );
    }

    private middleware(): void{
        //this._application.use( logger('dev') );
        //this._application.use(this._cors());
        this._application.disable('x-powered-by');
        this._application.use( bodyParser.json() );
        this._application.use( bodyParser.urlencoded( { extended: false } ) );
    }
}