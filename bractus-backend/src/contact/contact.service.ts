import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Contact } from './contact.schema'
import { CreateContactDto } from './create-contact.dto'

@Injectable()
export class ContactService {
    // "Inject" the Contact model so we can use it to talk to MongoDB
    constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) { }

    async create(dto: CreateContactDto): Promise<Contact> {
        const newContact = new this.contactModel(dto)
        return newContact.save()   // saves to MongoDB
    }

    async findAll(): Promise<Contact[]> {
        return this.contactModel.find().sort({ createdAt: -1 })  // newest first
    }
}