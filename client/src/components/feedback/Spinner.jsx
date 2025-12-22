// /client/src/components/feedback/Spinner.jsx

import { FadeLoader } from "react-spinners";
import "../../css/modal.css";

export default function Spinner({ isLoading }) {
  return (
    <div className='aura'>
      <FadeLoader color={"#46bad7ff"} loading={isLoading} height={20} />
    </div>
  );
}
