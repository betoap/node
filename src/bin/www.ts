import { Server } from './../server/server';
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