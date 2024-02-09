import { Entity,PrimaryGeneratedColumn,Column ,OneToOne,JoinColumn} from "typeorm";
import { tabprofile } from "./tabprofile.entity";
@Entity()
export class user_1{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column()
    isActive:boolean;
    // @Column({
    //     nullable:true
    // })
    // age:number;
    // @Column({nullable:true})
    // password:string;
   @OneToOne(()=> tabprofile, (profile)=>profile.user,{cascade: true,onDelete:"CASCADE" })
   @JoinColumn()
   profile:tabprofile;
    
}