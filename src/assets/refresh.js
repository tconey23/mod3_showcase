import React, { useState } from 'react'

const RefreshSVG= (props) => {
const [hover, setHover] = useState(false)

  return (
    <svg
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
    style={{
      marginLeft: '5px',
      scale: hover ? '1.20' : '1',
      cursor: hover ? 'pointer' : '',
      filter: 'drop-shadow(2px 2px 1px black)'  
    }}
    width={30}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1200 1200"
      {...props}
    >
      <path
        d="M1011.029 619.943L891.172 460.696c-5.8-7.708-17.34-7.8-23.263-.185L744.021 619.757c-7.485 9.62-.629 23.641 11.56 23.641h80.061c-20.747 124.01-128.771 218.84-258.581 218.84-144.598 0-262.238-117.64-262.238-262.238s117.64-262.238 262.238-262.238c79.052 0 153.118 35.159 203.206 96.465 14.995 18.362 42.039 21.065 60.382 6.084 18.352-14.995 21.074-42.03 6.084-60.381-66.456-81.341-164.747-127.991-269.671-127.991C385.141 251.939 229 408.08 229 600s156.141 348.061 348.061 348.061c177.215 0 323.817-133.163 345.259-304.663h77.006c12.082 0 18.968-13.802 11.703-23.455z"
        fill="#6412a5"
      />
    </svg>
  )
}

export default RefreshSVG
