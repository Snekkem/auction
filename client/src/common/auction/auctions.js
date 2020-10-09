import React, {useState} from "react";
import Auction from "./auction";
import {ADMIN} from "../../constants";
import Pagination from "react-js-pagination";
import FiltrationAuction from "../filtrationAuction/filtrationAuciton";

const Auctions = ({auctions, user, placeABet, sendAuctions, sendExtensionTime, setExtensionTime, getAuctions}) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        getAuctions(pageNumber)
    }

    return (
        <>
            <div className={'row no-gutters'}>
                <div className={`${user.role === ADMIN ? 'col-2' : ''}`}/>
                <div className={'col'}>
                    <div className={'row no-gutters m-2 justify-content-end'}>
                        <FiltrationAuction/>
                    </div>
                    <div className={`row no-gutters justify-content-around`}>
                        {auctions.results && auctions.results.length > 0
                            ? auctions.results && auctions.results.map(item => {
                            return <Auction sendAuctions={sendAuctions}
                                            setExtensionTime={setExtensionTime}
                                            placeABet={placeABet}
                                            user={user}
                                            sendExtensionTime={sendExtensionTime}
                                            key={item.auction && item.auction._id}
                                            allInfo={item}/>
                        }) : <h2 className={'mt-2'}>Auction list is empty...</h2>}
                    </div>
                </div>
            </div>
            <div className={'row justify-content-center'}>
                {auctions.results && auctions.results.length > 0 && <>
                    <div className={`${user.role === ADMIN ? 'col-2' : ''}`}/>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={20}
                        totalItemsCount={auctions.info && auctions.info.count}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)}
                    />
                </>
                }
            </div>
        </>
    )
}

export default Auctions
