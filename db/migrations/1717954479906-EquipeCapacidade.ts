import { MigrationInterface, QueryRunner } from "typeorm";

export class EquipeCapacidade1717954479906 implements MigrationInterface {
    name = 'EquipeCapacidade1717954479906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipes" ADD "pilotosAtivos" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "equipes" DROP COLUMN "pilotosAtivos"`);
    }

}
