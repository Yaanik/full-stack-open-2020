import React, { useState, useEffect } from 'react'
import Person from './Components/Person'
import Filter from './Components/Filter'
import Message from "./Components/Message";
import personsService from './services/persons'

import './index.css'

const App = () => {
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber] = useState('');
    const [ filter, setFilter] = useState('');
    const [ message, setMessage] = useState('');
    const [ messageStyle, setMessageStyle ] = useState('');

    useEffect(() => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, []);

    const filterPhonebook = (event) => {
        setFilter(event.target.value)
    };

    const handlePersonChange = (event) =>{
        setNewName(event.target.value)
    };

    const handleNumberChange = (event) =>{
        setNewNumber(event.target.value)
    };

    const handleMessage = (message, type) => {
        setMessage(message);
        setMessageStyle(type)
        setTimeout(() => {
            setMessage(null)
            setMessageStyle(null)
        }, 5000)
    };

    const updatePersons = (prev, returned) => {
        const updatedPersons = [...prev];
        updatedPersons[returned.id - 1] = returned;
        setPersons(updatedPersons)
    };

    const addPerson = (event) =>{
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        };

        if(personObject.name !== '' || personObject.number !== ''){
            if(persons.find(person=> person.name === personObject.name)){
                if(window.confirm(`${personObject.name} is already in the phonebook!`+
                                    ` Do you want to update the number?`)){
                    const id = persons.find(person => person.name === personObject.name).id;
                    personsService
                        .update(id, personObject)
                        .then(returnedPerson => {
                            updatePersons(persons, returnedPerson);
                            setNewName('');
                            setNewNumber('');
                            handleMessage(`${returnedPerson.name} was successfully updated!`, 'success')
                        })
                        .catch(error =>{
                            handleMessage(`${personObject.name} couldn't be found in the database`, 'error')
                            setPersons(persons.find(p => p.id !== id))
                        })

                }
            } else{
                personsService
                    .create(personObject)
                    .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson));
                        setNewName('');
                        setNewNumber('');
                        handleMessage(`Person ${returnedPerson.name} was successfully added!`, 'success');
                    })
                    .catch(error =>{
                        handleMessage(`Unexpected error!`, 'error')
                    })
            }
        }
    };

    const removePerson = (id, name) =>{
        if(window.confirm(`Are you sure want to delete? ${name}`)){
            const person = persons.find(n => n.id === id);
            personsService
                .remove(person.id)
                .then(res => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error =>{
                    handleMessage(`Person ${name } was already removed from the server`, 'error')
                    })
        }
    };


    return (
        <div>
            <Message msg={message} style={messageStyle}/>
            <h2>Search</h2>
                <Filter value={filter} onChange={filterPhonebook}/>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    Name: <input
                    value={newName}
                    onChange={handlePersonChange} />
                </div>
                <div>
                    Number: <input
                    value={newNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {/*First returns a new array after filtering, then maps (creates a new array) which displays names and numbers*/}
                {persons.filter(person =>
                    person.name.toLowerCase().includes(filter.toLowerCase()))
                        .map((person) =>
                        <Person key={person.name} person={person} onClick={() => removePerson(person.id, person.name)}/>
                )}
            </ul>
        </div>
    )
};

export default App

/*
* 2.6 - DONE
* 2.7 - DONE
* 2.8 - DONE
* 2.9 - DONE
* 2.10 - DONE
* 2.11 - DONE
* 2.15 - DONE
* 2.16 - DONE
* 2.17 - DONE
* 2.18 - DONE
* */