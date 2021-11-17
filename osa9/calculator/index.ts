const express = require('express');
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
app.use(express.json());

app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
      res.send({error: "malformatted parameters"});
  } else {
  const result = calculateBmi(height, weight);
  res.send({
    weight: weight,
    height: height,
    bmi: result});
  }
});

app.get('/exercises', (req: any, res: any) => {
  //const testhours = [1, 0, 2, 0, 3, 0, 2.5];
  //const testtarget = 2.5;
  const exercises = req.body.daily_exercises;
  const target = req.body.target;
 
  const allNumbers = exercises.some((n: any) => isNaN(Number(n)))

  if (!target || !exercises) {
    res.send({ error: "parameters missing" });
  }
  if (isNaN(Number(target)) || allNumbers) {
    res.send({ error: "malformatted parameters" });
  }
  const result = calculateExercises(target, exercises);

  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
