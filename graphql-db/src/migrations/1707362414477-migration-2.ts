import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21707362414477 implements MigrationInterface {
    name = 'Migration21707362414477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_604ec707060d1af445d33b6e552"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "customId" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_604ec707060d1af445d33b6e552" PRIMARY KEY ("customId")`);
    }

}
