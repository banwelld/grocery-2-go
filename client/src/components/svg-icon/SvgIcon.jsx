// /client/src/components/quantity-adjust/SvgIcon.jsx

import { ButtonStyle } from "../quantity-adjust/constants";

const svgPath = Object.freeze({
  [ButtonStyle.INCREMENT]: `
    m296-345-56-56 240-240 240 240-56 56-184-183-184 183Z`,
  [ButtonStyle.ADD_INITIAL]: `
    M465-613v-123H341v-60h124v-123h60v123h123v60H525v123h-60ZM289.79-80Q260-80 
      239-101.21t-21-51Q218-182 239.21-203t51-21Q320-224 341-202.79t21 51Q362-122 
      340.79-101t-51 21Zm404 0Q664-80 643-101.21t-21-51Q622-182 643.21-203t51-21Q724-224 
      745-202.79t21 51Q766-122 744.79-101t-51 21ZM62-820v-60h116l170 364h287.71L796
      -796h67L701-493q-11 19-28.56 30.5T634-451H331l-56 104h491v60H284q-37.66 0-57.33
      -30T224-378l64-118-148-324H62Z`,
  [ButtonStyle.DISABLED]: null,
  [ButtonStyle.DECREMENT]: `
    M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z`,
  [ButtonStyle.RESET]: `
    M381-656v-60h227v60H381ZM289.79-80Q260-80 239-101.21t-21-51Q218-182 239.21-203t51
      -21Q320-224 341-202.79t21 51Q362-122 340.79-101t-51 21Zm404 0Q664-80 643-101.21t
      -21-51Q622-182 643.21-203t51-21Q724-224 745-202.79t21 51Q766-122 744.79-101t-51 
      21ZM62-820v-60h116l170 364h287.71L796-796h67L701-493q-11 19-28.56 30.5T634-451H331l-56 
      104h491v60H284q-37.66 0-57.33-30T224-378l64-118-148-324H62Z`,
  CART_ICON: `
    M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 
      51Q359-123 337.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51
      -21Q717-225 738-203.79t21 51Q759-123 737.79-102t-51 21ZM235-741l110 228h288l125-228H235Zm
      -30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 
      104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z`,
});

/**
 * styleKey values are defined in svg-icon/constants.js
*/
export default function Icon({ pathName, iconSizePx = 24 }) {
  const svgProps = {
    fill: "currentColor",
    width: `${iconSizePx}px`,
    height: `${iconSizePx}px`,
    viewBox: "0 -960 960 960",
    xmlns: "http://www.w3.org/2000/svg",
  };
  return (
    <svg {...svgProps}>
      <path d={svgPath[pathName]} fillRule='evenodd' clipRule='evenodd' />
    </svg>
  );
}