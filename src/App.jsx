import { use, useState } from 'react'
import './App.css'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { isValidElement } from 'react';

const alphabets = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";

const Randomqr = ({ ClickInput }) =>{
  const [rdlen, setRdLen] = useState("100");
  //const [rdstring, setRdString] = useState("");

  const handleClick = () => {
    let rdstringtmp = "";
    for (let i = 0; i<rdlen;i++){
      rdstringtmp +=  alphabets[Math.floor(Math.random() * alphabets.length)];
    }
    //setRdString(rdstringtmp);
    ClickInput(rdstringtmp);
    
  }

  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val === ""){
      setRdLen("");
      return;
    }
    val = val.replace(/^0/,"")
    if(Number(val) > e.target.max){
      val = e.target.max;
    }
    setRdLen(val);
  }

  const handleBlur = (e) => {
    let val = e.target.value;
    val = val.replace(/^0/,"");
    if(val < e.target.min){
      val = e.target.min;
    }
  }

  return(  
    <>
      <div>
        <label>ランダム</label>
        <input
        type="text"
        min="1"
        max="4296"
        value={rdlen}
        placeholder='長さ 1~4296までの整数'
        inputMode='numeric'
        onChange={handleChange}
        onBlur={handleBlur}
        />
        <button onClick={handleClick}>生成</button>
      </div>
    </>
  )
}

const Inputqr = ({ClickInput}) => {
  const [text, setText] =useState("");


  return(
    <>
     <div className="card">
        <label>自分で入力</label>
         <input
           value={text}
           type="text"
           placeholder='文字列を入力'
            onChange={(e) => setText(e.target.value)}
          />
        
          <button onClick={() => ClickInput(text)}>
           生成
          </button>
        </div>

</>

  )
}

const complementlevel = [
  {value: 'L',option: 'L(低 ~7%)' },
  {value: 'M',option: 'M(中 ~15%)' },
  {value: 'Q',option: 'Q(高 ~25%)' },
  {value: 'H',option: 'H(最高 ~30%)' }
];

const QrcodeProps = ( {qrsize,setQrSize,hokan,setHokan} ) => {
  const [inputtext, setInputeText] = useState("200");
  const [complement, setComplement] = useState(complementlevel[0].value)
  
  const handleChangeInput=(e)=>{
    let val = e.target.value.replace(/\D/g,"");
    if(val === ""){
      setInputeText(val);
      return;
    }
    val = val.replace(/^0/,"")
    if(Number(val) > e.target.max){
      val = e.target.max;
    }
    setInputeText(val);
  }
  const handleBlur = (e) =>{
    let val = e.target.value;
    if(Number(val) < e.target.min) val = e.target.min;
    setInputeText(val);
    setQrSize(Number(val));
  }
  const handleChangeSelect=(e)=>{
    setComplement(e.target.value);
    setHokan(e.target.value);

  }

  return (
    <>
      <label >誤り訂正レベル</label>
      <select 
        value={complement}
        onChange={handleChangeSelect}
        >
        {complementlevel.map((level) => {
         return<option key={level.value} value={level.value}>{level.option}</option>;
        })}
      </select>



        <label className='space-x-31'>サイズ</label>
      
        <input
        className='sizeinput'
        type="text"
        inputMode='numeric'
        min={200}
        max={1000}
        value={inputtext}
        onChange={handleChangeInput}
        onBlur={handleBlur}
      ></input>
      
    </>
  )
}

function App() {
  
  const [codesize,setCodeSize] = useState("200");
  const [hokanlev,setHokanLev] = useState("L");
  const [addtext, setAddText] = useState("");

  const handleClickInput = ( gentext ) =>{
    setAddText(gentext);
  }




  return (
    <>
      <h1>QRコード生成(電波人間向け)</h1>
      <QrcodeProps 
        qrsize={codesize}
        setQrSize={setCodeSize}
        hokan={hokanlev}
        setHokan={setHokanLev}/>
      
      <Inputqr ClickInput={handleClickInput} />
      <Randomqr ClickInput={handleClickInput} />
      

      <div className='myqr's>
        <p>QRコード</p>
        <QRCodeCanvas
          className='block mx-auto'
          value={addtext}
          title={"ffff"}
          size={codesize}
          level={hokanlev}
          
        />
        <p>文字列</p>
        <p>{addtext}</p>
      </div>
      <p>上に表示されている文字列をコピーしてどこかに貼り付けて保存することで同じQRを表示できます</p>
      <p>ただし誤り訂正度は同じにして下さい</p>
      <p className='version'>v1.0.0</p>
    </>
    
  )
}

export default App
