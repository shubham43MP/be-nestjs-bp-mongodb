import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaidPlans } from './user.common';

export class CreateUserDto {
  @ApiProperty({ type: 'string', required: true })
  first_name: string;

  @ApiProperty({ type: 'string', required: true })
  last_name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Should be a valid email',
  })
  email: string;

  @ApiProperty({ type: 'string', required: true })
  password: string;

  @ApiPropertyOptional({ enum: PaidPlans })
  paid_plan: PaidPlans;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ type: 'string' })
  first_name: string;

  @ApiPropertyOptional({ type: 'string' })
  last_name: string;

  @ApiPropertyOptional({
    type: 'string',
    description: 'Should be a valid email',
  })
  email: string;

  @ApiPropertyOptional({ type: 'string' })
  password: string;

  @ApiPropertyOptional({ enum: PaidPlans })
  paid_plan: PaidPlans;
}

export class UpdateUserPasswordDto {
  @ApiPropertyOptional({ type: 'string' })
  password: string;
}
