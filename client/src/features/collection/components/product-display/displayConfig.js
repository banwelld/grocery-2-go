export const DisplayVariantKey = Object.freeze({
  ADMIN: 'admin',
  CARD: 'card',
  PAGE: 'page',
});

export const displayConfig = {
  [DisplayVariantKey.CARD]: {
    hasPageHeading: false,
    imageLoadMethod: 'lazy',
    showDescription: false,
    showPackageSize: false,
  },
  [DisplayVariantKey.PAGE]: {
    hasPageHeading: true,
    imageLoadMethod: 'eager',
    showDescription: true,
    showPackageSize: true,
  },
  [DisplayVariantKey.ADMIN]: {
    hasPageHeading: false,
    imageLoadMethod: 'eager',
    showDescription: true,
    showPackageSize: true,
  },
};
