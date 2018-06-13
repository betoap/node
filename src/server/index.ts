import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as graphqlHTTP from 'express-graphql';
import { normalizePort, onError, onListening, Proxy } from '../utils';
import { Graphql } from '../core/graphql';
import { Sequelize } from 'sequelize-typescript';

export class Server {
    // Create a new express application instance
    private _application: express.Application;

    // Instance http
    private _server:http.Server;

    private _database: Sequelize;

    // The port the express app will listen on
    private _port: string | number | boolean;

    constructor( private debug:boolean = false ) {
        this._application = express();
        this._server = http.createServer( this._application );
        this._port = normalizePort( process.env.PORT || 3000 );
        this.middleware();
    }

    public setDatabase( database: Sequelize ): void {
        this._database = database;
    }

    public getServer (): http.Server {
        return this._server;
    }

    public bootstrap(): Promise<Server>{
        return this.routes().then( () => this );
    }

    private routes(): Promise<any>{
        return new Promise( Proxy.create( this, this.handleRoutes ) );
    }

    private handleRoutes( resolve, reject ) {
        try {
            this.getServer().listen( this._port, Proxy.create( this, this.handleListen, resolve ) );
            this.debugger();
            resolve( this.getServer() );
        } catch ( error ) {
            return reject( error );
        }
    }

    private debugger() {
        if ( this.debug ) {
            this.getServer().on('error', onError( this.getServer() ) );
            this.getServer().on('listening', onListening( this.getServer() ) );
        }
    }

    private handleListen ( resolve ) {
        return resolve( this.getServer() );
    }

    private middleware(): void{
        //this._application.use( logger('dev') );
        //this._application.use(this._cors());
        let schema = new Graphql().execute();
        this._application.disable('x-powered-by');
        this._application.use( bodyParser.json() );
        this._application.use( bodyParser.urlencoded( { extended: false } ) );
        this._application.use( '/graphql', graphqlHTTP( { 
            schema, 
            graphiql: process.env.NODE_ENV != 'development',
            context: this._database
        }) );
    }
}