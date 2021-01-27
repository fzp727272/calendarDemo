import React from 'react';
import styles from './index.less';

const BasicLayout = props => {
  const showNav = props.location.pathname.includes('/login') ? false : true;

  const pathname = props.location.pathname;

  // const contentHeight = () => {
  //   const screenHeight = document.getElementById('root').offsetHeight;
  //   const contentHeight = screenHeight - 40 - 72;
  //   return contentHeight;
  // };

  return (
    <div >
          {props.children}
    </div>
  );
};

export default BasicLayout; //路由监听
