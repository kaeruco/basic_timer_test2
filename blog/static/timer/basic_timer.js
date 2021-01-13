const myWorker = new Worker('timer/basic_timer_func.js');

myWorker.postMessage('Hello');

myWorker.addEventListener('message', (e)=>{
  const param = e.data;
})

