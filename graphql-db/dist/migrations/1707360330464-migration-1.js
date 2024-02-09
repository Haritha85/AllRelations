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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration11707360330464 = void 0;
class Migration11707360330464 {
    constructor() {
        this.name = 'Migration11707360330464';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "movie" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "minutes" int NOT NULL CONSTRAINT "DF_7c7ffa3a1ff262934eea4afd8d9" DEFAULT 60, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "customId" nvarchar(255) NOT NULL, "firstname" nvarchar(255) NOT NULL, "lastname" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, CONSTRAINT "PK_604ec707060d1af445d33b6e552" PRIMARY KEY ("customId"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "movie"`);
        });
    }
}
exports.Migration11707360330464 = Migration11707360330464;
