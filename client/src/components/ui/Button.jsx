// /client/src/components/ui/Button.jsx

import { toClassName } from "../../helpers/helpers";

/**
 * Generic Button component for consistent UI styling.
 * 
 * **IMPORTANT**: Component defaults to type="button". Pass "submit" for forms.  
 * **IMPORTANT**: Component discards children. Pass label instead.
 * 
 * @param {object} props
 * @param {string} [props.label] - Text to display (if children are null).
 * @param {string} [props.type="button"] - HTML button type. **Defaults to "button"** - Pass "submit" explicitly for forms.
 * @param {boolean} [props.displayAsText=false] - If true, adds "text" modifier so that styling can be applied appropriately.
 * @param {string} [props.bemMod] - BEM modifier for class generation.
 */
export default function Button({
    label,
    type = "button",
    displayAsText = false,
    bemMod,
    children,
    ...props
}) {
    const buttonProps = { type, ...props };
    const bemProps = {
        bemBlock: "button",
        bemMod,
        bemMod2: "text",
        showMod2: displayAsText
    };

    return (
        <button {...buttonProps} className={toClassName(bemProps)}>
            {label}
        </button>
    );
}
