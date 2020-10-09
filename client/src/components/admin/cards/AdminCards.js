import React, {useState} from "react";
import css from "../../card/card.module.css";
import Modal from 'react-modal';
import './style.css'
import 'react-widgets/dist/css/react-widgets.css'
import CardReduxForm from "./CreateCardForm";
import SetReduxForm from "./CreateSetForm";
import AdminCard from "./AdminCard";
import {createAuction} from "../../../redux/auction-reducer";
import Pagination from "react-js-pagination";

const AdminCards = (props) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        props.getAllCards(pageNumber)
    }

    const handleDeleteEpisode = (id) => {
        props.deleteCard(id).then(() => props.getAllCards(currentPage)
            .then((activePage) => setCurrentPage(activePage)))
    }

    const onSelectCard = (e, cardId) => {
        if (createSet) {
            if (props.selectedCards.includes(cardId)) {
                props.setRemoveCard(cardId)
                e.currentTarget.classList.remove(css.cardNormal)
            } else {
                props.setSelectedCard(cardId)
                e.currentTarget.classList.add(css.cardNormal)
            }
        }
    }

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [createSet, setCreateSet] = useState(false)

    function openCreateCardModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const onCreateSet = () => {
        setCreateSet(!createSet)
        props.clearSelectedCard()
    }

    const onSubmitSet = values => {
        props.createSet(values.setName, props.selectedCards, values.bonus)
            .then(() => {
                props.clearSelectedCard()
                setCreateSet(false)
            })
    }

    const onSubmit = values => {
        const image = values.image[0]
        props.createCard(values.cardName, values.status, values.type, values.gender,
            image, values.locations, values.episodes)
            .then(() => setIsOpen(false))
    }
    return (
        <>
            <div className={`row no-gutters p-4`}>
                <div className={'col-2'}/>
                <div className={'col-10'}>
                    <div className={'row no-gutters justify-content-center'}>
                        {!createSet ?
                            <button type={"button"} onClick={onCreateSet}
                                    className={'btn btn-outline-primary mr-3'}>Create
                                Set</button>
                            :
                            <>
                                <SetReduxForm onSubmit={onSubmitSet}/>
                                <button type={"button"} onClick={onCreateSet}
                                        className={'btn btn-outline-danger mr-3'}>Cancel
                                </button>
                            </>}
                        <button type={"button"} disabled={createSet} onClick={openCreateCardModal}
                                className={'btn btn-outline-success'}>Create Card
                        </button>

                        <Modal
                            isOpen={modalIsOpen}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            className={css.cardModal}
                            contentLabel="Example Modal"
                        >
                            <div className={'row no-gutters justify-content-between'}>
                                <h2 ref={_subtitle => (subtitle = _subtitle)}>Add new Card</h2>
                                <button type={"button"} onClick={closeModal}
                                        className={'btn btn-outline-danger rounded-circle h-25'}>X
                                </button>
                            </div>
                            <CardReduxForm onSubmit={onSubmit} episodes={props.episodes.results}
                                           locations={props.locations.results}/>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className={'row'}>
                <div className={'col-2'}/>
                <div className={'col'}>
                    <div>
                        <div className={`row no-gutters justify-content-around`}>
                            {props.cards.results && props.cards.results.map(card =>
                                <AdminCard card={card}
                                           key={card._id}
                                           isCreateSet={createSet ?
                                               props.selectedCards &&
                                               props.selectedCards.includes(card._id) : false}
                                           updateCard={props.updateCard}
                                           episodes={props.episodes}
                                           locations={props.locations}
                                           selectedCards={onSelectCard}
                                           sendAuctions={props.sendAuctions}
                                           createAuction={props.createAuction}
                                           deleteCard={handleDeleteEpisode}
                                />
                            )}
                        </div>
                    </div>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={20}
                        totalItemsCount={props.cards.info ? props.cards.info.count : 0}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)}
                    />
                </div>
            </div>
        </>
    )
}

export default AdminCards
