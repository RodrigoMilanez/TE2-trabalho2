import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePilotosEquipes1717630650568 implements MigrationInterface {
    name = 'CreatePilotosEquipes1717630650568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipes" DROP CONSTRAINT "FK_06d70bfbdf785717ea0ecf5721f"`);
        await queryRunner.query(`ALTER TABLE "equipes" DROP COLUMN "pilotoId"`);
        await queryRunner.query(`ALTER TABLE "equipes" DROP COLUMN "pilotosId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipes" ADD "pilotosId" uuid`);
        await queryRunner.query(`ALTER TABLE "equipes" ADD "pilotoId" character varying`);
        await queryRunner.query(`ALTER TABLE "equipes" ADD CONSTRAINT "FK_06d70bfbdf785717ea0ecf5721f" FOREIGN KEY ("pilotosId") REFERENCES "pilotos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
