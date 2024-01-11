import OpenAI from "openai";

interface Options {
    threadId: string,
    runId: string,
}

export const checkCompleteStatusUseCase = async(openai: OpenAI, options: Options) => {

    const {threadId, runId} = options;

    const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runId,
    );

    console.log({status: runStatus.status});// completed

    if (runStatus.status === 'completed') {
        return runStatus;
    } 

    // Esperar un segundo para no saturar openai
    await new Promise(resolve => setTimeout(resolve, 1000));

    // llamamos a esta función de forma recursiva
    return await checkCompleteStatusUseCase(openai, options);
}