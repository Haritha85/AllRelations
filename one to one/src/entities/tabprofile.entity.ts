import { Entity,PrimaryGeneratedColumn,Column, OneToOne } from "typeorm";
import { user_1 } from "./user_1.entity";
@Entity({name:"tabprofile"})
export class tabprofile{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    
    gender:string;
    @Column({nullable:true})
    skill:string;
    @Column({nullable:true})
    age:number;
    @OneToOne(()=>user_1,(user)=>user.profile)
    user:user_1;
    
}