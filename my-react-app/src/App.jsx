import { useState,useEffect,useRef } from 'react'
import './App.css'
import json from './paragraphs.json'
function App() {
const [paraDispaly,setParaDisplay]=useState(json.paragraphs[0]);
const [inputValue,setInputValue]=useState("");
const [CorrectTypedChars,setCorrectTypedChars]=useState(0);
const [allAccuries,setAllAccuries]=useState([]);
const [higestAccuracy,setHigestAccuracy]=useState(0);
const [speed,setSpeed]=useState(0);
const [totaltime,setTotalTime]=useState(0);
const [allSpeeds,setAllSpeeds]=useState([]);
const [higestSpeed,setHigestSpeed]=useState(0);
const [starttime,setStartTime]=useState(0);
const [endTime,setEndTime]=useState(0);
const [takeValue,setTakevalue]=useState(false);
const [showDiv,setShowDiv]=useState(false);

useEffect(()=>{
handleParaChange()
const getHigestAccuracy=localStorage.getItem("high Accuracy")
setHigestAccuracy(getHigestAccuracy)
const gethigestTypingSpeed=localStorage.getItem("HigestTypingSpeed")
setHigestSpeed(gethigestTypingSpeed)

},[])
useEffect(()=>{
  if(inputValue.length==1 && takeValue===false ){
  setTakevalue(true);
  let TypingStartTime=Date.now();
  setStartTime(TypingStartTime);
  console.log(TypingStartTime)

  }},[inputValue])

useEffect(()=>{
if(inputValue.length==paraDispaly.length && inputValue.length!=0 ){
  let newAccuracy=Math.round((CorrectTypedChars/inputValue.length)*100);
  let updated =[...allAccuries,newAccuracy]
  setAllAccuries(updated)
  let StoreHigestAccuracy=Math.max(...updated);
  setHigestAccuracy(StoreHigestAccuracy);
  localStorage.setItem("high Accuracy",StoreHigestAccuracy);

  if(takeValue==true){
  let TypingEndTime=Date.now()
  setEndTime(TypingEndTime);


  const TotalTypingTime=TypingEndTime-starttime;
  setTotalTime((TotalTypingTime/(1000*60)).toFixed(2));
  console.log((TotalTypingTime/(1000*60)).toFixed(2));
  console.log(TypingEndTime)
  setTakevalue(false);

  const currentTypingSpeed=(inputValue.length /(5*(TotalTypingTime/(1000*60)).toFixed(2))).toFixed(2);
  setSpeed(currentTypingSpeed)

  const AllTypingSpeeds=[...allSpeeds,currentTypingSpeed]
  setAllSpeeds(AllTypingSpeeds)

  const HigestTYpingSpeed=Math.max(...AllTypingSpeeds)
  setHigestSpeed(HigestTYpingSpeed)
  console.log(HigestTYpingSpeed)
  localStorage.setItem("HigestTypingSpeed",HigestTYpingSpeed)
  }


setTimeout(()=>{
  handleParaChange()},0)
}},[inputValue])




function handleInputChange(e){
setInputValue(e.target.value)
let correct=0;
for(let i=0;i<e.target.value.length;i++){
  if(e.target.value[i]==paraDispaly[i]){
    correct++;
  }

}
setCorrectTypedChars(correct)
}

function handleParaChange(){
  let random=Math.floor(Math.random()*json.paragraphs.length);
  setParaDisplay(json.paragraphs[random])
  setInputValue("")
  setStartTime(0);
}

function handleClick(){
setShowDiv(prev=>!prev);
}
const inputRef=useRef(null);
useEffect(()=>{
  inputRef.current.focus();
},[paraDispaly])

  return (
    <>
    <div className="container">
      <span onClick={handleClick} className="achievement"><i class="fa-solid fa-trophy"></i></span>

      <div className="achievementContainer" style={{display:showDiv?"block":"none"}}>
        <p>Higest Speed: {higestSpeed} WPM</p>
        <p>Higest accuracy:{higestAccuracy}%</p>
      </div>

      <h1 >{paraDispaly.split("").map((element,index)=>{
        let TextDecor="none";
        let color="grey";
        if(index<inputValue.length){
          if(element===inputValue[index]){
            color="green";
          }
          else{
            color="red";
          }
        }
        if(index==inputValue.length){
          TextDecor="underline";
        }


        return(<span style={{color:color,textDecoration:TextDecor}} key={index}>{element}</span>)})}

        </h1>
      <div className="else">
      <input type="text" onChange={handleInputChange} value={inputValue} className='Input'placeholder='enter' ref={inputRef}/>
      <button onClick={handleParaChange}>Next</button>
      <div className="shownowAchieve">
      <p >Accuracy: {inputValue.length==0?"0":Math.round((CorrectTypedChars/inputValue.length)*100)}%</p>
      <p>Speed: {speed} WPM</p>
      </div>
      </div>

    </div>
    </>
  )
}

export default App
