import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase } from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    // El service solo va a llamar a casos de uso

    async ortographyCheck(orthographyDto: OrthographyDto) {
        return await orthographyCheckUseCase(this.openai,{
            prompt: orthographyDto.prompt
        });
    }

}
