import { MigrationInterface, QueryRunner } from "typeorm";

export class Patrocinador1717969954907 implements MigrationInterface {
    name = 'Patrocinador1717969954907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patrocinador" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(7) NOT NULL, CONSTRAINT "PK_aa066795f8c590e7b4d3aed6c2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "equipes_patrocinadores" ("equipe_id" uuid NOT NULL, "patricinador_id" uuid NOT NULL, CONSTRAINT "PK_4c135a051d786532ebc4d8cb9b6" PRIMARY KEY ("equipe_id", "patricinador_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_49885d27351a9cb9afae727716" ON "equipes_patrocinadores" ("equipe_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_207095bc2e8b8e4893fdb6c730" ON "equipes_patrocinadores" ("patricinador_id") `);
        await queryRunner.query(`CREATE TABLE "pilotos_patrocinadores" ("piloto_id" uuid NOT NULL, "patricinador_id" uuid NOT NULL, CONSTRAINT "PK_3b530f434a7d6bf698ba5fffd97" PRIMARY KEY ("piloto_id", "patricinador_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3a4cfdcf47fc685b7ee757b77" ON "pilotos_patrocinadores" ("piloto_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5ead55b3f01a85dd5173cb0fb4" ON "pilotos_patrocinadores" ("patricinador_id") `);
        await queryRunner.query(`ALTER TABLE "equipes" ALTER COLUMN "pilotosAtivos" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "equipes" ALTER COLUMN "pilotosAtivos" SET DEFAULT '0'`);
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
        await queryRunner.query(`ALTER TABLE "equipes" ALTER COLUMN "pilotosAtivos" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "equipes" ALTER COLUMN "pilotosAtivos" DROP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5ead55b3f01a85dd5173cb0fb4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3a4cfdcf47fc685b7ee757b77"`);
        await queryRunner.query(`DROP TABLE "pilotos_patrocinadores"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_207095bc2e8b8e4893fdb6c730"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_49885d27351a9cb9afae727716"`);
        await queryRunner.query(`DROP TABLE "equipes_patrocinadores"`);
        await queryRunner.query(`DROP TABLE "patrocinador"`);
    }

}
