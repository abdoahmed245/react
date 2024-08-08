import React from "react"

function Tr({pr}) {

  function nsp(param) {
    let r = param * 100 / 410;
    return r.toFixed(1);
  }
  return (
    <tr>
        <td className='border border-[1px] border-gray-300'>{pr[0]}</td>
        <td className='border border-[1px] border-gray-300'>{pr[1]}</td>
        <td className='border border-[1px] border-gray-300'>{pr[2]}</td>
        <td className='border border-[1px] border-gray-300'>{nsp(pr[2])}%</td>
        
    </tr>
  )
}

export default Tr
