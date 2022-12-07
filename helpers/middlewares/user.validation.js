const Joi = require("joi");

function validateUser(req, res, next) {
  const user = req.body;

  const schema = Joi.object({
    "name.first": Joi.string().min(3).max(45),
    "name.last": Joi.string().min(3).max(45),
    mobile: Joi.string()
      .pattern(new RegExp("^[0-9]{10,15}$"))
      .error(() => new Error("mobile must be 10 digit")),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .error(() => new Error("Invalid email")),
    password: Joi.string()
      .allow("")
      .optional()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}")),
    gender: Joi.string().min(1).max(15),
    role: Joi.string().min(1).max(25),
    status: Joi.any(),
    userId: Joi.number().min(0).max(10).optional(),
    dob: Joi.date(),
    avatar: Joi.string().allow("").optional(),
    idDoc: Joi.string().allow("").optional(),
    "address.street": Joi.string().min(3).max(45),
    "address.city": Joi.string().min(3).max(45),
    "address.country": Joi.string().min(3).max(45),
    "address.pincode": Joi.string().min(2).max(15),
    existingAvatar: Joi.string().allow("").optional(),
    existingIdDoc: Joi.string().allow("").optional(),
  });

  const result = schema.validate(user);
  console.log("result", result);
  if (result?.error)
    res.status(500).send({ message: result.error.message, error: null });
  else next();
}

module.exports = { validateUser };
