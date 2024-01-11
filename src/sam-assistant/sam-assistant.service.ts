import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, cretateThreadUseCase, getmessageListUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {

    private openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Creamos el thread
    async createThread() {
        return cretateThreadUseCase(this.openai);
    }

    // Creamos los mensajes, creamos el run y verificamos hasta que el status este completed
    async userQuestion(questionDto: QuestionDto) {
        const {threadId, question} = questionDto;
        // Creamos el mensaje
        const message = await createMessageUseCase(this.openai, {threadId, question});
        // Creamos el run del mensaje
        const run = await createRunUseCase(this.openai, {threadId});
        // Esperamos el estado completado del run
        await checkCompleteStatusUseCase(this.openai, {runId: run.id, threadId: threadId});
        // Llamamos al caso de uso para que nos devuelva los mensajes
        const messages = await getmessageListUseCase(this.openai, {threadId});
        // Devolvemos esos mensajes
        return messages.reverse();
    }

}
