import {
  FETCH_PILOTS
} from './types'

export const fetchTestPilots = () => {
  return async (dispatch) => {
    const token = await window.localStorage.getItem('testFlightToken')
    const data = await fetch(`http://localhost:3000/api/users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    const users = await data.json()
    const pilots = users.users.filter((user) => {
      return !user.admin
    })
    dispatch (
      {
        type: FETCH_PILOTS,
        payload: pilots
      }
    )
  }
}

export const deleteTestPilot = (id) => {
  return async (dispatch) => {
    const token = await window.localStorage.getItem('testFlightToken')
    await fetch(`http://localhost:3000/api/users/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'DELETE'
    })
    dispatch (fetchTestPilots())
  }
}

export const addTestPilot = (body) => {
  return async (dispatch) => {
    const token = await window.localStorage.getItem('testFlightToken')
    await fetch(`http://localhost:3000/api/users`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    dispatch(fetchTestPilots)
  }
}
