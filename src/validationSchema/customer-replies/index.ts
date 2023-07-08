import * as yup from 'yup';

export const customerReplyValidationSchema = yup.object().shape({
  response: yup.string().required(),
  user_id: yup.string().nullable(),
});
