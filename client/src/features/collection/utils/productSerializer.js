export const toClient = (dbData) => ({
  id: dbData.id,
  name: dbData.name,
  description: dbData.description,
  priceCents: dbData.price_cents,
  saleUnit: dbData.sale_unit,
  packageQuantity: dbData.package_quantity,
  category: dbData.category,
  imageFilename: dbData.image_filename,
  originCountry: dbData.origin_country,
});

export const toServer = (clientData) => {
  const data = {
    id: clientData.id,
    name: clientData.name,
    description: clientData.description,
    price_cents: clientData.priceCents,
    sale_unit: clientData.saleUnit,
    package_quantity: clientData.packageQuantity,
    category: clientData.category,
    image_filename: clientData.imageFilename,
    origin_country: clientData.originCountry,
  };

  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined),
  );
};
