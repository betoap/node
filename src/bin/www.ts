import { Server } from './../server';
import { ConnectFacoty } from './../infra/connectFactory';
import { normalizePort, onError, onListening, Proxy } from '../utils/utils';

/*
class ServerWeb {

    constructor() {
        this
            .startDataBase()
            .then(
                Proxy.create( this, this.loadServer )
            )
            .catch(
                Proxy.create( this, this.handleError )
            );
    }

    private loadServer():void {
        this
            .startServer()
            .then( ( server: Server )=> {
                const _server = server._server;
            })
            .catch(
                Proxy.create( this, this.handleError )
            );
    }

    private startServer(): Promise<Server> {
        const server = new Server();
        return server.bootstrap();
    }

    private startDataBase(): Promise<any> {
        return ConnectFacoty.getConnection();
    }

    private handleError( error ): void {
        console.log(`Server failed to start`);
        console.error( error );
        process.exit( 1 );
    }
}

new ServerWeb();
*/


const _server = new Server();

_server
    .bootstrap()
    .then( serv => 
        { 
            console.log( `Server run in :`, serv.getServer().address() );
        }
    ).catch( error => 
        {
            console.log(`Server failed to start`);
            console.error( error );
            process.exit( 1 )
        }
    );