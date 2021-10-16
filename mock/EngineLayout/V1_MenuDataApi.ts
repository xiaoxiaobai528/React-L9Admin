import Mock from "mockjs";
const Random = Mock.Random
let flvData =[
    {id:10000,name:Random.cword(4),path:'/engine',pid:0},
    {id:10001,name:Random.cword(4),path:'/engine',pid:0},
    {id:10002,name:Random.cword(4),path:'/engine',pid:0},
    {id:10003,name:Random.cword(4),path:'/engine',pid:0},
    {id:10004,name:Random.cword(4),path:'/engine',pid:0},
    {id:10005,name:Random.cword(4),path:'/engine',pid:0},
    {id:10006,name:Random.cword(4),path:'/engine',pid:0},
    {id:10007,name:Random.cword(4),path:'/engine',pid:0},
    {id:10008,name:Random.cword(4),path:'/engine',pid:0},
    {id:10009,name:Random.cword(4),path:'/engine',pid:0},
    {id:10010,name:Random.cword(4),path:'/engine',pid:0},
    {id:10011,name:Random.cword(4),path:'/engine',pid:0},
    {id:10012,name:Random.cword(4),path:'/engine',pid:0},
    {id:10013,name:Random.cword(4),path:'/engine',pid:0},
]

let sedData =[
    {id:10014,name:Random.cword(4),path:'/engine',pid:10000}, {id:10028,name:Random.cword(4),path:'/engine',pid:10000}, {id:10042,name:Random.cword(4),path:'/engine',pid:10000},
    {id:10015,name:Random.cword(4),path:'/engine',pid:10001}, {id:10029,name:Random.cword(4),path:'/engine',pid:10001}, {id:10043,name:Random.cword(4),path:'/engine',pid:10001},
    {id:10016,name:Random.cword(4),path:'/engine',pid:10002}, {id:10030,name:Random.cword(4),path:'/engine',pid:10002}, {id:10044,name:Random.cword(4),path:'/engine',pid:10002},
    {id:10017,name:Random.cword(4),path:'/engine',pid:10003}, {id:10031,name:Random.cword(4),path:'/engine',pid:10003}, {id:10045,name:Random.cword(4),path:'/engine',pid:10003},
    {id:10018,name:Random.cword(4),path:'/engine',pid:10004}, {id:10032,name:Random.cword(4),path:'/engine',pid:10004}, {id:10046,name:Random.cword(4),path:'/engine',pid:10004},
    {id:10019,name:Random.cword(4),path:'/engine',pid:10005}, {id:10033,name:Random.cword(4),path:'/engine',pid:10005}, {id:10047,name:Random.cword(4),path:'/engine',pid:10005},
    {id:10020,name:Random.cword(4),path:'/engine',pid:10006}, {id:10034,name:Random.cword(4),path:'/engine',pid:10006}, {id:10048,name:Random.cword(4),path:'/engine',pid:10006},
    {id:10021,name:Random.cword(4),path:'/engine',pid:10007}, {id:10035,name:Random.cword(4),path:'/engine',pid:10007}, {id:10049,name:Random.cword(4),path:'/engine',pid:10007},
    {id:10022,name:Random.cword(4),path:'/engine',pid:10008}, {id:10036,name:Random.cword(4),path:'/engine',pid:10007}, {id:10050,name:Random.cword(4),path:'/engine',pid:10008},
    {id:10023,name:Random.cword(4),path:'/engine',pid:10009}, {id:10037,name:Random.cword(4),path:'/engine',pid:10007}, {id:10051,name:Random.cword(4),path:'/engine',pid:10009},
    {id:10024,name:Random.cword(4),path:'/engine',pid:10010}, {id:10038,name:Random.cword(4),path:'/engine',pid:10007}, {id:10052,name:Random.cword(4),path:'/engine',pid:10010},
    {id:10025,name:Random.cword(4),path:'/engine',pid:10011}, {id:10039,name:Random.cword(4),path:'/engine',pid:10007}, {id:10053,name:Random.cword(4),path:'/engine',pid:10011},
    {id:10026,name:Random.cword(4),path:'/engine',pid:10012}, {id:10040,name:Random.cword(4),path:'/engine',pid:10007}, {id:10054,name:Random.cword(4),path:'/engine',pid:10012},
    {id:10027,name:Random.cword(4),path:'/engine',pid:10013}, {id:10041,name:Random.cword(4),path:'/engine',pid:10007}, {id:10055,name:Random.cword(4),path:'/engine',pid:10013},
    
]




export default {
    //'get /api/engine/init/v1/auth/menu':{flvSed:10000,sedSed:2222,tlvSed:3333,flvList:flvData,sedList:[],tlvList:[],}
    'get /api/engine/init/v1/auth/menu':(req :any,resp :any) =>{

        let tlvData = []
        let num = 10055
        for(let i = 10014 ; i <= 10055;i ++){
            for(let k = 0 ; k < 11;k++){
                num = num +1 ;
                let obj =  {id:num,name:Random.cword(4),path:'/engine',pid:i,}
                tlvData.push(obj);
            }
        }
       let  {lv,flv,sed,tlv} = req.query

       if(lv === undefined || lv === 0){ //初始化
            lv = 1
            if(flvData.length > 0){
                sedData = sedData.filter(item => item.pid === flvData[0].id)
                if(sedData.length > 0){
                    tlvData = tlvData.filter(item => item.pid === sedData[0].id)
                    if(tlvData.length > 0){
                        resp.status(200).json({lvNum:lv,flvSed:flvData[0].id,sedSed:sedData[0].id,tlvSed:tlvData[0].id,flvList:flvData,sedList:sedData,tlvList:tlvData,})
                    }
                }
            }
       }else if(lv*1 === 1 ){
            let flvd_new = flvData.filter(item => item.id === flv*1);
            if(flvd_new.length > 0){
                sedData = sedData.filter(item => item.pid === flvd_new[0].id);
                if(sedData.length > 0){
                    tlvData = tlvData.filter(item => item.pid === sedData[0].id)
                    if(tlvData.length > 0){
                        resp.status(200).json({lvNum:lv,flvSed:flvd_new[0].id,sedSed:sedData[0].id,tlvSed:tlvData[0].id,sedList:sedData,tlvList:tlvData,})
                    }
                }
            }
            //resp.send({lv,flv})
       }


    }
}