import Image from 'next/image';
import Link from 'next/link';
import fs from "fs";
import path from "path";

import corn from '@/public/sidebar-events/corn-cob.jpg';
import valentineBaby from '@/public/sidebar-events/vbae.jpg';
import valentineSponsors from '@/public/sidebar-events/Valentine-Baby-Contest-2026-w300.png'
import smallLogo from '@/public/chamber-logo-small.png';
import ProfileBook from '@/public/2025-Cover.jpg';
import BookButton from './BookButton';

function getSidebarImages() {
  const folderPath = path.join(process.cwd(), "public/sidebar-events");
  const files = fs.readdirSync(folderPath);

  return files.map((file) => `/sidebar-events/${file}`);
}

export default function Sidebar() {
  const images = getSidebarImages();
  

  return (
    <div className='sidebar'>
      <BookButton/>

      
      
      {images.map((src) => {
        const filename = src.split("/").pop() || "";

        return (
          <Image
            key={src}
            src={src}
            width={500}
            height={200}
            alt={filename}
            className="h-auto md:w-full w-[80%] shadow-md"
          />
        );
      })}
      
      <div>
        <div className='info-box-header'>
          <Image src={smallLogo}
            alt='small chamber logo'
            className='h-10 w-auto'
          />
          Community Profile Book
        </div>
        <div className='info-box flex flex-col items-center text-center'>
          <Link href='https://issuu.com/shawmedia/docs/lnt_mendota_chamber_community_profile_2025?fr=sYWE2Nzg1NDU5OTE'
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={ProfileBook}
              alt='Community profile cover'
              className='h-80 w-auto'
            />
            <br />
            View Here
          </Link>
        </div>
      </div>
      <div>
        <div className='info-box-header'>
          <Image src={smallLogo}
            alt='small chamber logo'
            className='h-10 w-auto'
          />
          Mission Statement
        </div>
        <div className='info-box'>
          <span>The Mendota Area Chamber of Commerce is a community organization in partnership with business, tourism, and government to further promote economic growth and quality of life in Mendota.</span>
        </div>
      </div>
        
    </div>
  )
}
