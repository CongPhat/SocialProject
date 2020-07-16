import React, { useState, useEffect, useRef } from 'react';
import {useDispatch} from 'react-redux';
import {fetchMarket} from '@Store/Reducer/Market/Market.Action';
import ListMarket from '@Modules/Market/components/ListMarket';


interface Props {

}

const ViewListMarketContainer: React.FC<Props> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMarket());
    }, [])

    return (
        <div className={`view-list-container`}>
            <ListMarket />
        </div>
    )
}

export default ViewListMarketContainer
