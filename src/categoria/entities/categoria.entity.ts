/* eslint-disable prettier/prettier */
import {ApiProperty} from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "../../empresa/entities/empresa.entity";

@Entity({name: "tb_categorias"})
export class Categoria {

    @PrimaryGeneratedColumn()  
    @ApiProperty()  
    id: number

    @IsNotEmpty()
    @Column({length: 300, nullable: false})
    @ApiProperty()
    tipo_servico: string

    @ApiProperty()
    @OneToMany(()=> Empresa, (empresa)=> empresa.categoria)
    empresa: Empresa[]
    
}