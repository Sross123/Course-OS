import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Roles } from '../../types/global.type';

export class CreateAuthDto {
    @ApiProperty({
        example: 'john.doe@example.com',
        description: 'Unique email address for the user',
    })
    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @ApiProperty({
        example: 'StrongP@ss1',
        minLength: 6,
        description: 'Password for the account (minimum 6 characters)',
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password!: string;

    @ApiProperty({
        example: 'John Doe',
        description: 'Display name of the user',
    })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiPropertyOptional({
        enum: Roles,
        example: Roles.STUDENT,
        description: 'Role assigned to the user. Defaults to STUDENT when omitted.',
    })
    @IsEnum(Roles)
    @IsOptional()
    role?: Roles;
}
