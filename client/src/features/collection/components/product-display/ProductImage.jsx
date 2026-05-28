import "./ProductImage.css";

export default function ProductImage({ bemBlock, alt = "", ...imgProps }) {
  return (
    <div className={`${bemBlock}__image-wrapper`}>
      <img className={`${bemBlock}__image`} alt={alt} {...imgProps} />
    </div>
  );
}
