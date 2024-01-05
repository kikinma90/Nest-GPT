import OpenAI from "openai";


interface Options {
    prompt: string;
    lang: string;
}

export const translateUseCase = async(openai: OpenAI, options: Options) => {

    const { prompt, lang } = options;

    const response = await openai.chat.completions.create({
        messages: [
            { 
                role: "system", 
                content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`
            },
        ],
        model: "gpt-4",
        temperature: 0.2,
        // max_tokens: 150,
        // Esrto no lo soportan todos los modelos
        // response_format: {
        //     type: 'json_object'
        // }
      });
    
    //   console.log(completion);

      return {message: response.choices[0].message.content};

}