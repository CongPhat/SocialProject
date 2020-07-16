import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ItemsMarket from '@Modules/Market/components/ItemsMarket';
import {fetchMarket, handleRemoveLoadData} from '@Store/Reducer/Market/Market.Action';

interface Props {
    
}

interface RootState {
    market: any
}

const ListMarket: React.FC<Props> = () => {
    const refListMarket = useRef();
    const listMarket = useSelector((state: RootState) => state.market);
    const dispatch = useDispatch();
    const {data, loading, removeLoadData} = listMarket;


    const scrollLoadMoreData = () => {
        const documentListCurrent: any = document.getElementById('list_current_market');
        // console.log((documentListCurrent.clientHeight + documentListCurrent.offsetTop) / (window.scrollY + window.innerHeight))
        const checkScroll: number = (documentListCurrent.clientHeight + documentListCurrent.offsetTop) / (window.scrollY + window.innerHeight);
        if (checkScroll < 1.3) {
            dispatch(fetchMarket());
        }
    }

    useEffect(() => {
        if(removeLoadData) {
            window.removeEventListener('scroll', scrollLoadMoreData);
        } 
        return () => {
            window.removeEventListener('scroll', scrollLoadMoreData);
        }
    }, [removeLoadData])

    useEffect(() => {
        window.addEventListener('scroll', scrollLoadMoreData);
    }, [])

    return (
        <div id='list_current_market' className={`list-market row`} ref={refListMarket}>
            {data.map((item: any, index: number) => <ItemsMarket item={item} key={index}/>)}
        </div>
    )
}

export default ListMarket
