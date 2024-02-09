import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11706155569131 implements MigrationInterface {
    name = 'Migration11706155569131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Todo" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "description" nvarchar(255), "isCompleted" bit NOT NULL CONSTRAINT "DF_1a9526b2166497fffb4fc2b5235" DEFAULT 0, "userId" int, CONSTRAINT "PK_7c134d062947a53f89064491e63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" int NOT NULL IDENTITY(1,1), "firstName" nvarchar(255) NOT NULL, "lastName" nvarchar(255) NOT NULL, "isActive" bit, "age" int, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Todo" ADD CONSTRAINT "FK_9448f02f99ff8269ea92c2bf9e8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todo" DROP CONSTRAINT "FK_9448f02f99ff8269ea92c2bf9e8"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "Todo"`);
    }

}
