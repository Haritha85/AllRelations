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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var datasource_1 = __importDefault(require("../datasource/datasource"));
var Users_entity_1 = require("../entities/Users.entity");
// import { Profile } from "../entities/Profile.entity";
var Todo_entity_1 = require("../entities/Todo.entity");
var UserService = /** @class */ (function () {
    function UserService() {
        this.userRepo = datasource_1.default.getRepository(Users_entity_1.Users);
        this.todoRepo = datasource_1.default.getRepository(Todo_entity_1.Todo);
    }
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.find({
                            relations: ["todos"],
                            // select: {todos : true }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: id },
                            relations: ["todos"],
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.createUser = function (firstName, lastName, isActive, age, todos) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, newTodos, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { firstName: firstName, lastName: lastName } })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new Error("User already exists");
                        }
                        newTodos = todos.map(function (todoData) {
                            var todo = new Todo_entity_1.Todo();
                            todo.title = todoData.title;
                            todo.description = todoData.description;
                            return todo;
                        });
                        newUser = new Users_entity_1.Users();
                        newUser.firstName = firstName;
                        newUser.lastName = lastName;
                        newUser.isActive = isActive;
                        newUser.age = age;
                        newUser.todos = newTodos;
                        return [4 /*yield*/, this.userRepo.save(newUser)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.addTodosToUser = function (userId, newTodos) {
        return __awaiter(this, void 0, void 0, function () {
            var user, todoEntities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({ where: { id: userId } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User with ID ".concat(userId, " not found"));
                        }
                        todoEntities = newTodos.map(function (todoData) {
                            var todo = new Todo_entity_1.Todo();
                            todo.title = todoData.title;
                            todo.description = todoData.description;
                            todo.user = user;
                            return todo;
                        });
                        return [4 /*yield*/, this.todoRepo.save(todoEntities)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateTodos = function (todoRepo, todos) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, todos_1, todoData, title, todoDetails;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, todos_1 = todos;
                        _a.label = 1;
                    case 1:
                        if (!(_i < todos_1.length)) return [3 /*break*/, 4];
                        todoData = todos_1[_i];
                        title = todoData.title, todoDetails = __rest(todoData, ["title"]);
                        if (title != todoData.title) {
                            throw new Error("User with ID ".concat(title, " not found"));
                        }
                        return [4 /*yield*/, todoRepo.update({ title: title }, todoDetails)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateTodosForUser = function (userId, todos) {
        return __awaiter(this, void 0, void 0, function () {
            var user, userTodos, _loop_1, this_1, _i, todos_2, todoData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: userId },
                            relations: ['todos'],
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User with ID ".concat(userId, " not found"));
                        }
                        userTodos = user.todos || [];
                        _loop_1 = function (todoData) {
                            var title, todoDetails, existingTodo;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        title = todoData.title, todoDetails = __rest(todoData, ["title"]);
                                        existingTodo = userTodos.find(function (todo) { return todo.title === title; });
                                        if (!existingTodo) {
                                            throw new Error("Todo with title ".concat(title, " not found for user with ID ").concat(userId));
                                        }
                                        return [4 /*yield*/, this_1.todoRepo.update({ id: existingTodo.id }, todoDetails)];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, todos_2 = todos;
                        _a.label = 2;
                    case 2:
                        if (!(_i < todos_2.length)) return [3 /*break*/, 5];
                        todoData = todos_2[_i];
                        return [5 /*yield**/, _loop_1(todoData)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateTodoUser = function (userId, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var todos, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        todos = updateData.todos, userData = __rest(updateData, ["todos"]);
                        if (!(todos && todos.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.updateTodosForUser(userId, todos)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        console.log("No todo found");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (userId, updateData) {
        return __awaiter(this, void 0, void 0, function () {
            var todos, userData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        todos = updateData.todos, userData = __rest(updateData, ["todos"]);
                        return [4 /*yield*/, this.userRepo.update(userId, userData)];
                    case 1:
                        _a.sent();
                        if (!(todos && todos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.updateTodos(this.todoRepo, todos)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("No todo found");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteTodo = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, todos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: userId },
                            relations: ["todos"]
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("User with ID ${userId} not found");
                        }
                        todos = user.todos || [];
                        if (!(todos && todos.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.todoRepo.remove(todos)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.findOne({
                            where: { id: userId },
                            relations: ["todos"]
                        })];
                    case 1:
                        user = _a.sent();
                        this.deleteTodo(userId);
                        return [4 /*yield*/, this.userRepo.remove(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getUserWithTopmostTodos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersWithTodos, userWithTopmostTodos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepo.find({
                            relations: ["todos"],
                        })];
                    case 1:
                        usersWithTodos = _a.sent();
                        if (usersWithTodos.length === 0) {
                            throw new Error("No users found");
                        }
                        userWithTopmostTodos = usersWithTodos.reduce(function (prevUser, currentUser) {
                            return prevUser.todos.length > currentUser.todos.length ? prevUser : currentUser;
                        });
                        return [2 /*return*/, userWithTopmostTodos];
                }
            });
        });
    };
    return UserService;
}());
exports.default = new UserService;
