import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../components/forms/FormikInput';
import Button from '../../../components/ui/Button';

import { InputTypes as Input } from '../../../config/constants';
import { toBemClassName } from '../../../utils/helpers';
import * as v from '../../../utils/validation';

const Fields = {
  EMAIL: 'email',
  NAME_FIRST: 'nameFirst',
  NAME_LAST: 'nameLast',
  PHONE: 'phone',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'passwordConfirm',
};

const initialValues = {
  [Fields.EMAIL]: '',
  [Fields.NAME_FIRST]: '',
  [Fields.NAME_LAST]: '',
  [Fields.PHONE]: '',
  [Fields.PASSWORD]: '',
  [Fields.PASSWORD_CONFIRM]: '',
};

const validationSchema = yup.object({
  [Fields.EMAIL]: v.validateEmail,
  [Fields.NAME_FIRST]: v.validateName,
  [Fields.NAME_LAST]: v.validateName,
  [Fields.PHONE]: v.validatePhone,
  [Fields.PASSWORD]: v.validatePassword,
  [Fields.PASSWORD_CONFIRM]: v.validateConfirmPassword,
});

const bemMod = 'registration';

export default function RegistrationForm({ bemBlock, onSubmit }) {
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
          name={Fields.NAME_FIRST}
          as={Input.INPUT}
          type={Input.TEXT}
          placeholder='first name'
          autoComplete='given-name'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.NAME_LAST}
          as={Input.INPUT}
          type={Input.TEXT}
          placeholder='last name'
          autoComplete='family-name'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.PHONE}
          as={Input.INPUT}
          type={Input.PHONE}
          placeholder='phone number (digits only)'
          autoComplete='tel'
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
          placeholder='password (10 character min.)'
          autoComplete='new-password'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <FormikInput
          name={Fields.PASSWORD_CONFIRM}
          as={Input.INPUT}
          type={Input.PASSWORD}
          placeholder='confirm password'
          autoComplete='new-password'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <Button type='submit' label={'Register'} bemMod='page-utility' />
      </Form>
    </Formik>
  );
}
