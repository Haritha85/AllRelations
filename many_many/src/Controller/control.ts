import express, { response } from "express";
import { DataSource } from "typeorm";
import AppDataSource from "../datasource/datasource";
import StudentService from "../Services/service";
import { Student } from "../entities/Student.entity";
import { Course } from "../entities/Course.entity";
const router: express.Router = express.Router();
// const userSer= new UserService();
 
router.get("/details", async function (req, res) {
  let stuRepo = AppDataSource.getRepository(Student);
 
  const students = await StudentService.getAllStudents();
  res.json(students);
});
router.get("/details/:id", async function (req, res) {
  // const pp=people.find(p => p.id===parseInt(req.params.id));
  // if(!pp) res.status(404).send("cannot find data");
  // else{
  //     res.send(pp);
  // }
  const userId = parseInt(req.params.id);
  const user = await StudentService.getStudentById(userId);
 
  if (!user) {
    res.status(404).send("student not found");
  } else {
    res.json(user);
  }
});
router.post("/create", async function (req, res) {

    const {rollNo, firstName, lastName, age,courses } = req.body;
 
    if (!firstName || !lastName  || age === undefined)
     {
      return res.status(400).json({ message: "Incomplete data provided" });
    }
   
 
    const newStudent = await StudentService.createStudent(
      rollNo,
      firstName,
      lastName,
      age,
      courses
     
    );
 
    res.json(newStudent);
  // } catch (error) {
  //   if (error instanceof Error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // }
});
router.put("/update/:stuid", async function (req, res) {
  
  const stuId = parseInt(req.params.stuid);
  const updateData = req.body;
 
  if (!stuId || !updateData) {
    return res.status(400).json({ error: "Invalid input" });
  }
 
  await StudentService.updateStudent(stuId, updateData);
  res.json({message:"updated successfully"});
});
router.delete("/delete/:id", async function (req, res) {

  try{
    const stuId = parseInt(req.params.id);
    await StudentService.deleteStudent(stuId);
    res.json({message:"user deleted successfully"});

  }
  catch(error)
  {
    if(error instanceof Error)
    {
      return res.status(500).json({error:error.message});
    }
  }
});
 
export default router;
 