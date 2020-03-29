import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
);

const Statistic = (props) =>{
    return(
        <tr>
            <td> {props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
};

const Statistics = (props) => {
        if(props.good === 0 && props.bad === 0 && props.neutral === 0){
            return(
                <div>
                    <p>
                        No feedback given yet yet!
                    </p>
                </div>
            )
        }

        return(
            <div>
                <table>
                    <tbody>
                    <Statistic text='Good' value={props.good}/>
                    <Statistic text='Neutral' value={props.neutral}/>
                    <Statistic text='Bad' value={props.bad}/>
                    <Statistic text='All' value={props.good + props.neutral + props.bad}/>
                    <Statistic text='Average' value={(props.good - props.bad)/(props.good + props.neutral + props.bad)}/>
                    <Statistic text='Positive' value={props.good/(props.good + props.neutral + props.bad)*100 + '%'}/>
                    </tbody>
                </table>
            </div>
        )
};

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () =>{
        setGood(good + 1);
    };
    const handleNeutral = () =>{
        setNeutral(neutral + 1);
    };
    const handleBad = () =>{
        setBad(bad + 1);
    };

    return (
        <div>
            <h1>Give feedback</h1>
            <Button onClick={handleBad} text={'Bad!'} />
            <Button onClick={handleNeutral} text={'Neutral!'} />
            <Button onClick={handleGood} text={'Good!'} />

            <h1>Statistics</h1>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )

};

ReactDOM.render(<App />,
    document.getElementById('root')
);


/* Exercises
* 1.1 - DONE
* 1.2 - DONE
* 1.3 - DONE
* 1.4 - DONE
* 1.5 - DONE
* 1.6 - DONE
* 1.7 - DONE
* 1.8 - DONE
* 1.9 - DONE
* 1.10 - DONE
* 1.11 - DONE
*

* */