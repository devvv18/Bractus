import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })   // adds createdAt, updatedAt automatically
export class Contact extends Document {
    @Prop({ required: true })
    name: string

    @Prop()
    company: string

    @Prop({ required: true })
    email: string

    @Prop()
    service: string

    @Prop({ required: true })
    message: string
}

export const ContactSchema = SchemaFactory.createForClass(Contact)