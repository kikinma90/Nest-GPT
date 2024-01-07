
import * as fs from 'fs'
import OpenAI from 'openai';


interface Options {
    prompt?: string;
    audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async(openai: OpenAI, options: Options) => {

    const { prompt, audioFile } = options;

    const response = await openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: fs.createReadStream(audioFile.path),
        prompt: prompt, // Tiene que ser en el mismo idioma del audio
        language: 'es',
        // para response_format srt es muy comun, pero vtt es mas completo
        //response_format: 'vtt', //''srt
        // verbose?json ofrece mas data y por eso es el que vamos a usar
        response_format: 'verbose_json', 
    });

    return response;

}