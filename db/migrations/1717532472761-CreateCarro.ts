import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarro1717532472761 implements MigrationInterface {
    name = 'CreateCarro1717532472761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carro" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chassi" character varying(100) NOT NULL, "data_fundacao" date, "placa" character varying(7) NOT NULL, CONSTRAINT "PK_e96f1ee721c762a97d5686aab0d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "carro"`);
    }

}
