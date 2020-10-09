import React, {useState} from "react";
import AdminSet from "./AdminSet";
import Pagination from "react-js-pagination";

const AdminSets = (props) => {
    const [currentPage, setCurrentPage] = useState(1)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        props.getAllSets(pageNumber)
    }

    return (
        <>
            {props.sets.results && props.sets.results.map(set => <div
                className={'row no-gutters justify-content-center'} key={set._id}>
                <AdminSet setInfo={set}/>
            </div>)}
            <div className={'row no-gutters'}>
                <div className={'col-2'}/>
                <div className={'mx-auto'}>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={20}
                        totalItemsCount={props.sets.info ? props.sets.info.count : 0}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)}
                    />
                </div>
            </div>
        </>
    )
}


export default AdminSets
