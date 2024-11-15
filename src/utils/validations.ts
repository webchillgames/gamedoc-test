import { email, helpers, required, minLength, maxLength, sameAs } from '@vuelidate/validators'
import type { Ref } from 'vue'

export const validations = {
  required: helpers.withMessage('Обязательно поле', required),
  email: helpers.withMessage('Email должен быть в формате example@email.com', email),
  minLength(value: number) {
    return helpers.withMessage(`Минимальная длина ${value} символа`, minLength(value))
  },
  maxLength(value: number) {
    return helpers.withMessage(`Максимальная длина ${value} символа`, maxLength(value))
  },
  sameAsPassword(value: Ref<string>) {
    return helpers.withMessage(`Пароли не совпадают`, sameAs(value))
  },
}
