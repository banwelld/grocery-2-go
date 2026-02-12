import { Form, Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '../../../components/forms/FormikInput';
import CountryOptions from '../../../components/forms/options/CountryOptions';
import CategoryOptions from '../../../components/forms/options/CategoryOptions';
import Button from '../../../components/ui/Button';

import { InputTypes as Input } from '../../../config/constants';
import { toBemClassName } from '../../../utils/helpers';
import { DEFAULT_SELECT_VALUE as DEFAULT } from '../../../config/enums';
import * as v from '../../../utils/validation';

const Fields = Object.freeze({
  PRODUCT_NAME: 'name',
  ORIGIN_COUNTRY: 'originCountry',
  CATEGORY: 'category',
  DESCRIPTION: 'description',
  PRICE_CENTS: 'priceCents',
  SALE_UNIT: 'saleUnit',
  PACKAGE_QUANTITY: 'packageQuantity',
  IMAGE_FILENAME: 'imageFilename',
});

const validationSchema = yup.object({
  [Fields.PRODUCT_NAME]: v.validateProductName,
  [Fields.ORIGIN_COUNTRY]: v.validateRequiredString,
  [Fields.CATEGORY]: v.validateSelectOption,
  [Fields.DESCRIPTION]: v.validateTextarea,
  [Fields.PRICE_CENTS]: v.validatePriceCents,
  [Fields.SALE_UNIT]: v.validateRequiredString,
  [Fields.PACKAGE_QUANTITY]: v.validatePackageQuantity,
  [Fields.IMAGE_FILENAME]: v.validateRequiredString,
});

const bemMod = 'registration';

export default function ProductForm({ bemBlock, onSubmit, product, children }) {
  const initialValues = {
    [Fields.PRODUCT_NAME]: product.id ? product[Fields.PRODUCT_NAME] : '',
    [Fields.ORIGIN_COUNTRY]: product.id
      ? product[Fields.ORIGIN_COUNTRY]
      : DEFAULT,
    [Fields.CATEGORY]: product.id ? product[Fields.CATEGORY] : DEFAULT,
    [Fields.DESCRIPTION]: product.id ? product[Fields.DESCRIPTION] : '',
    [Fields.PRICE_CENTS]: product.id ? product[Fields.PRICE_CENTS] : '',
    [Fields.SALE_UNIT]: product.id ? product[Fields.SALE_UNIT] : '',
    [Fields.PACKAGE_QUANTITY]: product.id
      ? product[Fields.PACKAGE_QUANTITY]
      : '',
    [Fields.IMAGE_FILENAME]: product.id ? product[Fields.IMAGE_FILENAME] : '',
  };

  const formikProps = {
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  };

  return (
    <Formik {...formikProps}>
      {({ values }) => (
        <>
          <Form className={toBemClassName({ bemBlock, bemMod })}>
            <FormikInput
              name={Fields.PRODUCT_NAME}
              as={Input.INPUT}
              type={Input.TEXT}
              placeholder='product name'
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            />
            <FormikInput
              name={Fields.ORIGIN_COUNTRY}
              as={Input.SELECT}
              type={null}
              placeholder={null}
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            >
              <CountryOptions />
            </FormikInput>
            <FormikInput
              name={Fields.CATEGORY}
              as={Input.SELECT}
              type={null}
              placeholder={null}
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            >
              <CategoryOptions />
            </FormikInput>
            <FormikInput
              name={Fields.DESCRIPTION}
              as={Input.TEXTAREA}
              type={null}
              placeholder='Describe the product here...'
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            />
            <FormikInput
              name={Fields.PRICE_CENTS}
              as={Input.INPUT}
              type={Input.NUMBER}
              step={1}
              placeholder='price in cents (e.g., 249 for $2.49)'
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            />
            <FormikInput
              name={Fields.SALE_UNIT}
              as={Input.INPUT}
              type={Input.TEXT}
              placeholder='sale unit (eg., bag, bottle)'
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            />
            <FormikInput
              name={Fields.PACKAGE_QUANTITY}
              as={Input.INPUT}
              type={Input.TEXT}
              placeholder='package quantity (e.g., 375ml, 454g)'
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            />
            <FormikInput
              name={Fields.IMAGE_FILENAME}
              as={Input.INPUT}
              type={Input.TEXT}
              placeholder='image filename or URL'
              autoComplete='off'
              className={toBemClassName({
                bemBlock,
                bemElem: 'field',
                bemMod,
              })}
            />
            <Button
              type='submit'
              label='Submit Product'
              bemMod='page-utility'
            />
          </Form>
          {typeof children === 'function' ? children(values) : children}
        </>
      )}
    </Formik>
  );
}
