import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
    const good = () => {
        store.dispatch({
            type: 'GOOD'
        })
    }
    const ok = () => {
        store.dispatch({
            type: 'OK'
        })
    }
    const bad = () => {
        store.dispatch({
            type: 'BAD'
        })
    }
    const reset = () => {
        store.dispatch({
            type: 'ZERO'
        })
    }

    return (
        <div>
            <div>
                <h2>Give feedback</h2>
                <div>
                    <button onClick={good}>Good</button>
                    <button onClick={ok}>Neutral</button>
                    <button onClick={bad}>Bad</button>
                    <button onClick={reset}>Reset to zero</button>

                </div>
            </div>
            <div>
                <h2>Statistics</h2>
                <div>
                    <div>Good: {store.getState().good}</div>
                    <div>Neutral: {store.getState().ok}</div>
                    <div>Bad: {store.getState().bad}</div>
                </div>
            </div>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

/*
* 6.1 - DONE
* 6.2 - DONE
*
* */
