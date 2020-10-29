export interface Exercises {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Rating {
    rating: number,
    ratingDescription: string
}

const getRating = (hours: number, goal: number) : Rating => {
    if(hours + 1 > goal + 1){
        return {
            rating: 2,
            ratingDescription: `you've done well`
        }
    }
    else if(hours + 1 > goal){
        return {
            rating: 1,
            ratingDescription: `not too bad, but you could do better`
        }
    }
    else if (hours + 1 < goal){
        return {
            rating: 0,
            ratingDescription: `you should've tried harder`
        }
    }
    throw new Error ("Shouldn't be reachable")
};

export const calculateExercises  = (days: number[], goal: number) : Exercises => {
    if(!days || !goal) {
        throw new Error('Missing parameters')
    }
    if(!Array.isArray(days)){
        throw new Error('Malformated parameters')
    }

    const totalHours: number = days.reduce((a: number, b: number) => a + b);
    const dailyHours: number = totalHours/days.length;
    const rating = getRating(dailyHours, goal)
    return{
        periodLength: days.length,
        trainingDays: days.filter(d => d !== 0).length,
        success: dailyHours >= goal,
        rating: rating.rating,
        ratingDescription: rating.ratingDescription,
        target: goal,
        average: dailyHours
    }
};

const parseArgs = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments');

    if(!isNaN(Number(args[2]))){
        return{
            days: args.slice(3).filter(num => !isNaN(Number(num))).map(Number),
            goal: Number(args[2])
        }
    } else {
        throw new Error('Incorrect input!')
    }
};

try {
    const {days, goal} = parseArgs(process.argv);
    console.log(calculateExercises(days, goal));
} catch (e) {
    console.log('Something went wrong: ', e.message)
}
