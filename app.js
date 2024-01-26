const simpleProgram = (date, name, activity) => {
    console.log(`Today is ${date.toLocaleString()} and ${name} is going to ${activity}`);
    return true;
}

simpleProgram(new Date, 'Екатерина', 'AstonTrainee');