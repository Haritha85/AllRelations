import { User } from "../entities/User";
import AppDataSource from "../Datasource/datasource";
const userRepo=AppDataSource.getRepository(User);

export const UserResolver={
    Query:{

       
        getUser:async(_,args) =>{
            const specificUser=await getOneUser(args.input);
            console.log(specificUser);
            return specificUser;
        },
        
        getAllUsers:async() => {
            const data=await userRepo.find();
            return data;
        },
        
    },
    Mutation:{
        createUser:async(_,args) =>{
            const {firstname,lastname,city}=args.input
            if (!firstname || !lastname || !city) {
                throw new Error("All fields (firstname, lastname, city) are required");
              }
            const newUser=new User();
            newUser.firstname=firstname;
            newUser.lastname=lastname;
            newUser.city=city;
            const createdUser=await userRepo.save(newUser)
            return createdUser
        },
        updateUser:async(_,args) =>{
            const{id,firstname,lastname,city}=args.input;
            if(!id||(!firstname &&!lastname&&!city))
            {
                throw new Error("Please provide valid user id and atleast one field");

            }
            const existingUser=await userRepo.findOne({where:{id}});
            if(!existingUser)
            {
                throw new Error(`user with Id ${id} not found`);
            }
            if (firstname) existingUser.firstname = firstname;
            if (lastname) existingUser.lastname = lastname;
            if (city) existingUser.city = city;

            await userRepo.save(existingUser);
            let response = {} as any
            response.message =  "Successful"
            response.error = false
            return response
            // return updatedUser;
        },
       deleteUser:async(_,args) =>{
        const {id}=args;
        if(!id)
        {
            throw new Error("Please provide a valid user id");
        }
        const existingUser=await userRepo.findOne({where:{id}});
        if(!existingUser)
        {
            throw new Error(`User with id ${id} not found`);
        }
        await userRepo.remove(existingUser);
        return `User with ID ${id} deleted successfully`;

       },
       
    },
};

async function getOneUser(options:any)
{
    console.log("Getting specific user details");
    const specificUser=await userRepo.findOne({where:options});
    if(!specificUser)
    {
        throw new Error("User not found");
    }
    return specificUser;
}