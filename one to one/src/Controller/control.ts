import express, { response } from "express";
import { DataSource } from "typeorm";
import AppDataSource from "../datasource/datasource";
import UserService from "../Services/service";
import { user_1 } from "../entities/user_1.entity";
import { profile } from "console";
const router: express.Router = express.Router();
// const userSer= new UserService();

router.get("/details", async function (req, res) {
  let userRepo = AppDataSource.getRepository(user_1);

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
  // const pp=req.body;
  // people.push(pp);
  // res.status(200).send({
  //     message:"added successfully",
  //     data:pp
  // })
  try {
    const { firstName, lastName, isActive, profile } = req.body;
    //console.log("mprofile",profile);

    if (!firstName || !lastName  === undefined)
     {
      return res.status(400).json({ message: "Incomplete data provided" });
    }
    if(profile.age<0){
      return res.status(400).json({ message: "provide appropriate data" });
    }
    const newUser = await UserService.createUser(
      firstName,
      lastName,
      isActive,
      profile.age,
      profile.gender,
      profile.skill,
     
      
    );

    res.json(newUser);
  } catch (error) {

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
});
router.put("/update/:userid", async function (req, res) {
  // const pp=people.find(p => p.id===parseInt(req.params.id));
  // if (!pp){
  //     res.status(404).send("Unable to update, bcoz data not found!!!!")
  // }
  // else{
  //     if (req.body.age !== undefined) {
  //         pp.age = req.body.age;
  //     }

  //     if (req.body.name !== undefined) {
  //         pp.name = req.body.name;
  //     }
  //     res.send("Updated Successfully")
  // }
  const userId = parseInt(req.params.userid);
  const updateData = req.body;

  if (!userId || !updateData) {
    return res.status(400).json({ error: "Invalid input" });
  }

  await UserService.updateUser(userId, updateData);
  res.json({message:"user updated successfully"});

}
  
);
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
  res.json({message:"deleted successfully"});
  }
  catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
});

export default router;
