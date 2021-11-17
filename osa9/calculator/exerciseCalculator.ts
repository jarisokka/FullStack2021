interface GivenValues {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): GivenValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const allNumbers = args.slice(2).some(n => isNaN(Number(n)));

  if (!isNaN(Number(args[2])) && !allNumbers) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(n => Number(n))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateExercises = (target: number, hours: Array<number>): any => {
  const trainign = hours.filter(n => n > 0);
  const average = hours.reduce((a,b) => a + b,0) / hours.length;

  const rating =() => {
    if (average > (target * 1.1)) {
      return 'excellent work'
    } else if (average < (target * 0.9)) {
      return 'poor performace, you can doo better'
    }
    return 'not too shappy'
  }

  return {
    periodLegth: hours.length,
    trainingDays: trainign.length,
    success: average >= target,
    rating: 2,
    ratingDescription: rating(),
    target: target,
    average: average
  }
}

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(target, hours));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
