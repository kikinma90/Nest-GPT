import OpenAI from "openai";


interface Options {
    threadId: string;
}

export const getmessageListUseCase = async(openai: OpenAI, options: Options) => {

    const {threadId} = options;

    const messageList = await openai.beta.threads.messages.list(threadId);

    console.log(messageList);

    // en el map ponemos el parentesis despues de la funcion de flecha para devolver un objeto implicito
    const messages = messageList.data.map(message => ({
        role: message.role,
        // Esto lo creo yo para devolver mi objeto personalizado
        content: message.content.map(content => ( content as any).text.value),
    }));

    return messages;

}