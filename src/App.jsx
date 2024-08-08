import { useState } from 'react'
import './App.css'
import Tr from './component/tr';
function App() {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const [err,setErr] = useState("");
  const [errsolv,setErrsolv] = useState("");
  const [status,setStatus] = useState(false);
  const [stat,setStat] = useState("name");
  let reg = /^[\u0621-\u064A]+\s[\u0621-\u064A]+\s[\u0621-\u064A]+/i
  function click(event) {
    event.preventDefault();
    setErr("");
    setErrsolv("")
    setData([]);
    if (val != "") {
      if (stat == "name") {
        if (reg.test(val)) {
          const targetUrl = encodeURIComponent(`http://abdoahmed7xx-001-site1.ktempurl.com/output_dir/a.php?name=${val}`);
          const proxyUrl = `https://api.allorigins.win/get?url=${targetUrl}`;
          setStatus(true)
          fetch(proxyUrl)
          .then(response => response.json())
          .then(data => {
              const jsonData = JSON.parse(data.contents);
              setStatus(false);
              if (jsonData.length > 0) {
                setData(jsonData);
              } else {
                setErr("لم يتم العثور علي الاسم")
                setErrsolv("اذا كنت متاكد جرب تغير الحروف مثل : ي الي ى او ة الي ه والعكس")
              }
          })
          .catch(error => {
            setStatus('false')
            if (error.message === 'Failed to fetch') {
               setErr("هناك مشكلة في الاتصال بالإنترنت أو الرابط عليه ضغط. حاول مرة أخرى لاحقاً.");
            } else {
                setErr("حدث خطأ غير متوقع: " + error.message)
            }
        });
        } else {
          setErr("يجب ان يكون اسمك الثلاثي مثل : محمد احمد محمد")
        }
      } else {
          const targetUrl = encodeURIComponent(`http://abdoahmed7xx-001-site1.ktempurl.com/output_dir/a%20(5).php?name=${val}`);
          const proxyUrl = `https://api.allorigins.win/get?url=${targetUrl}`;
          setStatus(true)
          fetch(proxyUrl)
          .then(response => response.json())
          .then(data => {
              const jsonData = JSON.parse(data.contents);
              setStatus(false);
              if (jsonData.length > 0) {
                setData(jsonData);
              } else {
                setErr("لم يتم العثور علي رقم الجلوس")
              }
          })
          .catch(error => {
            setStatus('false')
            if (error.message === 'Failed to fetch') {
              setErr("هناك مشكلة في الاتصال بالإنترنت أو الرابط عليه ضغط. حاول مرة أخرى لاحقاً.");
            } else {
                setErr("حدث خطأ غير متوقع: " + error.message)
            }
        });
      }
    } else {
      setErr(`الرجاء كتابة ${stat == "name" ? "اسمك" : "رقم الجلوس"}`)
    }
  }
  function valhandl(event) {
    setVal(event.target.value);
  }
  function inp(event) {
    setErr("");
    setErrsolv("")
    setData([]);
    setVal("")
    if (event.target.id == "name") {
      setStat("name")
    } else if (event.target.id == "glos") {
      setStat("glos")
    } 
    
  }

  return (
    <div className='text-center flex justify-center flex-col gap-4'>
      <h1 className='text-amber-900 text-[25px] font-extrabold animate-slidein300 opacity-0'>نتائج الطلاب</h1>
      <div><a href="https://instagram.com/abdo_elhashem" className='opacity-0 animate-slidein500 underline text-lg text-sky-800 w-fit'>instagram : @abdo_elhashem</a></div>
      <div className='flex gap-5 justify-center'>
        <div className='animate-slidein700 opacity-0'>
          <button className=' cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' id='glos' onClick={inp}>البحث برقم الجلوس</button>
        </div>
        <div className='animate-slidein700 opacity-0'>
          <button className=' cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded' id='name' onClick={inp}>البحث بالاسم</button>
        </div>
      </div>
      <form className='flex gap-2 justify-center animate-slidein700 opacity-0' onSubmit={click}>
      <input onInput={valhandl} className=" shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-blue-200 border-blue-500 focus:shadow-outline" id="username" type={`${stat == "name" ? "text" : "number"}`} />
        <input type="submit" value="ابحث" className=' cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded'/>
      </form>
      <h2 className='animate-slidein700 opacity-0 font-extrabold text-blue-500'>{stat == "name" ? "يجري البحث بواسطة الاسم" : "يجري البحث بواسطة رقم الجلوس"}</h2>
      <p>{err}</p>
      <div className={`justify-center ${status ? "flex" : "hidden"}`}><div className='loader'></div></div>
      <span>{errsolv}</span>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='border border-[2pxpx] border-gray-300'>الاسم</th>
            <th className='border border-[2pxpx] border-gray-300'>رقم الجلوس</th>
            <th className='border border-[2pxpx] border-gray-300'>المجموع</th>
            <th className='border border-[2pxpx] border-gray-300'>النسبه</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e,i) => (
            <Tr key={i} pr={[e['الاسم'],e['رقم الجلوس'],e['الدرجه']]}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
