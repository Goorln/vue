//负责操作localStorage的帮助文件
/*
* 获取数据 var Str = localStorage.getItem(key)
*添加和追加数据 localStorage.setItem(key,value)
* 移除数据 localStorage.removeItem(key)
* */

//定义常量key，将来操作localStorage中的数据都已这个作为标准
export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};
//实现数据增加
//value格式：(goodsid:87,count:10)
export function setItem(value) {
    //获取json格式
    var jsonString =  localStorage.getItem(KEY);
    //将其转换为js对象
    jsonString = jsonString || '[]';
    var arr = JSON.parse(jsonString);
    //将value追加进arr
    arr.push(value);
    localStorage.setItem(KEY,JSON.stringify(arr));
}
//获取数据
export function getItem() {
   var jsonString =  localStorage.getItem(KEY);
    //将其转换为js对象
    jsonString = jsonString || '[]';
    return JSON.parse(jsonString);
}


//将localStorage中的数据全部整合成一个对象的形式
export function getgoodsObject(){
    //获取数组
    var arr = getItem();
    //将URL数组中的goodsID相统的多个对象合并成同一个对象
    var resObj = {};
    for(var i=0;i<arr.length;i++){
        var item = arr[i];
        if(!resObj[item.goodsid]){
            //如果没有当天商品的数据，
            resObj[item.goodsid] = item.count;
        }else{
            //已经有当前商品的数据了
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count+item.count;
        }
    }
    return resObj;
}
//obj的格式 {}
export function updateData(obj){
    var arr = getItem();

    var count = 1;
    if(obj.type == 'add'){
        //加
        arr.push({goodsid:obj.goodsid,count:count});
    }else{
        //减
        for(var i=0;i<arr.length;i++){
            //count的值等于1就删除这个对象,否则讲这个对象的count减1以后保存回去
            if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1){
                    arr[i].count = arr[i].count-1;
                    break;
                }else{
                    //删除此对象
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }
    //将最新的
    localStorage.setItem(KEY,JSON.stringify(arr));
}

//移除数据
export function removeItem(goodsid){
    var arr = getItem();
    //查找arr中的goodsID和传入的参数一直的数据
    for(var i=arr.length-1;i>=0;i--){
        if(arr[i].goodsid == goodsid){
            arr.splice(i,1);
        }
    }
    //将最新的
    localStorage.setItem(KEY,JSON.stringify(arr));
}