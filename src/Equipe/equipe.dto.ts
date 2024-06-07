import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class EquipeDto {
    @IsUUID()
    @IsOptional()
    id: string;
  
    @IsString({ message: 'O campo nome deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsString({ message: 'O campo origem deve ser do tipo texto' })
    origem: string;

    @IsInt({ message: 'O campo numero deve ser do numero inteiro e único para cada equipe' })
    @IsNotEmpty({ message: 'O numero não pode ser vazio' })
    numero: number;
  
    @IsDateString()
    @IsOptional()
    dataFundacao: Date;
  
  }