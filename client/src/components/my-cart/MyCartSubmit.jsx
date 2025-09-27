// MyCartSubmit.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import CustomInput from "../CustomInput";
import Heading from "../info-page/Heading";
import UserInfoCard from "../UserInfoCard";
import UserWrapper from "../UserWrapper";
import CheckoutBtn from "../cart-management/CheckoutBtn";
import { submitOrderSchema } from "../../form-schemas";
import provinceList from "../../provinces.json";

export default function MyCartSubmit({ formVisible, cartMgmtFunc }) {
  const formMsg = [
    "Please confirm your existing user information or update it if needed.",
    "Then tell us where you'd like the order sent. We'll email you with status updates as necessary.",
  ].join(" ");

  const toggleFormClass = formVisible ? "show" : "hidden";

  const provinces = provinceList.map((province) => (
    <option
      key={province.code}
      value={province.code}
    >{`${province.code} - ${province.name}`}</option>
  ));

  return (
    <section className={`my-cart-submit ${toggleFormClass}`}>
      <Heading text='Order Submission' isPgHead={false} subText={formMsg} />
      <div className={"form-info"}>
        <div>
          <h3>Your Information</h3>
          {/* Inject user data into UserInfoCard */}
          <UserWrapper>
            <UserInfoCard />
          </UserWrapper>
          <Link to='/user-info'>Update information</Link>
        </div>
        <Formik
          initialValues={{
            address: "",
            city: "",
            province_cd: "",
            postal_cd: "",
          }}
          onSubmit={(formValues) => {
            return formValues;
          }}
          validationSchema={submitOrderSchema}
        >
          <Form>
            <CustomInput type='text' placeholder='street address' name='address' />
            <CustomInput placeholder='city' type='text' name='city' />
            <CustomInput as='select' name='province_cd'>
              <option value='' disabled>
                select a province...
              </option>
              {provinces}
            </CustomInput>
            <CustomInput placeholder='postal code' type='text' name='postal_cd' />
            <CheckoutBtn cartMgmtFunc={cartMgmtFunc} />
          </Form>
        </Formik>
      </div>
    </section>
  );
}
