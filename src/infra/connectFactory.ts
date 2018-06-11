import { Sequelize } from 'sequelize-typescript';
import Promise = require("bluebird");

export class ConnectFacoty {
    
    private static _instance: Sequelize;

    public static getConnection () : Promise<any> {
        if ( !this._instance ) {
            const _credential:any = require('./../config/.credentials');
            this._instance = new Sequelize( _credential );
        };
        return this._instance.sync();
    }
}