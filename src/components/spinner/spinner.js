import React from 'react';

import './spinner.css';

const Spinner = () => {
  return (
    <div className="lds-css ng-scope">
      <div className="lds-double-ring">
        <div />
        <div />
      </div>
      <style type="text/css" />
    </div>
  );
};

export default Spinner;
