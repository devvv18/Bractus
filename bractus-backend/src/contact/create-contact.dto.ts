import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsOptional()
    @IsString()
    company?: string

    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    service?: string

    @IsString()
    @IsNotEmpty()
    message: string
}