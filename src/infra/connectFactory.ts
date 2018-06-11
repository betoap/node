import { Sequelize } from 'sequelize-typescript';

export class ConnectFacoty {
    
    private static _instance: Sequelize;

    public static getConnection () : Promise<any> {
        if ( !this._instance ) {
            const _credential:any = require('./../config/.credentials');
            this._instance = new Sequelize( _credential );
        };
        try {
            const db = this._instance.sync();
            return Promise.resolve( db );
        }catch( error ){
            return Promise.reject( error );
        }
    }
}