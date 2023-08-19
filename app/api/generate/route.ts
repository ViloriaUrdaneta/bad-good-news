import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { bbcTopNews } from '@/webScapping/bbcNews';
import { bbcTopNewsLambda } from '../../../webScapping/bbcNewsLambda'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)


export async function POST(request: Request){

    try {
        const bbcnews = await bbcTopNewsLambda();
        console.log(bbcnews)
        /*
        const response = await openai.createCompletion({
           // prompt: `dame por favor un resumen muy resumido de todas estas noticias, separando por un lado las noticias negativas sobre crisis, guerras y conflictos; y por otro las noticias positivas sobre descubrimientos, arte ${bbcnews}`,
            prompt: 'dime algo',
            model: 'text-davinci-003',
            temperature: 0.7,
            max_tokens: 150
        })
        console.log(response.data.choices)
        return NextResponse.json(response.data.choices[0].text)*/
        return NextResponse.json(bbcnews)
    } catch (error) {
        console.log('error en route', error)
        return NextResponse.json(error)
    }
}














//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