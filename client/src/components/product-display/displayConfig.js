// /client/src/components/product-display/displayConfig.js

export const displayConfig = {
  card: {
    headingLevel: 2,
    bemBlock: "product-card",
    bemElem: "product-info",
    imageLoadMethod: "lazy",
    showDescription: false,
    showPackageSize: false,
  },
  page: {
    headingLevel: 1,
    bemBlock: "product-page",
    bemElem: "product-info",
    imageLoadMethod: "eager",
    showDescription: true,
    showPackageSize: true,
  },
};
