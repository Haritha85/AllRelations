import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Books{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    isbn:string;
     
    @Column()
    publisher:string;

    @Column()
    country:string;

}
