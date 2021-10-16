import React, { FC,useState,useEffect } from 'react';
import { Col, Row, Space,Button } from 'antd';
import { LeftOutlined,RightOutlined } from "@ant-design/icons";



import style from "./index.less";

interface IMenuDataType{
  id?:number|string,
  name?:string,
  path?:string,
}

const EngineLayout:React.FC = props =>{

  const [state1, setstate1] = useState([1,2,3,4,5,6,7,8,9,10,11]); //一级菜单
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [num, setNum] = useState(0);
  const [state2, setstate2] = useState([1,2,3,4,5,6]); //二级菜单
  const [state3, setstate3] = useState([1,2,3,4,5,6]); //三级菜单
  const [stateSelected1, setstateSelected1] = useState(0);        //一级选中
  const [stateSelected2, setstateSelected2] = useState(0);        //二级选中
  const [stateSelected3, setstateSelected3] = useState(0);        //三级选中
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  //初始化数据

  useEffect(()=>{
    
  },[]);




  //处理数据结束

  const handleChangeMenuSize = (value:number) =>{
    if( value === 1 ){
      if(start !== 0){
        setStart(0)
        setEnd(num)
      }
    }else if( value === 2 ){
      if(end !== state1.length){
        setStart(num)
        setEnd(state1.length)
      }
    }
  }

  const handleResize = (e:any) => {
    let w = e.target.innerWidth;
    let h = e.target.innerHeight;
    let m_w = w/24*18;
    let i = Math.floor((m_w -14-14) /(110+24))
    setEnd(i)
    setNum(i)
    setHeight((h-110-3)+'px')
    // console.log('浏览器窗口大小改变事件', e.target.innerWidth);
    setWidth(((w/24*3)-3)+'px');
  }
  useEffect(()=>{
    (window as any).addEventListener('resize', handleResize) //监听窗口大小改变
    //初始化
    let h = document.documentElement.clientHeight;
    let w = document.documentElement.clientWidth;
    let m_w = w/24*18;
    let i = Math.floor((m_w -14-14) /(110+24))
    setEnd(i)
    setNum(i)
    setHeight((h-110-3)+'px')
    setWidth(((w/24*3)-3)+'px');

  },[]);

  const onClickMainMenu = (e:any) =>{
    console.log(e);
  }

  const onChangeStateSelected1Handle = (type:number,value:number) =>{
    if(type === 1){
      setstateSelected1(value);
    }else if(type === 2){
      setstateSelected2(value);
    }else if(type === 3){
      setstateSelected3(value);
    }
    
  }

  return (
    <div className={style.header}>
      <Row  className={style.mainMenu}>
        <Col span={3} className={style.mainMenuCol}>logo</Col>
        <Col span={18}  className={style.mainMenuCol}>
          <Space size={'large'} >
            <LeftOutlined onClick={()=>{handleChangeMenuSize(1)}} disabled={start === 0 ? true : false} />
            {
              state1.map((item,index)=>{
                if(index < end && index >= start ){
                  return <div onClick={() =>{onChangeStateSelected1Handle(1,index)}} className={index === stateSelected1 ? style.mainMenuActive : style.mainMenuHover } key={index} style={{width:'110px',textAlign:"center"}}>菜单菜单{index}</div>
                }
              })
            }
            <RightOutlined onClick={()=>{handleChangeMenuSize(2)}} disabled={end === state1.length ? true : false}  />
          </Space>
        </Col>
        <Col span={3} className={style.mainMenuCol}>...|管理员</Col>
      </Row>
      <Row  className={style.mainMenu2} >
        <Col span={24}  className={style.mainMenuCol2}>
          <Space size={'large'} >
            <div style={{width:'10px'}}></div>
            {
              state2.map((item,index)=>(
                <Button type={'primary'} onClick={() =>{onChangeStateSelected1Handle(2,index)}} key={index} className={ index===stateSelected2 ? style.btnMenu2Active : style.btnMenu2} >二级菜单</Button>
              ))
            }
          </Space>
        </Col>
      </Row>
      <Row style={{height}}>
        <Col  span={3} className={style.mainMenu3}>
          <Space size={'small'} direction={'vertical'}>
            <div style={{height:'5px'}}></div>
            {
              state3.map((item,index)=>(
                <div style={{width}} onClick={() =>{onChangeStateSelected1Handle(3,index)}} key={index} 
                  className={ index===stateSelected3 ? style.btnMenu3Active : style.btnMenu3 }
                >&nbsp;&nbsp;&nbsp;&nbsp;三级菜单</div>
              ))
            }
          </Space>
        </Col>
        <Col  span={21}>
          {props.children}
        </Col>
      </Row>
      
    </div>
  )
}

export default EngineLayout;