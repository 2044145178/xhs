export function getRamNumber(){
    var result='';
    for(var i=0;i<16;i++){

        result+=Math.floor(Math.random()*16).toString(16);//获取0-15并通过toString转16进制
    }
    //默认字母小写，手动转大写
    return result.toUpperCase();//另toLowerCase()转小写
}
