
import { DataSource, Repository } from "typeorm";
import AppDataSource from "../datasource/datasource";
import { user_1 } from "../entities/user_1.entity";
import { tabprofile } from "../entities/tabprofile.entity";
class UserService {
  private userRepo = AppDataSource.getRepository(user_1);
  private profileRepo=AppDataSource.getRepository(tabprofile);

  async getAllUsers() {
    // return await this.userRepo.find({
    //  // relations:["profile"] (enabled eager)
    // })
    return await this.userRepo
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.profile','profile')
    .getMany();
    
  }

  async getUserById(id: any) {
    // return await this.userRepo.findOne({
    //   where:{id},
      //relations:["profile"],
      return await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile','profile')
      .where('user.id=:id',{id})
      .getOne();
    // });
  }

  async createUser(firstName: string, lastName: string, isActive: boolean,age:number,gender:string,skill:string) {
    const existingUser=await this.userRepo.findOne({where:{firstName,lastName}});
    if(existingUser){
      throw new Error("User already exists");
    }
    let profile=new tabprofile();
    profile.gender=gender;
    profile.skill=skill;
    profile.age=age;
    console.log(profile);

    const newUser = new user_1();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.isActive = isActive;
   // newUser.age=age;
    newUser.profile=profile;
   
    return await this.userRepo.save(newUser);
  }
  
  async updateProfile(profileRepo:Repository<tabprofile>,profile:any)
  {

    const { id, ...profileDetails } = profile;
    await profileRepo.update(id, profileDetails);

  }

  async updateUser(userId: number, updateData: any) {
    
    const { profile, ...userData } = updateData;
         await this.userRepo.update(userId, userData);
        if (profile) {
           return await this.updateProfile(this.profileRepo, profile);
        }
       
     
    
    // return await this.userRepo.update(userId, updateData);
  }
// const u = await this.userRepo.findOne({
    //   where: { id: userId },
    //   relations: ['profile'],
    // });
    // if(!u){
      
    //   return null;
    // }
    // this.userRepo.merge(u,updateData)

  async deleteUser(userId: number) {
    
    const user=await this.userRepo.findOne({
      where:{id:userId},
      relations:["profile"],

    });
    if(!user)
    {
      throw new Error("user with ID ${userId} not found");
    }
    const profile=user.profile;
    if(profile)
    {
      await this.profileRepo.remove(profile);
      console.log("deleted");
    }
     await this.userRepo.remove(user);
  }
}

export default new UserService;
