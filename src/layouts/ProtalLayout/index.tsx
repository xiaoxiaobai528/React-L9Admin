import React from 'react';
import styles from './index.less';

const BasicLayout: React.FC = props => {
  return (
    <div className={styles.bodyDiv}>
      <div className={styles.headDiv} > 
      {/* logo */}
      </div>
      <div className={styles.headDivMenu} > 
      {/* 菜单 */}
      </div>
      <div className={styles.contentDiv}> 
      {/* 内容 */}
        {props.children}
      </div>
    </div>
  );
};

export default BasicLayout;
