const yargs = require("yargs");
const chalk = require("chalk");
const weatherDatabase = require("./weatherData");

// Parse --city argument
const argv = yargs.argv;
const cityInput = argv.city ? argv.city.toLowerCase() : null;//note-This line uses a ternary operator, which is a shorthand for an if-else condition.It's a boolean check: Is argv.city provided?

//  List of available cities (from keys of the weather database)
const availableCities = Object.keys(weatherDatabase)
    .map(city => `"${weatherDatabase[city].name}"`)  // Capitalized names
    .join(", ");

//  Checking if user forgot to provide a city

if (!cityInput) {
    console.log(chalk.red(' Please provide a city using --city="City Name"'));
    console.log(chalk.yellow(` Available cities: ${availableCities}`));
    process.exit(1); // Exit with error code
}

if (!weatherDatabase[cityInput]) {
    console.log(chalk.red(` Weather data for "${argv.city}" not found.`));
    console.log(chalk.yellow(` Available cities: ${availableCities}`));
    process.exit(1); // Exit with error code
}
//  available city's weather ////
const cityWeather = weatherDatabase[cityInput];
console.log(chalk.green.bold(`-----\nWeather Report for ${cityWeather.name}-------------`));
console.log(`${chalk.blue("Temperature:")} ${cityWeather.temperature}`);
console.log(`${chalk.blue("Conditions:")} ${cityWeather.conditions}`);
console.log(`${chalk.blue("Humidity:")} ${cityWeather.humidity}`);
console.log(`${chalk.blue("Wind:")} ${cityWeather.wind}\n`);
