import React, { useState, useEffect, useCallback } from 'react';
import {useSelector} from 'react-redux';
import styles from './style.module.scss';

interface Props {
    item: any;
    key: any;
    showItemModal: (item?: any) => void
}

interface RootState {
    market: any
}

const ItemsMarket: React.FC<Props> = ({item, showItemModal}) => {
    return (
        <div className={`itemsMarket col-md-2`}>
           <div className={styles.itemsMarketMain} onClick={useCallback(() => {showItemModal(item)}, [item])}>
                <div className={styles.itemsMarketImage}>
                    <img src={item.image} alt={item.name} style={{width: '100%'}}/>
                </div>
                <div className={styles.itemsMarketInfor}>
                    <div className={styles.price}>
                        {item.price}
                    </div>
                    <div className='name'>
                        {item.name}
                    </div>
                    <div className={styles.city}>
                        {item.city}
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ItemsMarket
