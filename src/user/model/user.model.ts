import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'user',
    timestamps: true,
})
export default class User extends Model<User> {
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
  
    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    email: string;
}
