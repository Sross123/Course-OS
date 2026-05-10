import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Registered user email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongP@ss1',
    minLength: 6,
    description: 'Account password',
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(6)
  password!: string;
}
