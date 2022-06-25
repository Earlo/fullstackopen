import { create, deleteId, getAll, update } from "./Api";
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

const PersonForm = ({ people, setPeople, setErrorMessage }) => {
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                const previousPerson = people.find(
                    (person) => person.name === newName
                );
                if (previousPerson) {
                    if (
                        window.confirm(
                            `${newName} is already added to phonebook, replace old number with new one`
                        )
                    ) {
                        update(previousPerson.id, {
                            id: previousPerson.id,
                            name: previousPerson.name,
                            number: newNumber,
                        })
                            .then((newPerson) => {
                                setPeople(
                                    people
                                        .filter(
                                            (p2) => p2.id !== previousPerson.id
                                        )
                                        .concat(newPerson)
                                );
                                setNewName("");
                                setNewNumber("");
                                setErrorMessage({
                                    message: `Updated phone number for ${newPerson.name}`,
                                    good: true,
                                });
                            })
                            .catch((error) => {
                                console.log("error", error);
                                setErrorMessage({
                                    message: `Failed to updated phone number for ${previousPerson.name}`,
                                    good: false,
                                });
                            });
                    }
                } else {
                    create({
                        id: people.length + 1,
                        name: newName,
                        number: newNumber,
                    })
                        .then((newPerson) => {
                            setPeople(people.concat(newPerson));
                            setNewName("");
                            setNewNumber("");
                            setErrorMessage({
                                message: `Added ${newPerson.name}`,
                                good: true,
                            });
                        })
                        .catch((error) => {
                            console.log("error", error);
                            setErrorMessage({
                                message: `Failed to add ${newName}`,
                                good: false,
                            });
                        });
                }
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

const People = ({ people, query, setPeople, setErrorMessage }) => {
    return people
        .filter((person) =>
            query
                ? person.name.toUpperCase().indexOf(query.toUpperCase()) !== -1
                : true
        )
        .map((person) => (
            <div key={person.id}>
                {person.name} {person.number}
                <button
                    onClick={() =>
                        deleteId(person.id)
                            .then((_) => {
                                setPeople(
                                    people.filter((p2) => p2.id !== person.id)
                                );
                                setErrorMessage({
                                    message: `Information of ${person.name} has been removed from the server`,
                                    good: true,
                                });
                            })
                            .catch((e) => {
                                setErrorMessage({
                                    message: `Information of ${person.name} has already been removed from the server`,
                                    good: false,
                                });
                            })
                    }
                >
                    delete
                </button>
            </div>
        ));
};

const Notification = ({ message, good }) => {
    if (message === null) {
        return null;
    }
    return <div className={good ? "success " : "error"}>{message}</div>;
};

const App = () => {
    const [people, setPeople] = useState([]);
    const [query, setQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState({
        message: null,
        good: true,
    });

    useEffect(() => {
        getAll().then((people) => {
            setPeople(people);
        });
    }, []);
    return (
        <div>
            <Notification
                message={errorMessage.message}
                good={errorMessage.good}
            />
            <h2>Phonebook</h2>
            <Filter query={query} setQuery={setQuery} />
            <h3>Add new</h3>
            <PersonForm
                people={people}
                setPeople={setPeople}
                setErrorMessage={setErrorMessage}
            />
            <h3>Numbers</h3>
            <People
                people={people}
                query={query}
                setPeople={setPeople}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
};

export default App;
