const parseArguments = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return{
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!')
    }
};

export const calculateBmi = (height: number, weight: number) : string =>{
    const bmi = Math.round(weight/(height*height)*10000);
    if(bmi < 18.5){
        return `you're underweight at ` + bmi + ` bmi`
    }
    else if(18.5 <= bmi && bmi < 24.9){
        return `you're normal weight at ` + bmi + ` bmi`
    }
    else if(24.9 <= bmi && bmi < 29.9){
        return `you're normal weight at ` + bmi + ` bmi`
    }
    else if(30 <= bmi){
      return `you're obese at ` + bmi + ` bmi`
    } else {
        throw new Error('Error calculating BMI')
    }
};

try {
    const {height, weight} = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Something went wrong: ', e.message)
}



