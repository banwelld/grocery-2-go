export default function StreetAddress({
  addressLine1,
  addressLine2,
  city,
  provinceCode,
  postalCode,
}) {
  return (
    <address className='street-address'>
      <p className='street-address__address-line'>{addressLine1}</p>
      {addressLine2 && <p className='street-address__address-line'>{addressLine2}</p>}
      <p className='street-address__address-line'>{`${city}, ${provinceCode}  ${postalCode}`}</p>
    </address>
  );
}
