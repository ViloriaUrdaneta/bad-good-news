import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { bbcTopNews } from '@/webScapping/bbcNews';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)


export async function POST(request: any){

    try {
        const bbcnews = await bbcTopNews();
        console.log(bbcnews)
        const response = await openai.createCompletion({
            prompt: `en este array de objetos estan los titulos y subtitulos de las principales noticias de la pagina de bbc mundo: ${bbcnews}
            me puedes hacer un resumen general que abarque todas estas noticias en un solo texto corto y conciso de estas, 
            dividiendolas en dos, primero aquellas noticias negativas que hablen de conflictos, guerras o crimenes 
            y segundo aquellas con noticias más positivas que traten temas esperanzadores, cientificos, artisticos o graciosos, por favor?`,
            model: 'text-davinci-003',
            temperature: 0.7,
            max_tokens: 150
        })
        console.log(response.data.choices)
        return NextResponse.json(response.data.choices[0].text)
    } catch (error) {
        console.log('error en route', error)
        return NextResponse.json(error)
    }
}














//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