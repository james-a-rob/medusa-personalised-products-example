import { OpenAI } from 'openai';
import { MedusaService } from "@medusajs/framework/utils"
import { Design } from "./models/design"
import fetch from 'node-fetch'


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
});

export default class DesignModuleService extends MedusaService({
    Design,
}) {
    async generateDesign(prompt: string) {
        try {

            const response = await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            });


            const imageUrl = response.data[0].url;
            console.log('imageUrl', imageUrl);
            if (imageUrl) {
                const imageBuffer = await fetch(imageUrl)
                    .then((res) => res.buffer())
                    .catch((err) => {
                        console.error('Error fetching image:', err);
                        throw new Error('Failed to fetch image');
                    });

                return imageBuffer;
            }


        } catch (error) {
            console.error('Error generating image:', error);
            throw new Error('Failed to generate image');
        }

    }
}