import * as Yup from 'yup';
import ValidationError from './ValidationException';

export async function newDeliveryValidation(data) {
  try {
    const schema = Yup.object().shape({
      recipientId: Yup.string().required('O destinatário é obrigatória'),
      deliveryManId: Yup.string().required('O entregador é obrigatória'),
      product: Yup.string().required('O nome do produto é obrigatória'),
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
