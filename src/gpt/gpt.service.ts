import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDiscusserStreamUseCase, prosConsDiscusserUseCase , textToAudioGetterUseCase, textToAudioUseCase, translateUseCase} from './use-cases';
import { OrthographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
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

    async translateText({prompt, lang}: TranslateDto) {
        return await translateUseCase(this.openai, {prompt, lang});
    }

    async textToAudio({prompt, voice}: TextToAudioDto) {
        return await textToAudioUseCase(this.openai, {prompt, voice});
    }

    async textToAudioGetter(fileId: string) {
        return textToAudioGetterUseCase({fileId});
    }
    

}

