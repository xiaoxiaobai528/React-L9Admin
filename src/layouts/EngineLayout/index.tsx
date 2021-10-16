import React, { FC,useState,useEffect,ComponentProps } from 'react';
import { connect,router } from "dva";
import { Button, Space } from 'antd';
import { LeftOutlined,RightOutlined,UnorderedListOutlined,HomeTwoTone } from '@ant-design/icons';
import styles from './index.less';

interface IPropsState{
  children?:any;
  location?:any;
  computedMatch?:any;
  history?:any;
  match?:any;
  route?:any;
  staticContext?:any;
  state?:any;
  dispatch?:any;
}


const EngineLayout:React.FC = (props:IPropsState) =>{

  //console.log(props);
  const {dispatch} = props; 
  const {flvSed, sedSed,tlvSed,flvList,sedList,tlvList,flvNum,flvStartNum,flvEndNum} = props.state.engineLayout;

  const onChangeStateSelected1Handle = (lv:number,flv:number,sed:number,tlv:number,pathname:string) =>{

    if(lv === 1){
      dispatch({
        type:'engineLayout/updateSedListEffects',
        payload:{flv,sed,tlv,lv:1,pathname}
      })
    }

    if(lv === 2){
      dispatch({
        type:'engineLayout/updateTlvListEffects',
        payload:{flv,sed,tlv,lv:2,pathname}
      })
    }
    if(lv === 3){
      dispatch({
        type:'engineLayout/updateTlvSelectedEffects',
        payload:{flv,sed,tlv,lv:2,pathname}
      })
    }
    
  }





  useEffect(()=>{
    //根据url 初始化
    //初始化菜单数据
    (window as any).addEventListener('resize', handleResize) //监听窗口大小改变
    let h = document.documentElement.offsetHeight;
    let w = document.documentElement.offsetWidth;
    let num = Math.ceil((w-200-36-36-30-80)/117)-1
    const {query,pathname} = props.location;
    const {flv,sed,tlv,lv} =query;
    try{
      dispatch({
        type:'engineLayout/initModel',
        payload:{flv,sed,tlv,lv,pathname,flvNum:num,flvStartNum:0,flvEndNum:num}
      })
    }catch(e){

    }

  },[]);
  const handleResize = (e:any) => {
    //console.log("handleResize--->",flvNum,flvStartNum,flvEndNum)
    let h = document.documentElement.offsetHeight;
    let w = document.documentElement.offsetWidth;
    let num = Math.ceil((w-200-36-36-30-80)/117)-1
    if(flvStartNum === 0){
      dispatch({
        type:'engineLayout/upateFlvNumEffects',
        payload:{flvNum:num,flvStartNum:0,flvEndNum:num}
      })
      // setFlvNum(num);
      // setflvEndNum(num);
    }
  }
  const handleChangeMenuSize = (value:number) =>{
    if( value === 1 ){
      if(flvStartNum !== 0){
        let newstart = flvStartNum-flvNum;
        let newend = flvEndNum-flvNum;
        if(newstart < 0){
          // setflvStartNum(0)
          // setflvEndNum(flvNum);
          dispatch({
            type:'engineLayout/upateFlvNumEffects',
            payload:{flvNum:flvNum,flvStartNum:0,flvEndNum:flvNum}
          })
        }else{
          // setflvStartNum(newstart)
          // setflvEndNum(newend);
          dispatch({
            type:'engineLayout/upateFlvNumEffects',
            payload:{flvNum:flvNum,flvStartNum:newstart,flvEndNum:newend}
          })
        }
      }
    }else if( value === 2 ){
      if(flvEndNum !== flvList.length){
        let newstart = flvStartNum+flvNum;
        let newend = flvEndNum+flvNum;
        
        if(newend > flvList.length){
          // setflvStartNum(flvList.length-flvNum)
          // setflvEndNum(flvList.length)
          dispatch({
            type:'engineLayout/upateFlvNumEffects',
            payload:{flvNum:flvNum,flvStartNum:(flvList.length-flvNum),flvEndNum:(flvList.length)}
          })
        }else{
          dispatch({
            type:'engineLayout/upateFlvNumEffects',
            payload:{flvNum:flvNum,flvStartNum:(newstart),flvEndNum:(newend)}
          })
          // setflvStartNum(newstart)
          // setflvEndNum(newend)
        }
      }
    }
  }


  //console.log('layout->init',flvSed, sedSed,tlvSed,flvList,sedList,tlvList)

  return (
    <div className={styles.bodyDiv}>
      <div className={styles.headDiv} > 
        <Space>
          <div style={{width:'200px'}}>logo</div>
          <LeftOutlined style={{fontSize:'20px'}}  onClick={()=>{handleChangeMenuSize(1)}} disabled={flvStartNum === 0 ? true : false}/>
          {/* item.id=== flvSelected ? styles.headMainMenuActive : styles.headMainMenu  flvEndNum === flvMenuData.length ? true : false*/}
          {
            flvList.map((item:any,index:number) =>{
              if(flvStartNum <= index && flvEndNum > index){
                return (
                  <div key={item.id} onClick={(e:any)=>{onChangeStateSelected1Handle(1,item.id,sedSed,tlvSed,item.path)}}
                   className={item.id=== flvSed ? styles.headMainMenuActive : styles.headMainMenu }>
                     {item.name}
                </div>
                )
              }
            })
          }
           {/* <div onClick={(e:any)=>{onChangeStateSelected1Handle()}} className={styles.headMainMenu }>
                         菜单名称
                       </div> */}
          <RightOutlined style={{fontSize:'20px'}}  onClick={()=>{handleChangeMenuSize(2)}} disabled={true}  />
          <div style={{width:'30px',textAlign:'right'}}><HomeTwoTone style={{fontSize:'20px'}} /></div>
          <div style={{width:'80px',textAlign:'left'}}>|管理员</div>
        </Space>
        
      </div>
      <div className={styles.headDiv2} > 
        <Space size={'large'}>
          <div style={{width:'10px'}}></div>
            {/* <Button onClick={(e:any)=>{onChangeStateSelected1Handle(e,2,item2.id,item2.name,item2.path,item2.sxh)}} 
                         className={sedSelected === item2.id ? styles.BtnSedDivActive : styles.BtnSedDiv} 
                         key={item2.id} type={'primary'} 
                      >{item2.name}</Button> */}
            {
              sedList.map((item:any)=>(
                <Button key={item.id} onClick={(e:any)=>{onChangeStateSelected1Handle(2,flvSed,item.id,tlvSed,item.path)}} 
                  className={sedSed === item.id ? styles.BtnSedDivActive : styles.BtnSedDiv} 
                         type={'primary'} 
                      >{item.name}</Button>
              ))
            }
            

        </Space>
      </div>
      <div className={styles.contentDiv}>
        <div className={styles.contentLeft}>
        <div style={{height:'5px'}}>&nbsp;</div>
            <Space size={'small'} direction={'vertical'}>
              {
                tlvList.map((item:any)=>(
                  <div key={item.id}  onClick={(e:any)=>{onChangeStateSelected1Handle(3,flvSed,sedSed,item.id,item.path)}} 
                  className={tlvSed === item.id ? styles.TlvDivActive : styles.TlvDiv}
                      >&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</div>
                ))
              }
              
              {/* {
                tlvMenuData.map((item,index)=>(
                  <div key={item.id} onClick={(e:any)=>{onChangeStateSelected1Handle(e,3,item.id,item.name,item.path,item.sxh)}} className={tlvSelected === item.id ? styles.TlvDivActive : styles.TlvDiv} >&nbsp;&nbsp;&nbsp;&nbsp;{item.name}</div>
                ))
              } */}
            </Space>
        </div>
        <div className={styles.contentRight}>
          {props.children}
        </div>
        
      </div>
    </div>
  )
}

//字面意思就是，把models的state变成组件的props
const mapStateToProps = (state:any) => {
  //console.log(state)
  //const { flvMenuData,} = state.enginelayout // test就是models命名空间名字 
  return {
    state, // 在这return,上面才能获取到
  }
}


 
export default connect(mapStateToProps)(EngineLayout);  
//export default EngineLayout;
