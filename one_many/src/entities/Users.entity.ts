import { Entity,PrimaryGeneratedColumn,Column ,OneToMany,JoinColumn} from "typeorm";
import { Todo } from "./Todo.entity";
//import { Profile } from "./Profile.entity";
@Entity()
export class Users{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column()
    isActive:boolean;
    @Column({
        nullable:true
    })
    age:number;
   
   @OneToMany(()=>Todo,(todo)=>todo.user,{cascade:true} )
   todos:Todo[]
   
}