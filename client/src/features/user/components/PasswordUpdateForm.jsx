import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../components/forms/FormikInput';
import Button from '../../../components/ui/Button';

import { InputTypes as Input } from '../../../config/constants';
import { toBemClassName } from '../../../utils/helpers';
import * as v from '../../../utils/validation';

const Fields = {
  PASSWORD_CURRENT: 'passwordCurrent',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'passwordConfirm',
};

const initialValues = {
  [Fields.PASSWORD_CURRENT]: '',
  [Fields.PASSWORD]: '',
  [Fields.PASSWORD_CONFIRM]: '',
};

const validationSchema = yup.object({
  [Fields.PASSWORD_CURRENT]: v.validateRequiredString,
  [Fields.PASSWORD]: v.validatePassword,
  [Fields.PASSWORD_CONFIRM]: v.validateConfirmPassword,
});

const bemMod = 'update-password';

export default function PasswordUpdateForm({ bemBlock = 'form', onSubmit }) {
  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <Form className={toBemClassName({ bemBlock, bemMod })}>
        <FormikInput
          name={Fields.PASSWORD_CURRENT}
          as={Input.INPUT}
          type={Input.PASSWORD}
          placeholder='current password'
          autoComplete='current-password'
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
          placeholder='new password'
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
          placeholder='confirm new password'
          autoComplete='new-password'
          className={toBemClassName({
            bemBlock,
            bemElem: 'field',
            bemMod,
          })}
        />
        <Button type='submit' label={'Update'} bemMod='page-utility' />
      </Form>
    </Formik>
  );
}
