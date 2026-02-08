const PROVINCES = [
  { name: 'Bakery' },
  { name: 'Condiments' },
  { name: 'Dairy' },
  { name: 'Meat' },
  { name: 'Produce' },
];

export default function ProvinceOptions() {
  return (
    <>
      <option value='' disabled>
        select a category...
      </option>
      {PROVINCES.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </>
  );
}
