import { DataSource, Repository } from "typeorm";
import AppDataSource from "../datasource/datasource";
import { Users } from "../entities/Users.entity";
// import { Profile } from "../entities/Profile.entity";
import { Todo } from "../entities/Todo.entity";
 
class UserService {
  private userRepo = AppDataSource.getRepository(Users);
  private todoRepo=AppDataSource.getRepository(Todo);
 
  async getAllUsers() {
    return await this.userRepo.find({
     relations:["todos"],
    // select: {todos : true }
    });
    
  }
 
  async getUserById(id: any) {
    return await this.userRepo.findOne({
      where:{id},
      
      relations:["todos"],
    });
  }
 
  async createUser(firstName: string, lastName: string, isActive: boolean,age:number,todos:{title:string,description:string }[]) {
    const existingUser=await this.userRepo.findOne({where:{firstName,lastName}});
    if(existingUser){
      throw new Error("User already exists");
    }
    const newTodos = todos.map((todoData) => {
      const todo = new Todo();
      todo.title = todoData.title;
      todo.description = todoData.description;
      return todo;
    });
    const newUser = new Users();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.isActive=isActive;
    newUser.age = age;
    newUser.todos = newTodos;
    console.log(newUser);
    return await this.userRepo.save(newUser);
    
  }
  async addTodosToUser(userId: number, newTodos: any[]) {
  
    const user = await this.userRepo.findOne({where:{id:userId}});
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
 
    const todoEntities = newTodos.map((todoData )=> {
      const todo = new Todo();
      todo.title = todoData.title;
      todo.description = todoData.description;
      todo.user = user; 
      return todo;
    });
 
    await this.todoRepo.save(todoEntities);
  }

  async updateTodos(todoRepo: Repository<Todo>, todos: any[]) {
    for (const todoData of todos) {
      const { title, ...todoDetails } = todoData;
      if (title != todoData.title) {
        throw new Error(`User with ID ${title} not found`);
      }
      await todoRepo.update({ title }, todoDetails);
    }
  }

async updateTodosForUser(userId: number, todos: {title:string;description?:string}[]) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
    relations: ['todos'], 
  });

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const userTodos = user.todos || [];

  for (const todoData of todos) {
    const { title, ...todoDetails } = todoData;

    const existingTodo = userTodos.find((todo) => todo.title === title);

    if (!existingTodo) {

      throw new Error(`Todo with title ${title} not found for user with ID ${userId}`);
    }

    await this.todoRepo.update({ id: existingTodo.id }, todoDetails);
  }
}  
async updateTodoUser(userId: number, updateData: any) {
    
  const{todos,...userData}=updateData;
  //await this.userRepo.update(userId,userData);
   if(todos&&todos.length>0)
   {
     await this.updateTodosForUser(userId,todos);
   }
   else{
     console.log("No todo found");
   }
 }

async updateUser(userId: number, updateData: any) {
    
   const{todos,...userData}=updateData;
   await this.userRepo.update(userId,userData);
    if(todos&&todos.length>0)
    {
      await this.updateTodos(this.todoRepo,todos);
    }
    else{
      console.log("No todo found");
    }
  }

 async deleteTodo(userId:number)
 {
  const user=await this.userRepo.findOne({
    where:{id:userId},
    relations:["todos"]
   });
   if(!user)
   {
    throw new Error("User with ID ${userId} not found");
   }
   const todos=user.todos||[];
   if(todos && todos.length>0)
   {
    await this.todoRepo.remove(todos);
   }
 }  
  async deleteUser(userId: number) {
    const user=await this.userRepo.findOne({
      where:{id:userId},
      relations:["todos"]
     });
      this.deleteTodo(userId);
   
      await this.userRepo.remove(user);
  }


async getUserWithTopmostTodos() {
  const usersWithTodos = await this.userRepo.find({
    relations: ["todos"],
  });

  if (usersWithTodos.length === 0) {
    throw new Error("No users found");
  }

  const userWithTopmostTodos = usersWithTodos.reduce((prevUser, currentUser) => {
    return prevUser.todos.length > currentUser.todos.length ? prevUser : currentUser;
  });
  return userWithTopmostTodos;
}

 
}
export default new UserService;
 