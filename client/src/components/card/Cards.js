import React, {useState} from "react";
import Card from "./Card";
import Pagination from "react-js-pagination";

const Cards = ({cards, userCards, getAllCards}) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        getAllCards(pageNumber)
    }

    return (
        <>
            <div className={'row no-gutters justify-content-around'}>
                {cards.results && cards.results.map(card => <Card key={card._id} userCards={userCards} card={card}/>)}
            </div>
            <div className={'row justify-content-center'}>
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={20}
                    totalItemsCount={cards.info && cards.info.count}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange.bind(this)}
                />
            </div>
        </>
    )
}

export default Cards
