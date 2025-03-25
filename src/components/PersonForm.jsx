import { useState } from "react";
import personsService from "../services/persons.js";
import NotificationMessage from "./NotificationMessage.jsx";

const PersonForm = ({
  persons,
  setPersons,
  newNameAndOrNumber,
  setNewNameAndOrNumber,
}) => {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleNameInput = (e) => {
    const nameInput = e.target.value;
    setNewNameAndOrNumber({ ...newNameAndOrNumber, name: nameInput });
  };

  const handleNumberInput = (e) => {
    const numberInput = e.target.value;
    setNewNameAndOrNumber({ ...newNameAndOrNumber, number: numberInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameExists = persons.some(
      (person) => person.name === newNameAndOrNumber.name
    );

    const numberExists = persons.some(
      (person) => person.number === newNameAndOrNumber.number
    );

    if (nameExists && !numberExists) {
      if (
        window.confirm(
          `Do you really want to update ${newNameAndOrNumber.name} number?`
        )
      ) {
        const idOfPersonNumberChange = persons.find(
          (person) => person.name === newNameAndOrNumber.name
        ).id;

        personsService
          .updatePersonNumber(idOfPersonNumberChange, newNameAndOrNumber)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) => {
                if (person.id === idOfPersonNumberChange) {
                  return returnedPerson;
                }
                return person;
              })
            )
          )
          .catch((error) => {
            setMessage(
              `${newNameAndOrNumber.name}'s information has already been removed from server.`
            );
            setMessageType("error");
            setPersons(
              persons.filter((person) => person.id !== idOfPersonNumberChange)
            );
          });

        setMessage(`Changed ${newNameAndOrNumber.name}'s phone number.`);
        setMessageType("success");
        setNewNameAndOrNumber({ name: "", number: "" });
      }
    } else if (nameExists && numberExists) {
      setMessage(
        `${newNameAndOrNumber.name} and ${newNameAndOrNumber.number} are already in the system. Please choose another name and check number.`
      );
      setMessageType("error");
    } else if (numberExists && !nameExists) {
      setMessage(
        `Number ${newNameAndOrNumber.number} is already in the system. Please check if you entered the correct number.`
      );
      setMessageType("error");
    } else {
      personsService.addPerson(newNameAndOrNumber).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewNameAndOrNumber({ name: "", number: "" });
      setMessage(`Added ${newNameAndOrNumber.name}`);
      setMessageType("success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <NotificationMessage
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      )}
      <div>
        name:{" "}
        <input
          type="text"
          value={newNameAndOrNumber.name}
          onChange={handleNameInput}
          placeholder="type name here ..."
        />
        <br />
        number:
        <input
          type="text"
          value={newNameAndOrNumber.number}
          onChange={handleNumberInput}
          placeholder="type number here ..."
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
