import React from "react";
import { useEffect, useState } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");

useEffect (() => {
let stream$ = new Subject();
let myObservable = interval(1000);
myObservable.pipe(takeUntil(stream$)).subscribe(
  () => {
    if(status ==='start'){
      setSec(val => val + 1000);
    }
  }
);
return () => {
  stream$.next();
  stream$.complete()
}
}, [status])

  const start = () => {
    setStatus("start");
  }
  const stop = () => {
    setStatus("stop");
    setSec(0);
  }
 
  const reset = () => {
    setSec(0);
  }
 
  const wait = () => {
    setStatus("wait");
  }
 
  return (
    <div>
       <div> {new Date(sec).toISOString().slice(11, 19)} </div> 
       <button onClick = {start}>Start</button>
       <button onClick = {stop}>Stop</button>
       <button onClick = {reset}>Reset</button>
       <button onClick = {wait}>Wait</button>

    </div>
  );
}

export default App;
