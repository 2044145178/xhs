let obj = {
    makeSign(data){
        let params = Object.keys(data).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        }).join('&')

        return params.replace(/%2C/g,',')
    }
}

export default obj;

// 带小数点的不可以使用
