

import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Roles } from '../../types/global.type';

export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsEnum(Roles)
    @IsOptional()
    role?: Roles;
}
