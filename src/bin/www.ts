/*import { Server } from './../server/server';
import { ConnectFacoty } from './../infra/connectFactory';


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
*/

import { Server } from './../server/server';
import { ConnectFacoty } from './../infra/connectFactory';
import { normalizePort, onError, onListening, Proxy } from '../utils/utils';
import * as http from 'http';

class ServerWeb {
    
    constructor() {
        this.startDataBase();
    }
    
    private startServer(): Promise<Server> {
        const server = new Server( );
        server.getServer().on('error', onError( server.getServer() ) );
        server.getServer().on('listening', onListening( server.getServer() ) );
        return server.bootstrap();
    }

    private startDataBase() {
        ConnectFacoty
        .getConnection()
        .then(
            Proxy.create( this, this.startServer )
        )
        .catch(
            Proxy.create( this, this.handleError )
        );
    }

    private handleError( error ): void {
        console.log(`Server failed to start`);
        console.error( error );
        process.exit( 1 );
    }
}
new ServerWeb();