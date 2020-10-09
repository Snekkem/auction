import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
    createLocation,
    deleteLocation,
    getAllLocations,
    setIsFetching,
    updateLocation
} from '../../../redux/dispatches/adminDispatch'
import AdminLocations from './AdminLocations'
import Preloader from "../../../common/preloader/preloader";

export const AdminLocationsContainer = ({setIsFetching, isFetching, locations, createLocation, getAllLocations, updateLocation, deleteLocation}) => {
    useEffect(() => {
        setIsFetching(true)
        getAllLocations()
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <AdminLocations locations={locations} getAllLocations={getAllLocations} updateLocation={updateLocation}
                            deleteLocation={deleteLocation}
                            createLocation={createLocation}/>
        </>

    )
}

const mapStateToProps = (state) => ({
    locations: state.adminReducer.locations,
    isFetching: state.adminReducer.isFetching
})

const mapDispatchToProps = {
    getAllLocations,
    updateLocation,
    deleteLocation,
    createLocation,
    setIsFetching,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLocationsContainer)
