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
const datasource_1 = __importDefault(require("../datasource/datasource"));
const Student_entity_1 = require("../entities/Student.entity");
const Course_entity_1 = require("../entities/Course.entity");
class StudentService {
    constructor() {
        this.stuRepo = datasource_1.default.getRepository(Student_entity_1.Student);
        this.courseRepo = datasource_1.default.getRepository(Course_entity_1.Course);
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stuRepo.find({
                relations: ["courses"]
            });
        });
    }
    getStudentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stuRepo.findOne({
                where: { id },
                relations: ["courses"],
            });
        });
    }
    createStudent(rollNo, firstName, lastName, age, courses) {
        return __awaiter(this, void 0, void 0, function* () {
            const newcourses = courses.map(courseData => {
                const course = new Course_entity_1.Course();
                course.title = courseData.title;
                course.code = courseData.code;
                return course;
            });
            const newstu = new Student_entity_1.Student();
            newstu.firstName = firstName;
            newstu.lastName = lastName;
            newstu.age = age;
            newstu.rollNo = rollNo;
            newstu.courses = newcourses;
            return yield this.stuRepo.save(newstu);
        });
    }
    updateCourses(courseRepo, courses) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const courseData of courses) {
                const { title } = courseData, courseDetails = __rest(courseData, ["title"]);
                // Find the course by title
                const existingCourse = yield this.courseRepo.findOne({ where: { title: title } });
                if (!existingCourse) {
                    throw new Error(`Course with title '${title}' not found`);
                }
                // Update the existing course with new details
                yield this.courseRepo.save(courseDetails);
            }
        });
    }
    updateStudent(stuId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { course } = updateData, stuData = __rest(updateData, ["course"]);
            const existingStudent = yield this.stuRepo.findOne({ where: { id: stuId } });
            if (!existingStudent) {
                throw new Error(`student with id '${stuId}' not found`);
            }
            this.stuRepo.merge(existingStudent, stuData);
            yield this.stuRepo.save(existingStudent);
            if (course && course.length > 0) {
                for (const courseData of course) {
                    yield this.updateCourses(this.courseRepo, courseData);
                }
            }
            else {
                console.log("No courses found");
            }
            //return await this.stuRepo.save(stuData);
        });
    }
    deleteStudent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield this.stuRepo.findOne({
                where: { id: userId },
                relations: ["courses"]
            });
            if (!student) {
                throw new Error("Student with ID ${userId} not found");
            }
            const course = student.courses || [];
            if (course && course.length > 0) {
                yield this.courseRepo.remove(course);
            }
            yield this.stuRepo.remove(student);
        });
    }
}
exports.default = new StudentService;
