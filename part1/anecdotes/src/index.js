import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => (
    <div>
        <button onClick={onClick}>{text}</button>
    </div>
);

const MostVote = ({votes, anecdotes}) => {
    const amounts = votes.map(a => a.amount);
    const highestAmount = Math.max(...amounts);
    const mostVotes = votes.find(vote => vote.amount === highestAmount);
    const anecdote = anecdotes[mostVotes.id];
    return(
        <div>
            <h1>Anecdote with most votes</h1>
            <div>
                {anecdote}
            </div>
            <p>Has {mostVotes.amount} votes</p>
        </div>
    )
};

const App = (props) => {
    const [anecdote, setSelected] = useState(0);
    const [votes, setVote] = useState([
        {id: 0, amount: 3},
        {id: 1, amount: 1},
        {id: 2, amount: 2},
        {id: 3, amount: 8},
        {id: 4, amount: 5},
        {id: 5, amount: 6}
    ]);

    const handleVote = (props) =>{
        const newVote = [
            ...votes
        ];
        newVote[props].amount = votes[props].amount + 1;
        setVote(newVote);
    };
[]
    const handleAnecdote = () =>{
        setSelected(Math.floor(Math.random() * 6));
    };

    return (
        <div>
            <div>
                <h1>Anecdote of the day</h1>
                {props.anecdotes[anecdote]}
                <div>
                    has {votes[anecdote].amount} votes
                </div>
                <Button onClick={handleAnecdote} text='Next random' />
                <Button onClick={() => handleVote(anecdote)} text='Vote' />
            </div>
            <div>
                <div>
                    <MostVote votes={votes} anecdotes={anecdotes} />
                </div>
            </div>
        </div>

    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
<App anecdotes={anecdotes} />,
document.getElementById('root')
);

/*
* 1.12 - DONE
* 1.13 - DONE
* 1.14 - DONE
 */