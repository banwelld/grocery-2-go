import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../components/forms/FormikInput';
import Button from '../../../components/ui/Button';

import { InputTypes as Input } from '../../../config/constants';
import { toBemClassName } from '../../../utils/helpers';
import * as v from '../../../utils/validation';

const Fields = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

const initialValues = {
  [Fields.EMAIL]: '',
  [Fields.PASSWORD]: '',
};

const validationSchema = yup.object({
  [Fields.EMAIL]: v.validateEmail,
  [Fields.PASSWORD]: v.validatePassword,
});

const bemMod = 'login';

export default function LoginForm({ bemBlock, onSubmit }) {
  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <Form className={toBemClassName({ bemBlock, bemMod })}>
        <FormikInput
          name={Fields.EMAIL}
          as={Input.INPUT}
          type={Input.EMAIL}
          placeholder='your email address (username)'
          autoComplete='username'
          autoFocus={true}
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.PASSWORD}
          as={Input.INPUT}
          type={Input.PASSWORD}
          placeholder='password'
          autoComplete='current-password'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <Button type='submit' label={'Login'} bemMod='page-utility' />
      </Form>
    </Formik>
  );
}
