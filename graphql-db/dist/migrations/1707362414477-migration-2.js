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
exports.Migration21707362414477 = void 0;
class Migration21707362414477 {
    constructor() {
        this.name = 'Migration21707362414477';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_604ec707060d1af445d33b6e552"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customId"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "customId" nvarchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_604ec707060d1af445d33b6e552" PRIMARY KEY ("customId")`);
        });
    }
}
exports.Migration21707362414477 = Migration21707362414477;
