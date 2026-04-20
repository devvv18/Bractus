import { Controller, Post, Get, Body } from '@nestjs/common'
import { ContactService } from './contact.service'
import { CreateContactDto } from './create-contact.dto'

@Controller('contact')   // all routes start with /contact
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    // POST /contact  ← the frontend form calls this
    @Post()
    create(@Body() dto: CreateContactDto) {
        return this.contactService.create(dto)
    }

    // GET /contact  ← you can use this to see all submissions
    @Get()
    findAll() {
        return this.contactService.findAll()
    }
}