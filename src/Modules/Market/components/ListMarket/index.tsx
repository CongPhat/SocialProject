import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ItemsMarket from '@Modules/Market/components/ItemsMarket';
import {fetchMarket, handleRemoveLoadData, handleDetailItemMarket, hideDetailItemMarket} from '@Store/Reducer/Market/Market.Action';
import { Modal, Button } from 'antd';

interface Props {
    
}

interface RootState {
    market: any
}

const ListMarket: React.FC<Props> = () => {
    const refListMarket = useRef();
    const listMarket = useSelector((state: RootState) => state.market);
    const dispatch = useDispatch();
    const {data, loading, removeLoadData, detailItemMarket} = listMarket;
    
    const scrollLoadMoreData = () => {
        const documentListCurrent: any = document.getElementById('list_current_market');
        const checkScroll: number = (documentListCurrent.clientHeight + documentListCurrent.offsetTop) / (window.scrollY + window.innerHeight);
        if (checkScroll < 1.3) {
            dispatch(fetchMarket());
        }
    }

    const handleShowItemModal = (item: any) => {
       dispatch(handleDetailItemMarket(item));
    }

    const handleHideModal = () => {
        dispatch(hideDetailItemMarket());
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
            {data.map((item: any, index: number) => <ItemsMarket item={item} key={index} showItemModal={handleShowItemModal}/>)}
            <Modal
                title="Basic Modal"
                visible={detailItemMarket.showModal}
                onOk={handleHideModal}
                onCancel={handleHideModal}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default ListMarket
