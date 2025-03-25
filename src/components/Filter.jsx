const Filter = ({ setNameFilter }) => {
  const handleFilterInput = (e) => {
    const nameFilter = e.target.value;
    setNameFilter(nameFilter);
  };

  return (
    <>
      <div>filter names</div>
      <input type="text" onChange={handleFilterInput} />
    </>
  );
};

export default Filter;
