import { DataSource, Repository } from "typeorm";
import AppDataSource from "../datasource/datasource";
import { Student } from "../entities/Student.entity"; 
import { Course } from "../entities/Course.entity";
import { title } from "process";
class StudentService {
  private stuRepo = AppDataSource.getRepository(Student);
  private courseRepo=AppDataSource.getRepository(Course);
 
  async getAllStudents() {
    return await this.stuRepo.find({
     relations:["courses"]
    });
  }
 
  async getStudentById(id: any) {
    return await this.stuRepo.findOne({
      where:{id},
     relations:["courses"],
    });
  }
 
  async createStudent(rollNo:string,firstName: string, lastName: string,age:number,courses:{title:string,code:string}[]) {
   
    const newcourses=courses.map(courseData=>{
      const course=new Course();
      course.title=courseData.title;
      course.code=courseData.code;
      return course;
  })

    const newstu = new Student();
    newstu.firstName = firstName;
    newstu.lastName = lastName;
    newstu.age=age;
    newstu.rollNo=rollNo;
    newstu.courses=newcourses;
 
    return await this.stuRepo.save(newstu);
  
}
async updateCourses(courseRepo:Repository<Course>,courses:any[])
{
  for(const courseData of courses){
    const{title,...courseDetails}=courseData;
      const existingCourse = await this.courseRepo.findOne({where:{title: title }});

      if (!existingCourse) {
          throw new Error(`Course with title '${title}' not found`);
      }

      await this.courseRepo.save( courseDetails);
     
  }
}
  async updateStudent(stuId: number, updateData: any) {
    const{course,...stuData}=updateData;
    
    const existingStudent=await this.stuRepo.findOne({where:{id:stuId}});
    if(!existingStudent)
    {
      throw new Error(`student with id '${stuId}' not found`);
}
    this.stuRepo.merge(existingStudent,stuData);
    await this.stuRepo.save(existingStudent);
    
    if(course&&course.length>0)
    {
      
      await this.updateCourses(this.courseRepo,course);
    }
    else{
      console.log("No courses found");
    }

  //return await this.stuRepo.save(stuData);
  }
  
  async deleteStudent(userId: number) {
   const student=await this.stuRepo.findOne({
    where:{id:userId},
    relations:["courses"]
   });
   if(!student)
   {
    throw new Error("Student with ID ${userId} not found");
   }
   const course=student.courses||[];
   if(course && course.length>0)
   {
    await this.courseRepo.remove(course);
   }
     await this.stuRepo.remove(student);
  }
}
 
export default new StudentService;
 