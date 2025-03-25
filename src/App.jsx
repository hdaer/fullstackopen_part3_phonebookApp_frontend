import { useEffect, useState } from "react";
import personsService from "./services/persons.js";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newNameAndOrNumber, setNewNameAndOrNumber] = useState({
    name: "",
    number: "",
  });
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const persons = personsService.getPersons();
    persons.then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personsService
        .deletePerson(person.id)
        .then(
          setPersons(
            persons.filter((filterPerson) => filterPerson.id !== person.id)
          )
        );
    } else {
      setPersons(persons);
    }
  };

  const personsToDisplay = nameFilter
    ? persons.filter((person) => {
        return person.name.toLowerCase().includes(nameFilter.toLowerCase());
      })
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter setNameFilter={setNameFilter} />
      <h3>add new name and number</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newNameAndOrNumber={newNameAndOrNumber}
        setNewNameAndOrNumber={setNewNameAndOrNumber}
      />
      <h3>Numbers</h3>
      <Persons
        personsToDisplay={personsToDisplay}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
