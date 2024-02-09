import { Field,Int } from "type-graphql";
import { Entity,PrimaryGeneratedColumn,Column,BaseEntity } from "typeorm";


@Entity()
export class User extends BaseEntity{
    @Field(() =>Int)
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    firstname:string;
    @Column()
    lastname:string;
    @Column()
    city:string;
}