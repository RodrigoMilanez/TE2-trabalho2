import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipeModule } from './Equipe/equipe.module';
import { CarroModule } from './Carro/carro.module';
import { PilotoModule } from './Piloto/piloto.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions),
    EquipeModule,
    CarroModule,
    PilotoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
