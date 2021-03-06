import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { EmptySpotLight } from "../helpers/EmptySpotLight"
import { SpotLight } from "../helpers/SpotLight"
import { getEventsByUserId } from "../modules/eventsManager"
import { userStorageKey } from "./auth/authSettings"
import "./Home.css"
export const DashBoard = () => {
    const [events, setEvents] = useState([])
    const history = useHistory()
    const getSoonest = (eventsToBeSorted) => {
        // const now = new Date()

        let sorted = eventsToBeSorted.sort(
            (currentEntry, nextEntry) =>
                Date.parse(currentEntry.eventDate) - Date.parse(nextEntry.eventDate)
        )
        let future = []
        let completed = []
        for (let i = 0; i < sorted.length; i++) {
            if (Date.parse(sorted[i].eventDate) > (Date.now() - 86400000).toFixed(0)) {
                future.push(sorted[i])
            } else {
                completed.push(sorted[i])
            }
        }
        setEvents([...future])
        // return [...sorted]
    }
    useEffect(() => {
        getEventsByUserId(sessionStorage.getItem(userStorageKey))
            .then(responseFromApi => { getSoonest(responseFromApi) })
    }, [])
    const handleEventOnClick = (evt) => {
        evt.preventDefault()
        history.push(`/events/${evt.target.id}`)
    }
    return (
        <>
            <div className="allEvents">
                <div>
                    {(events.length > 0) ? (
                        <div>
                            <div className="spotLightH2">Spot Light</div>

                            <div className="spotLightContainer">
                                {events.map((evt, i) => {
                                    if (i === 0) {
                                        return (
                                            <div key={evt.id}>
                                                <div onClick={handleEventOnClick} key={evt.id} className="eventDatePlanner">
                                                    <h2 id={evt.id}>{evt.eventDate}</h2>
                                                </div>
                                                <SpotLight key={"SpotLight"} eventMeal={evt.id} />
                                            </div>
                                        )
                                    }
                                    return ""
                                })
                                }
                            </div>
                        </div>
                    ) : <EmptySpotLight key={"emptySpotLight"} />}
                </div>
            </div>
        </>
    )
}