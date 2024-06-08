import { MigrationInterface, QueryRunner } from "typeorm";

export class CarroChassitest1717805007460 implements MigrationInterface {
    name = 'CarroChassitest1717805007460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" ADD "chassi" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62" UNIQUE ("chassi")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "chassi"`);
    }

}
