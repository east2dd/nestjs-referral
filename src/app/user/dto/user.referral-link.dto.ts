import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserReferralLinkDto {
  @ApiProperty({
    name: 'token',
    description: 'token of referral',
  })
  @IsOptional()
  @IsString()
  public token: string

  @ApiProperty({
    name: 'url',
    description: 'sign up url',
  })
  @IsOptional()
  @IsString()
  public url: string
}
