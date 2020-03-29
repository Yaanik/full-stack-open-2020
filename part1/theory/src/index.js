import React, {useState} from 'react'
import ReactDOM from 'react-dom'

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


const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('<-'));
        setLeft(left + 1)
    };

    const handleRightClick = () => {
        setAll(allClicks.concat('->'));
        setRight(right + 1)
    };


    return (
        <div>
            <div>
                {left}
                <Button onClick={handleLeftClick} text='<-' />
                <Button onClick={handleRightClick} text='->' />
                {right}
                <History allClicks={allClicks} />
            </div>
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