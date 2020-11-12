"use strict";

{
  //DOMの取得//
  const timer = document.getElementById("timer")
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");

  let startTime;//開始時間を格納する空の変数
  let timeoutId;//clearTimeoutの引数に格納する変数
  let elapsedTime = 0;//timerが走っていた時間を格納する変数（累積時間を再開できる様に）


  //timerのカウントアップ関数を用意
  function countUp(){
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, "0");//padStart()はString型にのみ対応
    const s = String(d.getSeconds()).padStart(2, "0");
    const ms = String(d.getMilliseconds()).padStart(3, "0");
    timer.textContent = `${m}:${s}.${ms}`;//timerに表示する時間

    //カウントアップ関数を10msごとに実行する
    timeoutId = setTimeout(()=> {
      countUp();
    } ,10 );
  }

  //ボタンの状態を管理する関数を用意(cssの付与と取り外しを実行)
  function setButtonStateInitial(){
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.add("inactive");
  };
  
  function setButtonStateRunning(){
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
  }

  function setButtonStateStopped(){
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
  };


  setButtonStateInitial();

  start.addEventListener("click" , () => {
    if(start.classList.contains("inactive") === true ){
      return;//ボタンのクラスにinactiveがついていたら(trueの場合)、処理を実行しない
    }
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  
  stop.addEventListener("click" , () => {
    if(stop.classList.contains("inactive") === true){
      return;//ボタンのクラスにinactiveがついていたら(trueの場合)、処理を実行しない
    }
    setButtonStateStopped();
    clearTimeout(timeoutId);//setTimeout( , );を終了させる
    // elapsedTime = Date.now() - startTime;//スタートの時間からの経過時間を代入
    elapsedTime += Date.now() - startTime;//次に再開した時に、過去の経過時間も保持するために+=で記載する
  });

  reset.addEventListener("click" , () => {
    if(reset.classList.contains("inactive") === true){
      return;//ボタンのクラスにinactiveがついていたら(trueの場合)、処理を実行しない
    }
  setButtonStateInitial();
  timer.textContent ="00:00.000";
  elapsedTime = 0;
  });
}