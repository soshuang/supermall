<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" @click.native="checkClick" :is-checked="isSelectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计：￥{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).reduce((preValue, item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item=> item.checked).reduce((preValue,item)=>{
          return preValue + item.count
        },0)
      },
      isSelectAll(){
        //判断购物车里是否为空
        if(this.$store.state.cartList.length === 0){
          return false
        }
        //首先通过filter选出有没有没选中的，如果有它的长度取反就是false,没有就是true
        //这种方法要遍历
        // return !(this.$store.state.cartList.filter(item=> !item.checked).length)
        return  !(this.$store.state.cartList.find(item=>!item.checked))
      }
    },
    methods:{
      checkClick(){
        console.log('----');
        if(this.isSelectAll){
          this.$store.state.cartList.forEach(item=>item.checked = false)
        } else{
          this.$store.state.cartList.forEach(item=>item.checked = true)
        }
        //下面的简化不行，因为一旦改变一个isSelectAll就被改变了
        // this.$store.state.cartList.forEach(item=>item.checked = !this.isSelectAll)
      },
      calcClick(){
        if(this.checkLength == 0){
          //要使用this.$toast,要在main.js导入它的index.js
          this.$toast.show('您没有选择商品，请选择商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position:relative;
    line-height: 40px;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;

  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left:30px;
  }
  .calculate{
    width: 100px;
    margin-left: auto;
    text-align: center;
    background-color: red;
  }
  .check{
    border-color: red;
    background-color: red;

  }
</style>
