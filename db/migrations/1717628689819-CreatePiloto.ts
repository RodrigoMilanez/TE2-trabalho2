import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePiloto1717628689819 implements MigrationInterface {
    name = 'CreatePiloto1717628689819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pilotos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "data_nasc" date, "numero" integer NOT NULL, CONSTRAINT "UQ_191867ec31933a4d3fe2b8a7978" UNIQUE ("numero"), CONSTRAINT "PK_1f415c249cdbab0c89b2556033d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "data_fundacao"`);
        await queryRunner.query(`ALTER TABLE "carro" ADD "data_fabricacao" date`);
        await queryRunner.query(`ALTER TABLE "equipes" ADD CONSTRAINT "UQ_63b6ee992fc661bec4e80842dd0" UNIQUE ("numero")`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62" UNIQUE ("chassi")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62"`);
        await queryRunner.query(`ALTER TABLE "equipes" DROP CONSTRAINT "UQ_63b6ee992fc661bec4e80842dd0"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "data_fabricacao"`);
        await queryRunner.query(`ALTER TABLE "carro" ADD "data_fundacao" date`);
        await queryRunner.query(`DROP TABLE "pilotos"`);
    }

}
