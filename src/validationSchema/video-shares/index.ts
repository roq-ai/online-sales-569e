import * as yup from 'yup';

export const videoShareValidationSchema = yup.object().shape({
  video_url: yup.string().required(),
  user_id: yup.string().nullable(),
});
