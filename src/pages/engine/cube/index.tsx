import React from 'react';
import { Button, Divider, Input, Space } from 'antd';
import styles from './index.less';
import { AlignRightOutlined, CaretDownOutlined, FileTextOutlined, FolderOpenOutlined, PlusSquareFilled } from '@ant-design/icons';
import L9Tree from "../componets/L9Tree";
import L9Dailog from '../componets/L9Dailog';

interface Props {
  
}

const Cube = (props: Props) => {

  console.log(props);


  const onClickTreeMoreHnalde = () =>{

  }

  return (
    <div className={styles.normal}>
      <div className={styles.cubeLeft}>
        <div style={{backgroundColor:'rgb(249,249,249)',fontSize:'20px',height:'40px',}}>&nbsp;&nbsp;&nbsp;应用 </div>
        <div style={{height:'4px'}}></div>
        <Space size={'small'}>
          <Button size={'small'}><PlusSquareFilled /></Button><Input.Search  size={'small'}/>
        </Space>
        <div style={{height:'4px'}}></div>
        <div className={styles.treeDiv}>
          <L9Tree />
        </div>
        
        
      </div>
      <div className={styles.cubeContent}>
        <div style={{backgroundColor:'rgb(249,249,249)',fontSize:'20px',height:'40px',lineHeight:'40px',width:'100%'}}>
          &nbsp;&nbsp;&nbsp;<span>应用: 项目管理</span><div style={{float:'right',}}><Space><Button>快速向导</Button><AlignRightOutlined style={{marginRight:'10px',width:'20px',fontSize:'15px'}} /></Space></div> 
        </div>
        <L9Dailog />
          
        </div>
    </div>
  )
}

export default Cube;
