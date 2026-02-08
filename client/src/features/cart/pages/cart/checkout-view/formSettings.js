import ProvinceOptions from '../../../../../components/forms/options/ProvinceOptions.jsx';
import Input, { InputKey } from '../../../../../config/formInputConfig';
import {
  validateCity,
  validatePostalCd,
  validateSelectOption,
  validateAddressLine1,
  validateAddressLine2,
} from '../../../../../utils/validation.js';

const { ADDRESS_LINE_1, ADDRESS_LINE_2, CITY, PROVINCE_CODE, POSTAL_CODE } =
  InputKey;

const {
  [ADDRESS_LINE_1]: address1Config,
  [ADDRESS_LINE_2]: address2Config,
  [CITY]: cityConfig,
  [PROVINCE_CODE]: provinceConfig,
  [POSTAL_CODE]: postalConfig,
} = Input;

const formSettings = {
  formSchema: {
    [ADDRESS_LINE_1]: { ...address1Config, autoFocus: true },
    [ADDRESS_LINE_2]: address2Config,
    [CITY]: cityConfig,
    [PROVINCE_CODE]: { ...provinceConfig, Options: ProvinceOptions },
    [POSTAL_CODE]: postalConfig,
  },
  initialValues: {
    [ADDRESS_LINE_1]: '',
    [ADDRESS_LINE_2]: '',
    [CITY]: '',
    [POSTAL_CODE]: '',
    [PROVINCE_CODE]: '',
  },
  validationMap: {
    [ADDRESS_LINE_1]: validateAddressLine1,
    [ADDRESS_LINE_2]: validateAddressLine2,
    [CITY]: validateCity,
    [POSTAL_CODE]: validatePostalCd,
    [PROVINCE_CODE]: validateSelectOption,
  },
  submitButton: { label: 'Save' },
  bemRoot: { bemBlock: 'form', bemMod: 'address' },
};

export default formSettings;
