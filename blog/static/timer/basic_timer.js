var button_count = 0;

var min_dis = document.getElementById("min_display");
var sec_dis = document.getElementById("sec_display");
var start_stop_btn = document.getElementById("start_stop_button");
var reset_btn = document.getElementById("reset_button");

// start_stop_buttonの関数
start_stop_btn.onclick = () => {
  let base = performance.now();

  min_int = integer(min_dis);
  sec_int = integer(sec_dis);

  if (min_int === 0 && sec_int === 0) {
    console.log('input integer.');
    return;
  } else {
    button_count ++;
  }

  if (button_count % 2 === 1) {
    console.log('button_count = Odd:', button_count);

    start_stop_btn.textContent = "stop";
    reset_btn.disabled = true;

    let count = min_int * 60 + sec_int;

    if (button_count === 1) {
      min_dis.disabled = true;
      sec_dis.disabled = true;
    }

    timer(count, base);

  } else {
    console.log('button_count = Even:', button_count)

    start_stop_btn.disabled = true;
    reset_btn.disabled = true;
  }
};

// reset_buttonの関数
reset_btn.onclick = () => {
  console.log('reset');
  min_sec_display(0);
  display_abled();
};


// inputされた要素を整数化する関数
let integer = (time_element) => {
  if (time_element.value === '') {
    return 0;
  } else {
    return parseInt(time_element.value);
  }
};

// timer関数
let timer = async (count_time, base_time)=> {
  await countdown(count_time, base_time);

  start_stop_btn.textContent = 'start';
  start_stop_btn.removeAttribute('disabled');
  reset_btn.removeAttribute('disabled');

  end_time = performance.now();
  console.log('total_time:', end_time - base_time);
};

// countdown関数
let countdown = async (count_time, base_time) => {
  for (var i = count_time; i >= 0; i--) {
    if (button_count % 2 === 0) {
      console.log('stop');
      return ;
    } else if (i > 0) {

      if (i !== count_time){
        min_sec_display(i)
      }

      console.log('i > 0:', i);
      now_time = performance.now();
      let sleep_time = (1000 - (now_time - base_time) % 1000) || 1000;
      console.log(sleep_time);　// 確認用。

      // sleep_timeのエラー対策
      if (sleep_time < 1) {
        console.log("error. sleep_time sets '1000'.");
        sleep_time = 1000;
      }

      console.log(base_time); //  確認用。Chromeの他のタブを見ると、base_timeが変わってしまった。
      await sleep(sleep_time);

    } else {
      min_sec_display(i)
      console.log('i = 0:', i);
      display_abled();
    }
  }
};

// sleep関数(一定時間処理を止める関数)
let sleep = time => new Promise(resolve => setTimeout(resolve, time));

// 秒のみから、分・秒表示に戻す関数
let min_sec_display = (time) => {
  min_dis.value = (time/60|0);
  sec_dis.value = (time%60);
};

// displayへの入力を可能にする関数
const display_abled = () =>{
  button_count = 0;
  min_dis.removeAttribute('disabled');
  sec_dis.removeAttribute('disabled');
};



