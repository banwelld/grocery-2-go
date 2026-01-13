// /client/src/components/product-display/displayConfig.js

export const displayConfig = {
  card: {
    bemBlock: "product-card",
    bemElem: "product-info",
    imageLoadMethod: "lazy",
    showDescription: false,
    showPackageSize: false,
  },
  page: {
    isTopLevel: true,
    bemBlock: "product-page",
    bemElem: "product-info",
    imageLoadMethod: "eager",
    showDescription: true,
    showPackageSize: true,
  },
};
