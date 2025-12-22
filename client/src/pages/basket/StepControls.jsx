// /client/src/pages/basket/StepControls.jsx

import { toClassName } from "../../helpers/helpers";

export default function StepControls({
  goNext,
  goBack,
  isLastStep,
  isFirstStep,
  ...bemProps
}) {
  return (
    <div className={toClassName({ ...bemProps, bemMod: "container" })}>
      {!isFirstStep && (
        <button
          className={toClassName({ ...bemProps, bemMod: "previous" })}
          onClick={goBack}
        >
          Previous
        </button>
      )}
      {!isLastStep && (
        <button className={toClassName({ ...bemProps, bemMod: "next" })} onClick={goNext}>
          Next
        </button>
      )}
      {isLastStep && (
        <button className={toClassName({ ...bemProps, bemMod: "submit" })} onClick={null}>
          Submit
        </button>
      )}
    </div>
  );
}
