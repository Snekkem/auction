import React, {useState} from 'react'
import AdminLocation from './AdminLocation'
import Modal from "react-modal";
import CreateLocationReduxForm from "./CreateLocation";
import Pagination from "react-js-pagination";
import css from './locations.module.css'

function AdminLocations({locations, getAllLocations, createLocation, updateLocation, deleteLocation}) {
    const [currentPage, setCurrentPage] = useState(1)

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const submit = values => {
        createLocation(values.locationName, values.type, values.dimension)
            .then(() => getAllLocations(currentPage))
            .then(() => setIsOpen(false))
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        getAllLocations(pageNumber)
    }

    const handleDeleteLocation = (id) => {
        deleteLocation(id).then(() => getAllLocations(currentPage)
            .then((activePage) => setCurrentPage(activePage)))
    }

    return (
        <div className={'row no-gutters'}>
            <div className={'col-2'}/>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className={css.Modal}
                contentLabel="Example Modal"
            >
                <div className={'row no-gutters justify-content-between'}>
                    <h4 ref={_subtitle => (subtitle = _subtitle)}>Add new Location</h4>
                    <button type={"button"} onClick={closeModal}
                            className={'btn btn-outline-danger rounded-circle h-25'}>X
                    </button>
                </div>
                <CreateLocationReduxForm onSubmit={submit}/>
            </Modal>
            <div className={'col-10'}>
                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Dimension</th>
                        <th scope="col">
                            <button type={'button'} onClick={openModal} className={'btn btn-success'}>Create</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {locations.results && locations.results.map((location, index) => (
                        <AdminLocation key={`${location._id}${index}`} updateLocation={updateLocation}
                                       deleteLocation={handleDeleteLocation} location={location} index={index}/>
                    ))}
                    </tbody>
                </table>
                <div className={'row justify-content-center'}>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={20}
                        totalItemsCount={locations.info && locations.info.count}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminLocations
