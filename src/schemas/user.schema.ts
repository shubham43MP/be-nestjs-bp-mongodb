import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PaidPlans } from 'src/user/user.common';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: 1 })
  active: boolean;

  @Prop({
    type: String,
    enum: PaidPlans,
    default: PaidPlans.NoPlan,
  })
  paid_plan: string;

  @Prop({ required: true })
  plan_expiring: Date;

  @Prop()
  nickname: string;

  @Prop({ default: new Date() })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
