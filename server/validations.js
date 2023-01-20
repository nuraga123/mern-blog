import { body } from "express-validator";

export const loginValidation = [
  body("email", "неправильная почта").isEmail(),
  body("password", "min 5 no password").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "неправильная почта").isEmail(),
  body("password", "min 5 no password").isLength({ min: 5 }),
  body("fullname", "неправильное имя").isLength({ min: 3 }),
  body("avatarUrl", "не правельная ссылка").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "нет загаловка").isLength({ min: 3 }).isString(),
  body("text", "нет текста").isLength({ min: 3 }).isString(),
  body("tags", "укажи массив => []").isLength({ min: 3 }).optional().isString(),
  body("imageUrl", "не правельная ссылка на картинку").optional().isString(),
];
