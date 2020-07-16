import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import styles from './style.module.scss';

interface Props {
    item: any;
    key: any;
}

interface RootState {
    market: any
}

const ItemsMarket: React.FC<Props> = ({item}) => {
    // console.log(item);
    
    return (
        <div className={`itemsMarket col-md-2`}>
           <div className='itemsMarketMain'>
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
