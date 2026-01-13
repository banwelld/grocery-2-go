// /client/src/pages/cart/StepControls.jsx

import useCheckoutProcess from "../../../hooks/useCheckoutProcess";
import Button from "../../../components/ui/Button";
import { toClassName } from "../../../helpers/helpers";

const Labels = Object.freeze({
  PREV: "previous",
  NEXT: "next",
  SUBMIT: "submit"
})

export default function StepControls({ controls, ...bemProps }) {
  const { checkout: { checkout } } = useCheckoutProcess();
  const { isFirstStep, isLastStep, goBack, goNext } = controls;

  const bemElem = "button";

  const prevButtonProps = {
    onClick: goBack,
    label: Labels.PREV,
    bemMod: Labels.PREV,
    className: toClassName({
      ...bemProps,
      bemElem,
      bemMod2: Labels.PREV,
      showMod2: true
    })
  }

  const nextButtonProps = {
    onClick: goNext,
    label: Labels.NEXT,
    bemMod: Labels.NEXT,
    className: toClassName({
      ...bemProps,
      bemElem,
      bemMod2: Labels.NEXT,
      showMod2: true
    })
  }

  const submitButtonProps = {
    onClick: checkout,
    label: Labels.SUBMIT,
    bemMod: Labels.SUBMIT,
    className: toClassName({
      ...bemProps,
      bemElem,
      bemMod2: Labels.SUBMIT,
      showMod2: true
    })
  }

  return (
    <div className={toClassName({ ...bemProps, bemElem: "wrapper" })}>
      {!isFirstStep && (
        <Button {...prevButtonProps} />
      )}
      {!isLastStep && (
        <Button {...nextButtonProps} />
      )}
      {isLastStep && (
        <Button {...submitButtonProps} />
      )}
    </div>
  );
}
