import React from 'react';
import { Progress } from 'antd';
import './Progress.scss';

const ProgressBar = ({ percent, classname }) => {
  return (
    <div>
      <Progress
        type='circle'
        percent={percent}
        strokeColor={'#0A315A'}
        trailColor={'rgba(10, 49, 90, 0.4)'}
        strokeWidth={12}
        className={classname}
      />
    </div>
  );
};

export default ProgressBar;
