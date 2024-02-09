import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21706163270108 implements MigrationInterface {
    name = 'Migration21706163270108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" bit NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" bit`);
    }

}
