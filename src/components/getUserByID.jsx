import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as api from '../api'

export default function GetSingleUser() {
    const {_id} = useParams()
    const [userCard, setUserCard] = useState({})
    const [loading, isLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        api.getUsersByID(_id)
        .then((res) => {
            setUserCard(res)
            isLoading(false)
            setError(null)
        })
        .catch(( {
            response: {data: {msg}, status}
        }) => {
            setError({status, msg})
            isLoading(false)
        })
    }, [_id, isLoading])

    if (loading) return <h4>Loading</h4> // <------- Insert Loading
    if (error) return <h4>Error</h4> // <------Insert Error Handling

    return (
        <section className='userCard'>
            <dl key={userCard._id}>
                <dt>{userCard.firstName} {userCard.lastName}</dt>
                <dt>{userCard.lastVisit}</dt>
                <dt>{userCard.interests}</dt>
                <dt>{userCard.userRole}</dt>
            </dl>
        </section>

    )

}