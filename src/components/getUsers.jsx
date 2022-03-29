import { useState, useEffect } from 'react';
import * as api from '../api'
import { Link } from 'react-router-dom';


export default function GetAllUsers() {
    const [loading, isLoading] = useState(false)
    const [error, setError] = useState(null)
    const [users, setUsers] = useState()

    useEffect(() => {
        isLoading(true)
        api.getUsers()
        .then((users) => {
            setUsers(users)
            isLoading(false)
            setError(null)
        })
        .catch(( {
            response: {data: {msg}, status}
        }) => {
            setError({status, msg})
            isLoading(false)
        })
    }, [setUsers])

    if (loading) return <h4>Insert Loading</h4> // <------- Put in Loading effects
    if (error) return <h4>Error!</h4> // <--------Put in Error effects

    return (
        <section >
            {users.map(({firstName, lastName, userRole, interests, lastVisit, _id}) => {
                return (
                    <div key={_id} >
                        <Link to={`pathway/${_id}`}>
                        {firstName} {lastName}
                        {lastVisit}
                        {userRole}
                        <br />
                        {interests}
                        </Link>
                    </div>
                )
            })}

        </section>
    )
}