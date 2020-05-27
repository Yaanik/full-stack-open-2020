import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })

  })

  test('zero resets the state', () => {
    const action = {
      type: 'ZERO'
    }

    const notZeroState = {
      good: 5,
      ok: 4,
      bad: 2
    }

    const state = notZeroState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('returns new state with action GOOD', () =>{
    const state = {
      good: 123,
      ok: 1337,
      bad: 666
    }

    const action = {
      type: 'GOOD'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)


    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      good: 124,
      ok: 1337,
      bad: 666
    })

  })
})