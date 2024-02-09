import axios from "axios"
import { Books } from "../entities/Books"
import AppDatasource from "../Datasource/datasource"
import e from "express"
const bookRepo = AppDatasource.getRepository(Books)
export const bookResolver = {
    Query: {
        fetchAndSaveBooks: async() => {
            try{
                const response = await axios.get('https://anapioficeandfire.com/api/books')
                let booksData = []
                for(let i = 0; i<10; i++){
                    let bookData = response.data[i]
                    const book = new Books()
                    book.name = bookData.name
                    book.isbn = bookData.isbn
                    book.publisher = bookData.publisher
                    book.country = bookData.country
                    booksData.push(book)
                }
                const savedBooks = await bookRepo.save(booksData)
                console.log(savedBooks)
                return savedBooks
            } catch(error){
                console.log(error)
                throw new Error(error)
            }
        },
        getBook:async(_,args) =>{
            const specificBook=await getoneBook(args.input);
            if(!specificBook)
            {
                throw new Error("Book not found!!")
            }
            return specificBook;
        },
        getAllBooks:async() => {
            const data=await bookRepo.find();
            return data;
        },    },
    Mutation:{
        createBook:async(_,args) =>
        {
            const {name,isbn,publisher,country}=args.input
            if (!name || !isbn || !publisher||!country) {
                throw new Error("All fields are required");
              }
            const newBook=new Books();
            newBook.name=name;
            newBook.isbn=isbn;
            newBook.publisher=publisher;
            newBook.country=country;
            const createdBook=await bookRepo.save(newBook)
            return createdBook
        },
        updateBook:async(_,args) =>{
            const{id,name,isbn,publisher,country}=args.input;
            if(!id||(!name &&!isbn&&!publisher&&!country))
            {
                throw new Error("Please provide valid book id and atleast one field");

            }
            const existingBook=await bookRepo.findOne({where:{id}});
            if(!existingBook)
            {
                throw new Error(`Book with Id ${id} not found`);
            }
            if (name) existingBook.name = name;
            if (isbn) existingBook.isbn = isbn;
            if (publisher) existingBook.publisher = publisher;
            if(country) existingBook.country=country;

            await bookRepo.save(existingBook);
            return `Book with ID ${id} updated successfully`;
        },
        deleteBook:async(_,args) =>{
            const {id}=args;
            if(!id)
            {
                throw new Error("Please provide a valid Book id");
            }
            const existingBook=await bookRepo.findOne({where:{id}});
            if(!existingBook)
            {
                throw new Error(`Book with id ${id} not found`);
            }
            await bookRepo.remove(existingBook);
            return `Book with ID ${id} deleted successfully`;
    
           },


    }
}

async function getoneBook(options:any)
{
    console.log("Getting specific Book details");
    const specificBook=await bookRepo.findOne({where:options});
    if(!specificBook)
    {
        throw new Error("Book not found");
    }
    return specificBook;
}