import { Entity,PrimaryGeneratedColumn,Column,ManyToMany,JoinTable } from "typeorm";
import { Course } from "./Course.entity";
@Entity({name:"Student"})
export class Student{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true})
    rollNo:string;
    @Column({nullable:true})
    firstName:string;
    @Column({nullable:true})
    lastName:string;
    @Column({nullable:true})
    age:number;
    @ManyToMany(()=>Course,(course)=>course.students,{cascade:true,onDelete:"CASCADE"})
    @JoinTable()
    courses:Course[];

}