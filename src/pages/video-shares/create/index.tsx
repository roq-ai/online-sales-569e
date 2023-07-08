import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVideoShare } from 'apiSdk/video-shares';
import { Error } from 'components/error';
import { videoShareValidationSchema } from 'validationSchema/video-shares';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { VideoShareInterface } from 'interfaces/video-share';

function VideoShareCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VideoShareInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVideoShare(values);
      resetForm();
      router.push('/video-shares');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VideoShareInterface>({
    initialValues: {
      video_url: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: videoShareValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Video Share
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="video_url" mb="4" isInvalid={!!formik.errors?.video_url}>
            <FormLabel>Video Url</FormLabel>
            <Input type="text" name="video_url" value={formik.values?.video_url} onChange={formik.handleChange} />
            {formik.errors.video_url && <FormErrorMessage>{formik.errors?.video_url}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'video_share',
    operation: AccessOperationEnum.CREATE,
  }),
)(VideoShareCreatePage);
