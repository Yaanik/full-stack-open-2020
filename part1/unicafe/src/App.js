import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = (header) => {
    return(
        <div>
            <h1>{header}</h1>
        </div>
    )
};

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const History = (props) =>{
    if(props.allClicks.length === 0){
        return(
            <div>
                Press the buttons
            </div>
        )
    }
    return(
        <div>
            History: {props.allClicks.join(' ')}
        </div>
    )
}


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const handleGood = () =>{

    }
    return (
        <div>
            <Header header={'cake'} />
        </div>
    )
}


ReactDOM.render(<App />,
    document.getElementById('root'));


/* Exercises
* 1.1 - DONE
* 1.2 - DONE
* 1.3 - DONE
* 1.4 - DONE
* 1.5 - DONE
*
*

* */