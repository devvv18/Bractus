import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { ContactModule } from './contact/contact.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),   // loads .env file
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/bractus',
            }),
            inject: [ConfigService],
        }),
        ContactModule,
    ],
})
export class AppModule { }