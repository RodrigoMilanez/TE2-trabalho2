import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicial1717972040461 implements MigrationInterface {
    name = 'Inicial1717972040461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patrocinador" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(7) NOT NULL, CONSTRAINT "PK_aa066795f8c590e7b4d3aed6c2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "data_fundacao" date, "pilotosAtivos" integer NOT NULL DEFAULT '0', "numero" integer NOT NULL, "origem" character varying(100) NOT NULL, CONSTRAINT "UQ_63b6ee992fc661bec4e80842dd0" UNIQUE ("numero"), CONSTRAINT "PK_9f0bfc492ee9542b0c0f42eb21d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."carro_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "carro" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chassi" SERIAL NOT NULL, "data_fabricacao" date, "placa" character varying(7) NOT NULL, "status" "public"."carro_status_enum" DEFAULT 'I', "equipeId" uuid, "pilotoId" uuid, CONSTRAINT "UQ_3d3ad1deb154156b9d9ea912c62" UNIQUE ("chassi"), CONSTRAINT "REL_d702297e7c2f79cbb7127e5b54" UNIQUE ("pilotoId"), CONSTRAINT "PK_e96f1ee721c762a97d5686aab0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pilotos_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`CREATE TABLE "pilotos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "data_nasc" date, "numero" integer NOT NULL, "status" "public"."pilotos_status_enum" DEFAULT 'I', "equipeId" uuid, CONSTRAINT "UQ_191867ec31933a4d3fe2b8a7978" UNIQUE ("numero"), CONSTRAINT "PK_1f415c249cdbab0c89b2556033d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipes_patrocinadores" ("equipe_id" uuid NOT NULL, "patricinador_id" uuid NOT NULL, CONSTRAINT "PK_4c135a051d786532ebc4d8cb9b6" PRIMARY KEY ("equipe_id", "patricinador_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_49885d27351a9cb9afae727716" ON "equipes_patrocinadores" ("equipe_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_207095bc2e8b8e4893fdb6c730" ON "equipes_patrocinadores" ("patricinador_id") `);
        await queryRunner.query(`CREATE TABLE "pilotos_patrocinadores" ("piloto_id" uuid NOT NULL, "patricinador_id" uuid NOT NULL, CONSTRAINT "PK_3b530f434a7d6bf698ba5fffd97" PRIMARY KEY ("piloto_id", "patricinador_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3a4cfdcf47fc685b7ee757b77" ON "pilotos_patrocinadores" ("piloto_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ead55b3f01a85dd5173cb0fb4" ON "pilotos_patrocinadores" ("patricinador_id") `);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "FK_45a61b0ccb4111102e74d7912cc" FOREIGN KEY ("equipeId") REFERENCES "equipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "FK_d702297e7c2f79cbb7127e5b54b" FOREIGN KEY ("pilotoId") REFERENCES "pilotos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pilotos" ADD CONSTRAINT "FK_b6a2ff67261cb2c6b10f02af3ca" FOREIGN KEY ("equipeId") REFERENCES "equipes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "equipes_patrocinadores" ADD CONSTRAINT "FK_49885d27351a9cb9afae727716c" FOREIGN KEY ("equipe_id") REFERENCES "equipes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "equipes_patrocinadores" ADD CONSTRAINT "FK_207095bc2e8b8e4893fdb6c7302" FOREIGN KEY ("patricinador_id") REFERENCES "patrocinador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pilotos_patrocinadores" ADD CONSTRAINT "FK_b3a4cfdcf47fc685b7ee757b776" FOREIGN KEY ("piloto_id") REFERENCES "pilotos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pilotos_patrocinadores" ADD CONSTRAINT "FK_5ead55b3f01a85dd5173cb0fb48" FOREIGN KEY ("patricinador_id") REFERENCES "patrocinador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pilotos_patrocinadores" DROP CONSTRAINT "FK_5ead55b3f01a85dd5173cb0fb48"`);
        await queryRunner.query(`ALTER TABLE "pilotos_patrocinadores" DROP CONSTRAINT "FK_b3a4cfdcf47fc685b7ee757b776"`);
        await queryRunner.query(`ALTER TABLE "equipes_patrocinadores" DROP CONSTRAINT "FK_207095bc2e8b8e4893fdb6c7302"`);
        await queryRunner.query(`ALTER TABLE "equipes_patrocinadores" DROP CONSTRAINT "FK_49885d27351a9cb9afae727716c"`);
        await queryRunner.query(`ALTER TABLE "pilotos" DROP CONSTRAINT "FK_b6a2ff67261cb2c6b10f02af3ca"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "FK_d702297e7c2f79cbb7127e5b54b"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "FK_45a61b0ccb4111102e74d7912cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ead55b3f01a85dd5173cb0fb4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3a4cfdcf47fc685b7ee757b77"`);
        await queryRunner.query(`DROP TABLE "pilotos_patrocinadores"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207095bc2e8b8e4893fdb6c730"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49885d27351a9cb9afae727716"`);
        await queryRunner.query(`DROP TABLE "equipes_patrocinadores"`);
        await queryRunner.query(`DROP TABLE "pilotos"`);
        await queryRunner.query(`DROP TYPE "public"."pilotos_status_enum"`);
        await queryRunner.query(`DROP TABLE "carro"`);
        await queryRunner.query(`DROP TYPE "public"."carro_status_enum"`);
        await queryRunner.query(`DROP TABLE "equipes"`);
        await queryRunner.query(`DROP TABLE "patrocinador"`);
    }

}
