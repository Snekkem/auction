import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
    createEpisode,
    deleteEpisode,
    getAllEpisodes,
    setIsFetching,
    updateEpisode
} from '../../../redux/dispatches/adminDispatch'
import AdminEpisodes from "./AdminEpisodes";
import {withRouter} from "react-router-dom";
import Preloader from "../../../common/preloader/preloader";

export const AdminEpisodesContainer = ({setIsFetching, isFetching, episodes, createEpisode, getAllEpisodes, updateEpisode, deleteEpisode}) => {
    useEffect(() => {
        setIsFetching(true)
        getAllEpisodes()
    }, [])

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <AdminEpisodes episodes={episodes}
                           getAllEpisodes={getAllEpisodes}
                           createEpisode={createEpisode}
                           updateEpisode={updateEpisode}
                           deleteEpisode={deleteEpisode}/>
        </>
    )
}

const mapStateToProps = (state) => ({
    episodes: state.adminReducer.episodes,
    isFetching: state.adminReducer.isFetching
})

const mapDispatchToProps = {
    getAllEpisodes,
    deleteEpisode,
    updateEpisode,
    createEpisode,
    setIsFetching
}

const episodesWithRouter = withRouter(AdminEpisodesContainer)

export default connect(mapStateToProps, mapDispatchToProps)(episodesWithRouter)