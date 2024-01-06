// Cuando requieras el path hacerlo de esta manera porque si no a veces viene como nulo
import * as path from 'path';
import * as fs from 'fs'
import OpenAI from 'openai';


interface Options {
    prompt: string;
    voice?: string;
}

export const textToAudioUseCase = async(openai: OpenAI, options: Options) => {

    const { prompt, voice } = options;

    const voices = {
        nova: 'nova',
        alloy: 'alloy',
        echo: 'echo',
        fable: 'fable',
        onyx: 'onyx',
        shimmer: 'shimmer'
    }

    const selectedVoice = voices[voice] ?? 'nova';

    // Puedes generarlo por userid, para saber que usuario generó cada audio
    // const folderPath = path.resolve(__dirname, '../../../generated/USERID/audios')
    const folderPath = path.resolve(__dirname, '../../../generated/audios/');
    // Si lo vas a subir a producción y dos usuarios suben un audio al mismo tiempo se va a sobrescribir, por eso en ese caso
    // habría que usar lo siguiente:
    //const speechFile = path.resolve(`${folderPath}/${USERID}/${new Date().getTime()}.mp3`)
    const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`)

    fs.mkdirSync(folderPath, {recursive: true});

    const mp3 = await openai.audio.speech.create({
        model: 'tts-1-hd',
        voice: selectedVoice,
        input: prompt,
        response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(speechFile,buffer);

    return speechFile;

}