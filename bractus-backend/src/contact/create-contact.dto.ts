import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    service?: string

    @IsString()
    @IsNotEmpty()
    message: string
}