import Person from "./Person";

const Persons = ({ personsToDisplay, handleDelete }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {personsToDisplay.map((person) => (
        <Person
          person={person}
          handleDelete={() => handleDelete(person)}
          key={person.id}
        />
      ))}
    </ul>
  );
};

export default Persons;
