import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCarroPiloto1717719229235 implements MigrationInterface {
    name = 'CreateCarroPiloto1717719229235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" ADD "pilotoId" uuid`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "UQ_d702297e7c2f79cbb7127e5b54b" UNIQUE ("pilotoId")`);
        await queryRunner.query(`ALTER TABLE "carro" ADD CONSTRAINT "FK_d702297e7c2f79cbb7127e5b54b" FOREIGN KEY ("pilotoId") REFERENCES "pilotos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "FK_d702297e7c2f79cbb7127e5b54b"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP CONSTRAINT "UQ_d702297e7c2f79cbb7127e5b54b"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "pilotoId"`);
    }

}
