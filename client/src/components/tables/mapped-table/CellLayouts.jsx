// /client/src/components/tables/mapped-table/CellLayouts.jsx

import ProductImage from "../../product-display/ProductImage";
import { divideIntBy100 } from "../../../helpers/helpers";

export function Currency({ data }) {
    const decimalPrice = divideIntBy100(data, false);
    return (
        <div className='price__wrapper'>
            <span>$</span>
            <span>{decimalPrice}</span>
        </div>
    );
}

export function Image({ data }) {
    const imageProps = {
        src: data.imageUrl,
        alt: data.name,
        loading: "eager",
        bemBlock: "table",
    };
    return <ProductImage {...imageProps} />;
}
