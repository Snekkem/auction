import React from "react";
import Set from "./set";

const Sets = (props) => {
    return (
        props.sets ? props.sets.map(set => <div key={set._id} className={'row no-gutters justify-content-center'}>
            <Set allInfo={set}/>
        </div>)
            : <h3 className={'text-center'}>Sets empty...</h3>
    )
}


export default Sets
