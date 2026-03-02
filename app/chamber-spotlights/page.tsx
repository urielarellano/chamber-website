import React from 'react'

export default function Spotlights() {
  return (
    <div className="page">
      <h1>Chamber Spotlights</h1>
      <span className='text-red-600'>
        <a href="https://www.canva.com/design/DAG_6bGF0Mo/LR8RY2z8sxpuMiCJTYEEFw/watch"
          target="_blank"
          rel="noopener noreferrer"
          className='cursor-pointer hover:underline'>
          Redeemed Office</a>
        - Click to View Spotlight video
      </span>
      <span className='text-purple-600'>
        <a href="https://www.canva.com/design/DAHAITeBISQ/P5_9Z5V7WHNZwyjvmHOimA/watch?utm_content=DAHAITeBISQ&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hfce9ee1c3e"
          target="_blank"
          rel="noopener noreferrer"
          className='cursor-pointer hover:underline'>
          IVCC Connor Cofoid</a>
        - Click to View Spotlight video
      </span>
    </div>
  )
}
