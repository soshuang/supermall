export default {
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      //payload新添加的商品
      // let oldProduct = null;
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item;
      //   }
      // }
      //1.查找之前数组中是否有该商品，上面的for循环也可以
      let oldProduct = context.state.cartList.find(item=> item.iid === payload.iid)
      //判断oldProduct是否有赋值
      if(oldProduct){//数量加1
        // oldProduct.count +=1
        context.commit('addCounter',oldProduct)
        resolve('当前的商品数量加1')
      }else {//添加新商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加了新商品')
      }
    })
  }
}
