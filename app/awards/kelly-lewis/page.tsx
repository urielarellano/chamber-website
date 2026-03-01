import React from 'react'
import award from '@/public/Kelly-Lewis-25.jpeg';
import Image from 'next/image';

export default function KellyLewisAward() {
  return (
    <div className="page">
      <h2>Kelly Lewise Memorial Award</h2>
      <p>The Kelly Lewis Memorial Award is named after Kelly Lewis who served on the Chamber Board of Directors from 2021-2025. The Kelly Lewis Memorial Award will be given to a board member or ambassador that has gone above and beyond their duty. Qualifications will be attending meetings and events and going the extra mile for the chamber. The final decision will be made by office staff.</p>
      <div className="line"></div>
      <h2>2025 Kelly Lewis Memorial Award Winner</h2>
      <Image src={award}
        alt='kelly lewis award photo'
        className='md:h-[80vh] h-[60vh] w-auto object-contain'
      />
      <div className="line"></div>
      <h2>Past Winners</h2>
      <p>2025 - Kelly lewis</p>
    </div>
  )
}
