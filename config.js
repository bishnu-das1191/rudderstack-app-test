const dotenv = require('dotenv');
const { resolve } = require('path');


// Determine environment
const env = process.env.NODE_ENV || 'development';
const envFile = resolve(process.cwd(), `.env.${env}`);

// Load environment variables from .env file
dotenv.config({ path: envFile });
console.log('Loaded environment variables:', dotenv.parsed);

console.log('Using .env file:', envFile);

// Export environment variables
const config = {
    username: process.env.QA_USERNAME,
    password: process.env.QA_PASSWORD,
    // Add more variables as needed
};

module.exports = config;
