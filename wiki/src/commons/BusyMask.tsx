import * as React from 'react';
import '../styles/App.scss';
import '../styles/Loading.scss';

const BusyMask = (props: any) => {
  return (
    <div id="busy-mask">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default BusyMask;