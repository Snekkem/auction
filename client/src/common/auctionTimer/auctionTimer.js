import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getAuctions} from "../../redux/dispatches/auctionDispatch";

const AuctionTimer = ({time, sendAuctions, getAuctions}) => {
    const [currentTime, setCurrentTime] = useState(time)

    useEffect(() => {
        setCurrentTime(time)
    }, [time])

    useEffect(() => {
        const timer = setInterval(() => {
         setCurrentTime(prev => {
             if (prev <= 0) {
                 getAuctions()
                 sendAuctions({type: 'fetchAuction'})
                 clearInterval(timer);
                 return 0
             }
             return prev - 1
         })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const days = Math.floor(currentTime / 24 / 60 / 60);
    const hoursLeft = Math.floor((currentTime) - (days * 86400));
    const hours = Math.floor(hoursLeft / 3600);
    const minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    const minutes = Math.floor(minutesLeft / 60);
    const seconds = currentTime % 60;

    return (
        <div>
            <span>{days}d. {hours}h. {minutes}min. {seconds}sec.</span>
        </div>
    )
}

export default connect(null, {getAuctions})(AuctionTimer)

