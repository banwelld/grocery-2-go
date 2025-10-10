// ProductOrigin.jsx

export default function ProductOrigin({ country }) {
  if (origin.toLowerCase() !== "canada") return <p>Product of {country}</p>;
  return (
    <>
      <p>
        Product of <span className='canada'>{country}</span>
      </p>
      <img className='canada' src='/images/Flag_of_Canada.png' alt='Flag of Canada' />
    </>
  );
}
