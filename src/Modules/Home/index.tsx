import React, { useState, useEffect } from 'react';
import LazyLoadComponent from '@HOC/LazyLoadComponent';
const img: string = require('@assets/images/123.jpg').default;
// import LazyLoadComponent from 'lazyloadphat/lib/LazyLoadComponent';

interface Props {

}

const Home: React.FC<Props> = () => {
  const [visiblePost, setVisiblePost] = useState(false);
  const [Post, setPost] = useState<React.FC | null>(null);

  const handle = () => {
    setVisiblePost(true);
  }

  // console.log(LazyLoadComponent);


  return (
    <div className={``}>
      <div className={`row`}>
        <div className='col-md-3'></div>
        <div className='col-md-4'>
        </div>
        <div className='col-md-5'>
          <button onClick={handle}>Click</button>
        </div>
        <LazyLoadComponent
          conFigEndpoint={() => import('@Modules/Home/container/LazyLoad')}
          statusLazy={visiblePost}
          abc={123}
          handleTest={handle}
        />
      </div>
    </div>
  )
}

export default Home
