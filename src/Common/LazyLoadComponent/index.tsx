import React, { useState, useEffect, createFactory } from 'react';
import LoadingLazy from './loading';

interface Props {
  conFigEndpoint: () => Promise<any>
  statusLazy: boolean
  props?: any
}

const LazyLoadComponent:React.FC<Props> = ({conFigEndpoint, statusLazy, ...props}) => {
  const [ComponentLazy, setComponentLazy] = useState<React.FC | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const LazyLoadFunction = async () => {
    conFigEndpoint().then(Component => {
      setLoading(false);
      setComponentLazy(() => Component.default);
    });
  }

  useEffect(() => {
    if(statusLazy) {
      LazyLoadFunction();
      setLoading(true);
    }
    else setComponentLazy(null);
  }, [statusLazy])

  return (
    <>
      {ComponentLazy ?
        <div>
          <ComponentLazy {...props}/>
        </div>
        :
        <div>
          {loading ? <LoadingLazy /> : null}
        </div>
      }
    </>
  )
}

export default LazyLoadComponent;
