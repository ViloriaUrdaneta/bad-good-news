import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import { scrapi } from '@/webScapping/bbcNews';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)


export async function GET(request: Request){

    try {
        const bbcnews = await scrapi();
        console.log(bbcnews)
        const conciseNewsArray: string[] = bbcnews.map((news: any, index: number) => {
            return `Noticia ${index}: ${news.title} - desarrollo:${news.subtitle}`;
        });
        
        const response = await openai.createCompletion({
            prompt: `puedes, por favor, de esta lista de la siguiente lista de Noticias agruparlas en dos grupos. Un grupo con las que son noticias negativas que tienen que ver con conflictos, guerras, enfermedades y delitos y otro grupo las que son noticias positivas que tienen que ver con descubrimientos, deportes y cultura. Por favor dame única y exclusivamente los numeros de cada noticia de la siguiente manera: Positivas: [1, 2, ...] , Negativas: [1, 2, ...] . Acá está la lista: ${conciseNewsArray}`,
            //prompt: 'dime algo',
            model: 'text-davinci-003',
            temperature: 0.7,
            max_tokens: 150
        })
        console.log(response.data.choices)
        return NextResponse.json(response.data.choices[0].text)
        //return NextResponse.json(conciseNewsArray)
    } catch (error) {
        console.log('error en route', error)
        return NextResponse.json(error)
    }
}














//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