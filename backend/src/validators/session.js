const { Joi } = require('celebrate');

export default Joi.object().keys({
  id: Joi.string().trim().required(),
});
