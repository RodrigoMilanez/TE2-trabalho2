import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertAutorEntity1716246193303 implements MigrationInterface {
    name = 'InsertAutorEntity1716246193303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO public.patrocinador (nome)
VALUES ('Crypto');

INSERT INTO public.patrocinador (nome)
VALUES ('Claro');

INSERT INTO public.patrocinador (nome)
VALUES ('Dunlop');

INSERT INTO public.patrocinador (nome)
VALUES ('Rolex');

INSERT INTO public.patrocinador (nome)
VALUES ('AWS');

INSERT INTO public.equipes (nome, data_fundacao, "pilotosAtivos", numero, origem)
VALUES ('Mercedes', '1955-01-01', 0, 44, 'Alemanha');

INSERT INTO public.equipes (nome, data_fundacao, "pilotosAtivos", numero, origem)
VALUES ('Red Bull Racing', '2005-10-03', 0, 33, 'Áustria');

INSERT INTO public.equipes (nome, data_fundacao, "pilotosAtivos", numero, origem)
VALUES ('Ferrari', '1929-02-16', 0, 55, 'Itália');

INSERT INTO public.equipes (nome, data_fundacao, "pilotosAtivos", numero, origem)
VALUES ('McLaren', '1963-09-02', 0, 14, 'Reino Unido');

INSERT INTO public.equipes (nome, data_fundacao, "pilotosAtivos", numero, origem)
VALUES ('Alpine F1 Team', '2021-09-09', 0, 10, 'França');

INSERT INTO public.pilotos (nome, data_nasc, numero, status)
VALUES ('Lewis Hamilton', '1985-01-07', 44, 'I');

INSERT INTO public.pilotos (nome, data_nasc, numero, status)
VALUES ('Max Verstappen', '1997-09-30', 33, 'I');

INSERT INTO public.pilotos (nome, data_nasc, numero, status)
VALUES ('Charles Leclerc', '1997-10-16', 16, 'I');

INSERT INTO public.pilotos (nome, data_nasc, numero, status)
VALUES ('Lando Norris', '1999-11-13', 4, 'I');

INSERT INTO public.pilotos (nome, data_nasc, numero, status)
VALUES ('Fernando Alonso', '1981-07-28', 1, 'I');

INSERT INTO public.carro (chassi, data_fabricacao, placa)
VALUES (11, '2024-01-01', 'ABC1234');

INSERT INTO public.carro (chassi, data_fabricacao, placa)
VALUES (22, '2023-07-15', 'DEF5678');

INSERT INTO public.carro (chassi, data_fabricacao, placa)
VALUES (33, '2022-12-24', 'GHI9012');

INSERT INTO public.carro (chassi, data_fabricacao, placa)
VALUES (44, '2021-05-08', 'JKL3456');

INSERT INTO public.carro (chassi, data_fabricacao, placa)
VALUES (55, '2020-03-19', 'MNO7890');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM Equipes WHERE numero = ''
        `);
    }

}