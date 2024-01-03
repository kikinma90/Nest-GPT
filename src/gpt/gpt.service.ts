import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase } from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto } from './dtos';
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

    async prosConsDiscusser({prompt}: ProsConsDiscusserDto) {
        return await prosConsDiscusserUseCase(this.openai, {prompt});
    }

    async prosConsDiscusserStream({prompt}: ProsConsDiscusserDto) {
        return await prosConsDiscusserStreamUseCase(this.openai, {prompt});
    }
    

}
