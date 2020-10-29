import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json())


app.get('/hello', (_req, res) => {
    res.status(200).send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    try{
        const {height, weight} = req.query;
        // @ts-ignore

        res.status(200).json({weight: weight, height: height, bmi: calculateBmi(height, weight)})
    } catch (err) {
        res.status(400).send({error: err.message})
    }

})

interface exerciseRequestBody{
    daily_exercises: Array<number>;
    target: number,
}

app.post('/exercises', (req, res) => {
    console.log('req.body => ', req.body)
    try{
        const body = req.body as exerciseRequestBody;
        const {daily_exercises, target} = body;

        const result = calculateExercises(daily_exercises, target)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({error})
    }

})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
});