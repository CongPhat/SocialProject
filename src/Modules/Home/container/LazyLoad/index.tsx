import React, {useState} from 'react';

interface Props {
  endpoint?: any
}

const LazyLoadContainer: React.FC<Props> = (props) => {
  console.log(props);

  const [Lazy, setLazy] = useState(123555);
  return (
    <section>
      Day la test lazyload
    </section>
  )
}

export default LazyLoadContainer;
