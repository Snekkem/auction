import React, {useEffect, useState} from "react";
import {getAllEpisodes, getAllLocations} from "../../redux/dispatches/adminDispatch";
import {connect} from 'react-redux'
import {Field} from "redux-form";
import {Input, renderDropdownList, renderMultiselect} from "../formsControls/formsControl";
import {getAuctions} from "../../redux/dispatches/auctionDispatch";
import Filtration from "../filtration/filtration";
import {PAGINATION_INITIAL_PAGE, PAGINATION_PER_PAGE} from "../../constants";

const FiltrationAuction = ({episodes, locations, getAuctions, getAllEpisodes, getAllLocations}) => {
    useEffect(() => {
        getAllEpisodes()
        getAllLocations()
    }, [])

    const [showFilter, setShowFilter] = useState(false)

    const handleOpenedFiltration = () => {
        setShowFilter(true)
    }
    const handleSubmitFiltration = (values) => {
        const formData = new FormData()

        values.cardName && formData.append('cardName', values.cardName)
        values.selectSum && formData.append('selectSum', values.selectSum)
        values.from && formData.append('from', values.from)
        values.to && formData.append('to', values.to)
        values.episodes && values.episodes.forEach((episode, index) => {
            formData.append(`episodes[${index}]`, episode.name)
        })
        values.locations && values.locations.forEach((location, index) => {
            formData.append(`locations[${index}]`, location.name)
        })

        getAuctions(PAGINATION_INITIAL_PAGE, PAGINATION_PER_PAGE, Object.fromEntries(formData)).then(() => {
            setShowFilter(false)
        })
    }

    const filtrationFields = (
        <>
            <Field component={Input} placeholder={"Card name"} name={'cardName'} className={'form-control mb-2'}/>
            <Field name={'selectSum'} component={renderDropdownList} data={['Descending', 'Ascending']}
                   className={'mb-2'} placeholder={'Type'}/>
            <div className={'row justify-content-between no-gutters mb-2'}>
                <div className={'col-5'}>
                    <Field component={Input} valueField={'0'} type={'number'} min={0} name={'from'}
                           placeholder={'Form'} defaultValue={['0']} className={'form-control'}/>
                </div>
                <div className={'col-5'}>
                    <Field component={Input} valueField={'0'} type={'number'} min={0} name={'to'}
                           placeholder={'To'} defaultValue={['0']} className={'form-control'}/>
                </div>
            </div>
            <Field
                name="episodes"
                component={renderMultiselect}
                placeholder={'Episodes'}
                defaultValue={[]}
                data={episodes.results}
                className={'mb-2'}/>
            <Field
                name="locations"
                component={renderMultiselect}
                placeholder={'Locations'}
                defaultValue={[]}
                data={locations.results}/>
        </>
    )

    return (
        <Filtration fields={filtrationFields} isHide={showFilter} onOpen={handleOpenedFiltration}
                    onSubmit={handleSubmitFiltration}/>
    )
}

const mapStateToProps = (state) => {
    return {
        episodes: state.adminReducer.episodes,
        locations: state.adminReducer.locations
    }
}

export default connect(mapStateToProps, {getAllEpisodes, getAllLocations, getAuctions})(FiltrationAuction)
