export function debounce(func,delay){
  let timer = null
  return function(...args){
    if (timer) clearTimeout(timer)
    // console.log(this);
    timer = setTimeout(()=>{
      // func.apply(this,args)
      func.apply(args)
    },delay)
  }
}
