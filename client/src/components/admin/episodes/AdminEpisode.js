import React, {useState} from 'react'
import FA from "react-fontawesome";
import EditEpisodes from './EditEpisodes'

function AdminEpisode({episode, index, updateEpisode, deleteEpisode}) {
    const [isEdit, setEdit] = useState(false)

    const handleEditClick = () => {
        setEdit(true)
    }

    const handleOnSubmit = (formData) => {
        setEdit(false)
        updateEpisode(episode._id, formData)
    }

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            {
                isEdit ? (
                    <EditEpisodes initialValues={{
                        name: episode.name,
                        episode: episode.episode,
                    }} onSubmit={handleOnSubmit} episode={episode}/>
                ) : (
                    <>
                        <td>{episode.name}</td>
                        <td>{episode.episode}</td>
                        <td>{new Date(episode.air_date).toLocaleString()}</td>
                        <td>
                            <button style={{width: 38, height: 30}} onClick={handleEditClick}
                                    className={'btn mx-3 p-1 btn-warning'}>
                                <FA
                                    className="fas fa-edit"
                                    name="edit"
                                /></button>
                            <button className={'btn btn-danger text-center'}
                                    onClick={() => deleteEpisode(episode._id)}>
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

export default AdminEpisode
