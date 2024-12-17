import * as dotenv from 'dotenv';
dotenv.config()
import OpenAi from 'openai';

const openai = new OpenAi({
    apiKey: process.env.OPENAI,
});
import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req, res) => {
    try {
        const prompt = req.body.prompt;
    
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '512x512',
        })
    
        const image = aiResponse.data[0].url;
        res.send({ image });
    } catch (error) {
        console.error(error)
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
        
    }
})

app.listen('8080', () => console.log('Make art on http://localhost:8080/dream'));


