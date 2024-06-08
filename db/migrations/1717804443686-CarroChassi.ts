import { MigrationInterface, QueryRunner } from "typeorm";

export class CarroChassi1717804443686 implements MigrationInterface {
    name = 'CarroChassi1717804443686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "chassi"`);
        await queryRunner.query(`ALTER TABLE "carro" ADD "chassi" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62" UNIQUE ("chassi")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "chassi"`);
        await queryRunner.query(`ALTER TABLE "carro" ADD "chassi" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62" UNIQUE ("chassi")`);
    }

}
