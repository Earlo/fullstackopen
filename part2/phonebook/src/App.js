import { useEffect, useState } from "react";

import axios from "axios";

const Filter = ({ query, setQuery }) => {
    return (
        <div>
            filter shown with:{" "}
            <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
        </div>
    );
};

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                if (persons.find((person) => person.name === newName)) {
                    alert(`${newName} is already added to phonebook`);
                } else {
                    setPersons(
                        persons.concat({ name: newName, number: newNumber })
                    );
                }
                setNewName("");
                setNewNumber("");
            }}
        >
            <div>
                name:{" "}
                <input
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                />
            </div>
            <div>
                number:{" "}
                <input
                    value={newNumber}
                    onChange={(event) => setNewNumber(event.target.value)}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

const Persons = ({ persons, query }) => {
    return persons
        .filter((person) =>
            query
                ? person.name.toUpperCase().indexOf(query.toUpperCase()) !== -1
                : true
        )
        .map((person) => (
            <div key={person.id}>
                {person.name} {person.number}
            </div>
        ));
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then((response) => {
            setPersons(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter query={query} setQuery={setQuery} />
            <h3>Add new</h3>
            <PersonForm persons={persons} setPersons={setPersons} />
            <h3>Numbers</h3>
            <Persons persons={persons} query={query} />
        </div>
    );
};

export default App;
