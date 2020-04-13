import React from 'react'
import Course from './Components/Course'

const App = ({courses}) =>{
    return (
        <div>
            {courses.map(course => <Course course={course} key={course.id}/>)}
        </div>
    )
}

export default App