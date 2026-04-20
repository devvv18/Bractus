import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // Allow the frontend (port 3000) to talk to this backend
    app.enableCors({ origin: 'http://localhost:3000' })

    // Automatically validate all incoming data
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(process.env.PORT ?? 3001)
    console.log('Bractus backend running on http://localhost:3001')
}
bootstrap()