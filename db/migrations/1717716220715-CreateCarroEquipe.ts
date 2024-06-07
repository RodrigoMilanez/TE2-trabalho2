import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarroEquipe1717716220715 implements MigrationInterface {
    name = 'CreateCarroEquipe1717716220715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "carro" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chassi" character varying(100) NOT NULL, "data_fabricacao" date, "placa" character varying(7) NOT NULL, "equipeId" uuid, CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62" UNIQUE ("chassi"), CONSTRAINT "PK_e96f1ee721c762a97d5686aab0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "FK_45a61b0ccb4111102e74d7912cc" FOREIGN KEY ("equipeId") REFERENCES "equipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "FK_45a61b0ccb4111102e74d7912cc"`);
        await queryRunner.query(`DROP TABLE "carro"`);
    }

}
