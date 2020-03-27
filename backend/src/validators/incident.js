const { Joi } = require('celebrate');

export default Joi.object().keys({
  title: Joi.string().trim()
    .max(200)
    .required(),
  description: Joi.string().trim()
    .max(200)
    .required(),
  value: Joi.number()
    .min(1)
    .required(),
});
