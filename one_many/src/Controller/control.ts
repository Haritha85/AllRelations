import express, { response } from "express";
import { DataSource } from "typeorm";
import AppDataSource from "../datasource/datasource";
import { Users } from "../entities/Users.entity";
import UserService from "../Services/service";
import { profile } from "console";
const router: express.Router = express.Router();
// const userSer= new UserService();
 
router.get("/details", async function (req, res) {
  let userRepo = AppDataSource.getRepository(Users);
 
  // res.json(await userRepo.find(
  //     {
  //         select:["firstName","lastName","id"]
 
  //     }
  // ));
  // //res.json(await userRepo.delete(3));
  // res.json(await userRepo.update(2,{firstName:"Hari"}))
  const users = await UserService.getAllUsers();
  res.json(users);
});
router.get("/details/:id", async function (req, res) {
  // const pp=people.find(p => p.id===parseInt(req.params.id));
  // if(!pp) res.status(404).send("cannot find data");
  // else{
  //     res.send(pp);
  // }
  const userId = parseInt(req.params.id);
  const user = await UserService.getUserById(userId);
 
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.json(user);
  }
});
router.post("/create", async function (req, res) {

    const { firstName, lastName, isActive, age,todos } = req.body;
 
    if (!firstName || !lastName  || age === undefined)
     {
      return res.status(400).json({ message: "Incomplete data provided" });
    }
    if(age<0){
      return res.status(400).json({ message: "provide appropriate data" });
    }
    const newUser = await UserService.createUser(
      firstName,
      lastName,
      isActive,
      age,
      todos
     );
 res.json(newUser);
});
router.post("/addTodos/:userid",async function(req,res)
{
  const userId=parseInt(req.params.userid);
  const newTodos=req.body.newTodos;
  console.log(newTodos);
  try{
    
    await UserService.addTodosToUser(userId,newTodos);
    res.status(200).json({ message: 'Todos added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  

router.put("/update/:userid", async function (req, res) {

  const userId = parseInt(req.params.userid);
  const updateData = req.body;
 
  if (!userId || !updateData) {
    return res.status(400).json({ error: "Invalid input" });
  }
 
  await UserService.updateUser(userId, updateData);
  res.json({message:"updated successfully"});
});
router.put("/updatetodos/:userid",async function (req,res) {
      const userId=parseInt(req.params.userid);
      const updateData=req.body;
      if (!userId || !updateData) {
        return res.status(400).json({ error: "Invalid input" });
      }
      await UserService.updateTodoUser(userId,updateData);
      res.json({message:"updated successfully"})
  
})
router.delete("/deleteTodo/:id", async function (req, res)
{
  try{
    const userId = parseInt(req.params.id);
    await UserService.deleteTodo(userId);
    res.json({message:"todo deleted successfully"});

  }
  catch(error)
  {
    if(error instanceof Error)
    {
      return res.status(500).json({error:error.message});
    }
  }
})
router.delete("/delete/:id", async function (req, res) {
  // const pp=people.find(p => p.id===parseInt(req.params.id));
  // if(!pp)
  // {
  //     res.status(404).send("Oops! unable to delete")
  // }
  // else{
  //     const index=people.indexOf(pp);
  //     people.splice(index);
  //     res.status(200).send("deleted successfully");
 
  // }
  try{
    const userId = parseInt(req.params.id);
    await UserService.deleteUser(userId);
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
router.get("/topmostTodosUser", async function (req, res) {
  try {
    const userWithTopmostTodos = await UserService.getUserWithTopmostTodos();
    if (userWithTopmostTodos) {
      const userId = userWithTopmostTodos.id;
      res.json({ userId });
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
 