import OpenAI from "openai";


interface Options {
    threadId: string;
    assistantId?: string;
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
    
    const {threadId, assistantId = 'asst_oNrK6RXzmqZ9FKJAt25nUNlr'} = options;

    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
        //instructions: //OJO! Sobre escribe el assistente lo que pongamos aquí
    });

    console.log({run});
    return run;

} 