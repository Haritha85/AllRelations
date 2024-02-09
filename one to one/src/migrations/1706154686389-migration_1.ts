import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11706154686389 implements MigrationInterface {
    name = 'Migration11706154686389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tabprofile" ("id" int NOT NULL IDENTITY(1,1), "gender" nvarchar(255), "skill" nvarchar(255), "age" int, CONSTRAINT "PK_3e65f2f39939417048cb98c1755" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_1" ("id" int NOT NULL IDENTITY(1,1), "firstName" nvarchar(255) NOT NULL, "lastName" nvarchar(255) NOT NULL, "isActive" bit NOT NULL, "profileId" int, CONSTRAINT "PK_f7f791cf5dc76d5fefa03eb41e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_379379a67712210f7d9dc4b70e" ON "user_1" ("profileId") WHERE "profileId" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_1" ADD CONSTRAINT "FK_379379a67712210f7d9dc4b70e6" FOREIGN KEY ("profileId") REFERENCES "tabprofile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_1" DROP CONSTRAINT "FK_379379a67712210f7d9dc4b70e6"`);
        await queryRunner.query(`DROP INDEX "REL_379379a67712210f7d9dc4b70e" ON "user_1"`);
        await queryRunner.query(`DROP TABLE "user_1"`);
        await queryRunner.query(`DROP TABLE "tabprofile"`);
    }

}
