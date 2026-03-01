import React from 'react'
import award from '@/public/SCR-25-Photo.jpeg';
import Image from 'next/image';

export default function SweetCornVolunteerAward() {
  return (
    <div className="page">
      <h2>Sweet Corn Festival Volunteer of the Year</h2>
      <p>Each year the Chamber Past President chooses a Sweet Corn Festival Volunteer of the Year recipient.  This person donates their time all weekend and has gone above and beyond to help make the Sweet Corn Festival a success.</p>
      <div className="line"></div>
      <h2>2025 Sweet Corn Festival Volunteer of the Year</h2>
      <Image src={award}
        alt='sweet corn volunteer award'
        className='md:h-[80vh] h-[60vh] w-auto object-contain'
      />
      <p>Holly Christman</p>
      <div className="line"></div>
      <h2>Past Winners</h2>
      <p>2003 - Allen Bonnell</p>
      <p>2004 - Al Archer</p>
      <p>2005 - Jeff Simonton</p>
      <p>2006 - Mike Schuler</p>
      <p>2007 - Bill Kobilsek</p>
      <p>2008 - Larry Peach</p>
      <p>2009 - Dan Kobilsek</p>
      <p>2010 - Todd O'Sadnick</p>
      <p>2011- Tim Phalen</p>
      <p>2012 - Skip Stachlewitz</p>
      <p>2013 - Todd Phalen</p>
      <p>2014 - Mari Biers</p>
      <p>2015 - Brian Barnickel</p>
      <p>2016 - Eric Gleim</p>
      <p>2017 - Randy Fox</p>
      <p>2018 - Frank Kobilsek</p>
      <p>2019 - Tony Troyer</p>
      <p>2020 - N/A</p>
      <p>2021 - Brian Basil</p>
      <p>2022 - Ben Zendeli</p>
      <p>2023 - Mark and Juli Wixom</p>
      <p>2024 - Taylor Olsen</p>
      <p>2025- Holly Christman</p>
    </div>
  )
}
