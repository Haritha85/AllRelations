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
exports.UserResolver = void 0;
const User_1 = require("../entities/User");
const datasource_1 = __importDefault(require("../Datasource/datasource"));
const userRepo = datasource_1.default.getRepository(User_1.User);
exports.UserResolver = {
    Query: {
        getUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const specificUser = yield getOneUser(args.input);
            console.log(specificUser);
            return specificUser;
        }),
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield userRepo.find();
            return data;
        }),
    },
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { firstname, lastname, city } = args.input;
            if (!firstname || !lastname || !city) {
                throw new Error("All fields (firstname, lastname, city) are required");
            }
            const newUser = new User_1.User();
            newUser.firstname = firstname;
            newUser.lastname = lastname;
            newUser.city = city;
            const createdUser = yield userRepo.save(newUser);
            return createdUser;
        }),
        updateUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, firstname, lastname, city } = args.input;
            if (!id || (!firstname && !lastname && !city)) {
                throw new Error("Please provide valid user id and atleast one field");
            }
            const existingUser = yield userRepo.findOne({ where: { id } });
            if (!existingUser) {
                throw new Error(`user with Id ${id} not found`);
            }
            if (firstname)
                existingUser.firstname = firstname;
            if (lastname)
                existingUser.lastname = lastname;
            if (city)
                existingUser.city = city;
            yield userRepo.save(existingUser);
            let response = {};
            response.message = "Successful";
            response.error = false;
            return response;
            // return updatedUser;
        }),
        deleteUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            if (!id) {
                throw new Error("Please provide a valid user id");
            }
            const existingUser = yield userRepo.findOne({ where: { id } });
            if (!existingUser) {
                throw new Error(`User with id ${id} not found`);
            }
            yield userRepo.remove(existingUser);
            return `User with ID ${id} deleted successfully`;
        }),
    },
};
function getOneUser(options) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Getting specific user details");
        const specificUser = yield userRepo.findOne({ where: options });
        if (!specificUser) {
            throw new Error("User not found");
        }
        return specificUser;
    });
}
