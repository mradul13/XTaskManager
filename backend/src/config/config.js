const path = require('path');
const dotenv = require('dotenv');
const joi = require('joi');

const DEFAULT_TODO_STATUS = 'TODO';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi.object({
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required(),
}).unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  // Set mongoose configuration
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
  },
  default_todo_status : DEFAULT_TODO_STATUS,
}
