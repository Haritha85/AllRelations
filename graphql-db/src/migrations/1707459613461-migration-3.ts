import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31707459613461 implements MigrationInterface {
    name = 'Migration31707459613461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" int NOT NULL IDENTITY(1,1), "name" nvarchar(255) NOT NULL, "isbn" nvarchar(255) NOT NULL, "publisher" nvarchar(255) NOT NULL, "country" nvarchar(255) NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "books"`);
    }

}
