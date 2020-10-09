import React, {useState} from 'react'
import FA from "react-fontawesome";
import EditLocations from './EditLocations'

function AdminLocation({location, index, updateLocation, deleteLocation}) {
    const [isEdit, setEdit] = useState(false)

    const handleEditClick = () => {
        setEdit(true)
    }

    const handleOnSubmit = (formData) => {
        setEdit(false)
        updateLocation(location._id, formData)
    }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            {
                isEdit ? (
                    <EditLocations initialValues={{
                        name: location.name,
                        type: location.type,
                        dimension: location.dimension
                    }} onSubmit={handleOnSubmit} location={location}/>
                ) : (
                    <>
                        <td>{location.name}</td>
                        <td>{location.type}</td>
                        <td>{location.dimension}</td>
                        <td>
                            <button style={{width: 38, height: 30}} onClick={handleEditClick}
                                    className={'btn mx-3 p-1 btn-warning'}>
                                <FA
                                    className="fas fa-edit"
                                    name="edit"
                                />
                            </button>
                            <button className={'btn btn-danger text-center'}
                                    onClick={() => deleteLocation(location._id)}>
                                <FA
                                    className="d-flex align-self-center fas fa-trash"
                                    name="delete"
                                />
                            </button>
                        </td>
                    </>
                )
            }
        </tr>
    )
}

export default AdminLocation
