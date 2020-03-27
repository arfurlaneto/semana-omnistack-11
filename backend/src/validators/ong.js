const { Joi } = require('celebrate');

export default Joi.object().keys({
  name: Joi.string().trim()
    .min(3)
    .max(200)
    .required(),
  email: Joi.string().trim()
    .max(200)
    .email()
    .required(),
  whatsapp: Joi.number()
    .min(1000000000)
    .max(99999999999)
    .required(),
  city: Joi.string().trim()
    .max(200)
    .required(),
  uf: Joi.string().trim()
    .length(2)
    .required(),
});
