"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookResolver = void 0;
const axios_1 = __importDefault(require("axios"));
const Books_1 = require("../entities/Books");
const datasource_1 = __importDefault(require("../Datasource/datasource"));
const bookRepo = datasource_1.default.getRepository(Books_1.Books);
exports.bookResolver = {
    Query: {
        fetchAndSaveBooks: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get('https://anapioficeandfire.com/api/books');
                let booksData = [];
                for (let i = 0; i < 10; i++) {
                    let bookData = response.data[i];
                    const book = new Books_1.Books();
                    book.name = bookData.name;
                    book.isbn = bookData.isbn;
                    book.publisher = bookData.publisher;
                    book.country = bookData.country;
                    booksData.push(book);
                }
                const savedBooks = yield bookRepo.save(booksData);
                console.log(savedBooks);
                return savedBooks;
            }
            catch (error) {
                console.log(error);
                throw new Error(error);
            }
        }),
        getBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const specificBook = yield getoneBook(args.input);
            if (!specificBook) {
                throw new Error("Book not found!!");
            }
            return specificBook;
        }),
        getAllBooks: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield bookRepo.find();
            return data;
        }),
    },
    Mutation: {
        createBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, isbn, publisher, country } = args.input;
            if (!name || !isbn || !publisher || !country) {
                throw new Error("All fields are required");
            }
            const newBook = new Books_1.Books();
            newBook.name = name;
            newBook.isbn = isbn;
            newBook.publisher = publisher;
            newBook.country = country;
            const createdBook = yield bookRepo.save(newBook);
            return createdBook;
        }),
        updateBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, name, isbn, publisher, country } = args.input;
            if (!id || (!name && !isbn && !publisher && !country)) {
                throw new Error("Please provide valid book id and atleast one field");
            }
            const existingBook = yield bookRepo.findOne({ where: { id } });
            if (!existingBook) {
                throw new Error(`Book with Id ${id} not found`);
            }
            if (name)
                existingBook.name = name;
            if (isbn)
                existingBook.isbn = isbn;
            if (publisher)
                existingBook.publisher = publisher;
            if (country)
                existingBook.country = country;
            yield bookRepo.save(existingBook);
            return `Book with ID ${id} updated successfully`;
        }),
        deleteBook: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            if (!id) {
                throw new Error("Please provide a valid Book id");
            }
            const existingBook = yield bookRepo.findOne({ where: { id } });
            if (!existingBook) {
                throw new Error(`Book with id ${id} not found`);
            }
            yield bookRepo.remove(existingBook);
            return `Book with ID ${id} deleted successfully`;
        }),
    }
};
function getoneBook(options) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Getting specific Book details");
        const specificBook = yield bookRepo.findOne({ where: options });
        if (!specificBook) {
            throw new Error("Book not found");
        }
        return specificBook;
    });
}
