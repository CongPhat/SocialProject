import React, { useState, useEffect } from 'react';
import ViewListMarketContainer from './container/ViewListMarketContainer';

interface Props {

}

const Market: React.FC<Props> = () => {
  return (
    <section className={``}>
      <ViewListMarketContainer />
    </section>
  )
}

export default Market
