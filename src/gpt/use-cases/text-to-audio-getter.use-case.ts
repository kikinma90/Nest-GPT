// Cuando requieras el path hacerlo de esta manera porque si no a veces viene como nulo
import * as path from 'path';
import * as fs from 'fs'
import { NotFoundException } from '@nestjs/common';


interface Options {
    fileId: string,
}

// Esto no es necesario hacerlo como un caso de uso, esto se puede hacer directamente en el service,
// pero aunque Fernando lo haya hecho en el service, yo por la estructura del software prefiero hacerlo como es resto y 
// tener un caso de uso para ello

export const textToAudioGetterUseCase = async (options: Options) => {

    const { fileId } = options;

    const filePath = path.resolve(__dirname, '../../../generated/audios/', `${fileId}.mp3`);

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;

}