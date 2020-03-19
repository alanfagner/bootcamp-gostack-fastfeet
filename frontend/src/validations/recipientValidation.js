import * as Yup from 'yup';
import ValidationError from './ValidationException';

export async function newRecipientValidation(data) {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required('O nome é obrigatória'),
      number: Yup.number()
        .transform((cv, ov) => {
          return ov === '' ? undefined : cv;
        })
        .required('O numero é obrigatória'),
      address: Yup.string().required('O endereço é obrigatória'),
      state: Yup.string().required('O estado é obrigatória'),
      city: Yup.string().required('A cidade é obrigatória'),
      zipCode: Yup.number()
        .transform((cv, ov) => {
          return ov === '' ? undefined : cv;
        })
        .required('O codigo postal é obrigatória'),
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
