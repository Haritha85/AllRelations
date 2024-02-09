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
const express_1 = __importDefault(require("express"));
const datasource_1 = __importDefault(require("../datasource/datasource"));
const service_1 = __importDefault(require("../Services/service"));
const Student_entity_1 = require("../entities/Student.entity");
const router = express_1.default.Router();
// const userSer= new UserService();
router.get("/details", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let stuRepo = datasource_1.default.getRepository(Student_entity_1.Student);
        const students = yield service_1.default.getAllStudents();
        res.json(students);
    });
});
router.get("/details/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const pp=people.find(p => p.id===parseInt(req.params.id));
        // if(!pp) res.status(404).send("cannot find data");
        // else{
        //     res.send(pp);
        // }
        const userId = parseInt(req.params.id);
        const user = yield service_1.default.getStudentById(userId);
        if (!user) {
            res.status(404).send("student not found");
        }
        else {
            res.json(user);
        }
    });
});
router.post("/create", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rollNo, firstName, lastName, age, courses } = req.body;
        if (!firstName || !lastName || age === undefined) {
            return res.status(400).json({ message: "Incomplete data provided" });
        }
        const newStudent = yield service_1.default.createStudent(rollNo, firstName, lastName, age, courses);
        res.json(newStudent);
        // } catch (error) {
        //   if (error instanceof Error) {
        //     return res.status(500).json({ error: error.message });
        //   }
        // }
    });
});
router.put("/update/:stuid", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const stuId = parseInt(req.params.stuid);
        const updateData = req.body;
        if (!stuId || !updateData) {
            return res.status(400).json({ error: "Invalid input" });
        }
        yield service_1.default.updateStudent(stuId, updateData);
        res.json({ message: "updated successfully" });
    });
});
router.delete("/delete/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stuId = parseInt(req.params.id);
            yield service_1.default.deleteStudent(stuId);
            res.json({ message: "user deleted successfully" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
        }
    });
});
exports.default = router;
