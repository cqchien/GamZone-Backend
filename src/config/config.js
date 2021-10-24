const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({path: path.join(__dirname, '../../.env')})

const envSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        DB_CONN: Joi.string().required().description('Mongo URL'),
        URL_DEPLOY: Joi.string().description('URL which server is deployed.'),
        PORT: Joi.number.default(3000)
    })
    .unknow()

 
const { value: envVal, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
   
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    } 

module.exports = {
    env: envVal.NODE_ENV,
    port: envVal.PORT,
    server: {
        URL_DEPLOY: this.envVal.URL_DEPLOY
    },
    mongoose: {
        url: envVal.DB_CONN,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
          },
    }
}