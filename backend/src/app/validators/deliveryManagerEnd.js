import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      originalname: Yup.string().required(),
      filename: Yup.string().required(),
    });

    await schema.validate({ ...req.file }, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ error: 'Validation fails', messages: err.inner });
  }
};
