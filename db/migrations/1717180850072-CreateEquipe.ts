import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEquipe1717180850072 implements MigrationInterface {
    name = 'CreateEquipe1717180850072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "equipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "data_fundacao" date, "numero" integer NOT NULL, "origem" character varying(100) NOT NULL, CONSTRAINT "PK_9f0bfc492ee9542b0c0f42eb21d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "equipes"`);
    }

}
