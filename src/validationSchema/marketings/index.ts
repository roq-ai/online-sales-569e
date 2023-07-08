import * as yup from 'yup';

export const marketingValidationSchema = yup.object().shape({
  campaign_name: yup.string().required(),
  user_id: yup.string().nullable(),
});
