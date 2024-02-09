import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11707360330464 implements MigrationInterface {
    name = 'Migration11707360330464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movie" ("id" int NOT NULL IDENTITY(1,1), "title" nvarchar(255) NOT NULL, "minutes" int NOT NULL CONSTRAINT "DF_7c7ffa3a1ff262934eea4afd8d9" DEFAULT 60, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "customId" nvarchar(255) NOT NULL, "firstname" nvarchar(255) NOT NULL, "lastname" nvarchar(255) NOT NULL, "city" nvarchar(255) NOT NULL, CONSTRAINT "PK_604ec707060d1af445d33b6e552" PRIMARY KEY ("customId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "movie"`);
    }

}
