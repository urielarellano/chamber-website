import Image from 'next/image'
import React from 'react'
import award from '@/public/Beautification-25-photo.jpeg';

export default function BeautificationAward() {
  return (
    <div className="page">
      <h2>Beautification Award</h2>
      <p>Every year the Chamber honors the business or businesses that have improved the exterior of their business and improved the overall look of the community.</p>
      <div className="line"></div>
      <h2>2025 Beautification Award Winner</h2>
      <Image src={award}
        alt='sweet corn volunteer award'
        className='md:h-[80vh] h-[60vh] w-auto object-contain'
      />
      <p>The Coffee Barn</p>
      <div className="line"></div>
      <h2>Past Award Recipients</h2>
      <p>1999 - Prescott Brothers</p>
      <p>2000 - Small Business - Kurt Bruno State Farm Insurance</p>
      <p>2000 - Large Business - Black Bros. Company</p>
      <p>2000 - Large Business - First State Bank</p>
      <p>2001 - American Legion/City of Mendota</p>
      <p>2001 - Eureka Savings Bank</p>
      <p>2001 - Stonecroft Village</p>
      <p>2002 - Mendota Animal Clinic, First State Bank</p>
      <p>2003 - Mendota Mutual Insurance, MFC Building Supplies (Mendota Farmers Co-op)</p>
      <p>2004 - Mendota Strength & Fitness Center, West Side Family Dentistry</p>
      <p>2005 - B & M Motorsports</p>
      <p>2006 - Freight House Grill, Primo's Supper Club</p>
      <p>2007- Johnny Ray’s Sports Bar and Grill, First State Bank Plaza North</p>
      <p>2008 - Abigail Women's Clinic, O'Reilly Auto Parts</p>
      <p>2009 - Sick Fish Tattoos and Body Piercing</p>
      <p>2010 - A.J. Gallagher, Financial Plus Credit Union</p>
      <p>2011 - Mendota High School</p>
      <p>2012 - First State Bank, Mendota Community Hospital</p>
      <p>2013 - Becker Chiropractic, Mendota Area Y, Schimmer's, Waterfalls Casual Dining & Cocktails</p>
      <p>2014 - Mendota McDonald's</p>
      <p>2015 - Martin Law Office</p>
      <p>2016 - Fili's Hair Studio & Ziggie's Family Restaurant</p>
      <p>2017 - Beck Oil Company, Del Monte Foods & Dr. Tara N. VanDeWyngaerde, OD, PC</p>
      <p>2018 - Casey's General Store & McDonalds</p>
      <p>2019 - Triple Serivce, Inc., Rosati's Pizza of Mendota, Mendota Lions Club & Optimist Club of Mendota</p>
      <p>2020 - El Zarape</p>
      <p>2021 - Mendota Fire Dept. Station #2, Blackstone Elementry School</p>
      <p>2022 - The Chalet Sports Bar</p>
      <p>2023- La Esquinita de Oro Ice Cream Shop</p>
      <p>2024- Scooter's Coffee</p>
    </div>
  )
}
