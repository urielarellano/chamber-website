import Image from 'next/image'
import award from '@/public/Gold-Star-25-Photo.jpeg';


export default function TomMerwinAward() {
  return (
    <div className="page">
      <h2>Tom Merwin Gold Star Employee</h2>
      <p>Every year the community is asked to nominate sales people who have gone above the "normal" in attitude and customer service. The Chamber votes on the final selection.</p>
      <div className="line"></div>
      <h2>2025 Tom Merwin Gold Star Employee</h2>
      <Image src={award}
        alt='sweet corn volunteer award'
        className='md:h-[80vh] h-[60vh] w-auto object-contain'
      />
      <p>Celina Garza- Financial Plus Credit Union</p>
      <div className="line"></div>
      <h2>Past Award Recipients</h2>
      <p>1992 - Cheryl Thorne - First State Bank</p>
      <p>1993 - Hester Full - Sullivan's Foods</p>
      <p>1994 - Joyce McDonald -</p>
      <p>1995 - Barb Christopher - Eureka Savings Bank</p>
      <p>1996 - Jack Arkins - Goslin Drug Store</p>
      <p>1997 - Johnny Ray Arteaga -</p>
      <p>1998 - Bob Francis- Precision Auto Wash</p>
      <p>1999 - Sheila Bettner - True Value Hardware</p>
      <p>2000 - Nellie Needs - The Kitch-Inn</p>
      <p>2001 - Bob Barnett - Precision Auto Wash</p>
      <p>2002 - Donna Johnson - First State Bank</p>
      <p>2003 - James “Stymie” Schmitt -</p>
      <p>2004 - Sherry Kuntzi - Goslin Drug Store</p>
      <p>2005 - Steve Dinges- Mendota Farmers Coop</p>
      <p>2006 - Jackie Emm - Mendota Elks Club</p>
      <p>2007 - Anne Buchanan - Goslin’s Drug Store</p>
      <p>2008 - Dave Fitzgerald - R & R Ford</p>
      <p>2009 - Rayanne Sester - Mendota Area Senior Services</p>
      <p>2010 - Linda Basil - Mendota Drivers License Facility</p>
      <p>2011 - Carolyn Motter - Mendota Lutheran Home</p>
      <p>2012 - Charlotte Delhotal - Parkway Restaurant</p>
      <p>2013 - Sarah Dalton - Goslin's Drug Store</p>
      <p>2013 - Lori Simonton - First State Bank</p>
      <p>2014 - Cheryl Barr - First State Bank</p>
      <p>2015 - Rita Borelli & Wendy Letterly - City of Mendota</p>
      <p>2016 - Lynn Carbone - CVS/pharmacy</p>
      <p>2017 - Ashley Brooks - Rosati's Pizza Pub & Mendota Golf Club</p>
      <p>2018 - Colleen Myers - Mendota Area Y</p>
      <p>2019 - Sidney Engles - Mendota Animal Companion Centre</p>
      <p>2020 - Nancy Bogle - Stonecroft Village</p>
      <p>2021 - Jamie Bromenschenkel - West Side Family Dentistry</p>
      <p>2022 - Jennifer Sibley - Casey's General Store</p>
      <p>2023 - Gerri Herren- Becks BP</p>
      <p>2024 - Omar Espinoza-Mendota Area YMCA</p>
    </div>
  )
}
