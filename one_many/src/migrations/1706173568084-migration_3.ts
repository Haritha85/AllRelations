import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31706173568084 implements MigrationInterface {
    name = 'Migration31706173568084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todo" DROP COLUMN "isCompleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Todo" ADD "isCompleted" bit`);
    }

}
