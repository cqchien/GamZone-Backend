const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envSchema = Joi.object()
  .keys({
    DB_CONN: Joi.string().required().description("Mongo URL"),
    PORT: Joi.number().default(3000),
    SECRET: Joi.string().required().description("Token Secret"),
    JWT_ACCESS_EXPIRATION: Joi.number().description(
      "days after which access tokens expire"
    ),
  })
  .unknown();

const { value: envVal, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVal.PORT,
  mongoose: {
    url: envVal.DB_CONN,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  token: {
    accessExpiration: envVal.JWT_ACCESS_EXPIRATION,
    secret: envVal.SECRET,
  },
};
