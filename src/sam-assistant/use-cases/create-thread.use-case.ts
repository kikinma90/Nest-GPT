import OpenAI from "openai";


// La idea de los casos de uso es que simplemente sea lo que vamos a ocupar para ejecutar el proceso.
export const cretateThreadUseCase = async (openai: OpenAI) => {
    
    const {id} = await openai.beta.threads.create();
    return {id};

} 