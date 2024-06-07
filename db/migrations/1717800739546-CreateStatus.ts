import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStatus1717800739546 implements MigrationInterface {
    name = 'CreateStatus1717800739546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."carro_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`ALTER TABLE "carro" ADD "status" "public"."carro_status_enum" DEFAULT 'I'`);
        await queryRunner.query(`CREATE TYPE "public"."pilotos_status_enum" AS ENUM('A', 'I')`);
        await queryRunner.query(`ALTER TABLE "pilotos" ADD "status" "public"."pilotos_status_enum" DEFAULT 'I'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pilotos" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."pilotos_status_enum"`);
        await queryRunner.query(`ALTER TABLE "carro" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."carro_status_enum"`);
    }

}
