/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Empresa } from "../../empresa/entities/empresa.entity"

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn() 
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) 
    nome: string

    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    usuario: string

    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false }) 
    senha: string

    @Column({ length: 5000 }) 
    foto: string

    @Column({type: "float"})
    altura: number

    @Column({type: "float"})
    peso: number

    get imc(): number{
        if(!this.altura || !this.peso) return 0;
        return Number ((this.peso /(this.altura*this.altura)).toFixed(2));
    }

    @OneToMany(() => Empresa, (empresa) => empresa.usuario)
    empresa: Empresa[]
}
