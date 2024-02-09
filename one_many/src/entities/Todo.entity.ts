import { Entity,PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm";
import { Users } from "./Users.entity";
@Entity({name:"Todo"})
export class Todo{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false})
    title:string;
    @Column({nullable:true})
    description:string;
   
   @ManyToOne(()=>Users,(user)=>user.todos)
   user:Users;
}