import React, { useState, useEffect, createFactory } from 'react';

interface Props {
  conFigEndpoint?: () => void
  statusLazy?: any
  props?: object
}



const LazyLoadComponent:React.FC<Props> = ({conFigEndpoint, statusLazy, ...props}) => {
  const [ComponentLazy, setComponentLazy] = useState<React.FC | null>(null);

  const LazyLoadFunction = async () => {
    conFigEndpoint().then(Component => setComponentLazy(() => Component.default));
  }

  useEffect(() => {
    if(statusLazy) LazyLoadFunction();
  }, [statusLazy])

  return (
    <>
      {ComponentLazy ? <ComponentLazy {...props}/> : null}
    </>
  )
}

export default LazyLoadComponent;
