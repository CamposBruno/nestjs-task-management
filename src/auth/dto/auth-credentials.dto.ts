import { IsNotEmpty, IsString, MaxLength, MinLength, Matches } from "class-validator"

export class AuthCredentialsDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)    
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message : 'password is too week'})
    // Password will contain at least 1 lower case letter
    // Password will contain at least 1 upper case letter
    // Password will contain at least 1 number or special character
    password: string
}