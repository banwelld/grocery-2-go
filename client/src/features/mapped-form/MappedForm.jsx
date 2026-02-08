import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { logException, toBemClassName } from '../../utils/helpers';
import Button from '../../components/ui/Button';
import FormikInput from '../../components/forms/FormikInput';
import ErrorPage from '../../pages/ErrorPage';
import { Headings } from '../../config/constants';

const ERRORS = {
  NO_VALIDATION_MAP: 'Cannot display form without validationMap.',
  NO_INITIAL_VALUES: 'Cannot display form without initialValues.',
  NO_ON_SUBMIT: 'Cannot submit form without onSubmit.',
};

export default function MappedForm({ config, onSubmit }) {
  const { initialValues, validationMap, submitButton, bemRoot } = config;

  const errors = [];

  if (!validationMap) errors.push(ERRORS.NO_VALIDATION_MAP);
  if (!initialValues) errors.push(ERRORS.NO_INITIAL_VALUES);
  if (!onSubmit) errors.push(ERRORS.NO_ON_SUBMIT);

  if (errors.length) {
    logException(errors);
    return <ErrorPage heading={Headings.DATA_MISSING} uiText={errors} />;
  }

  const validationSchema = yup.object(validationMap);

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
  };

  return (
    <Formik {...formikProps}>
      <Form className={toBemClassName({ ...bemRoot })}>
        {Object.entries(initialValues).map(([name, config]) => {
          const { Options } = config;
          const options = Options ? <Options /> : null;
          return (
            <FormikInput
              key={name}
              name={config.name}
              as={config.as}
              type={config.type}
              placeholder={config.placeholder}
              autoComplete={config.autoComplete}
              autoFocus={config.autoFocus ?? false}
              className={toBemClassName({ ...bemRoot, bemElem: 'field' })}
            >
              {options}
            </FormikInput>
          );
        })}
        {!!submitButton && (
          <Button
            type='submit'
            label={submitButton.label}
            bemMod='page-utility'
          />
        )}
      </Form>
    </Formik>
  );
}
