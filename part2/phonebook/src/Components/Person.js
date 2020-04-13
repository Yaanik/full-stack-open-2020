import React from 'react'
import Remove from './Remove'


const Person = ({person, onClick}) =>{
    return(
        <li key={person.name}>
            {person.name} --- {person.number}
            <Remove onClick={onClick}/>
        </li>
    )
}

export default Person