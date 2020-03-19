import * as Yup from 'yup';
import ValidationError from './ValidationException';

export async function newDeliveryManValidation(data) {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatória'),
      email: Yup.string().required('O email é obrigatória'),
    });

    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        throw new ValidationError(validationErrors, err.message);
      }
    }
    throw err;
  }
}
