import { Server } from '../server';
import { ConnectFacoty } from '../infra';
import { onError, onListening, Proxy } from '../utils';

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
        console.log( `Server failed to start` );
        console.error( error );
        process.exit( 1 );
    }
}
new ServerWeb();