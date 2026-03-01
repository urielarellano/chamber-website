import Image from "next/image"
import Link from "next/link"
import logo from '@/public/chamber-logo.jpg';

export default function Footer() {
  return (
    <footer>
      <div className="footer-cols">
        <div className="f-col flex-row">
          <h1>Follow Us</h1>
          <div className='flex flex-row gap-2'>
            <a href="https://www.facebook.com/mendotachamber/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.youtube.com/watch?v=4JqIAN9ITgU" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://www.youtube.com/watch?v=4JqIAN9ITgU" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
          
        </div>
        <div className="f-col">
          <h1>About the Chamber</h1>
          <Link href='/about/about-us'>About Us</Link>
          <Link href='/about/staff'>Chamber Staff & Officers</Link>
          <Link href='/about/directors'>Board of Directors</Link>
          <Link href='/about/ambassadors'>Ambassadors</Link>
          <Link href='/about/past-presidents'>Past Chamber Presidents</Link>
        </div>
        <div className="f-col">
          <h1>Job Center</h1>
          <Link href='/job-postings'>Job Postings</Link>
        </div>
        <div className="f-col">
          <h1>Events</h1>
          <Link href='/events/list'>Events List</Link>
          <Link href='/events/calendar'>Events Calendar</Link>
        </div>

        <div className="f-col">
          <b className='mb-1'>Mendota Area Chamber of Commerce</b>
          <a className='flex flex-row gap-2' href='https://www.google.com/maps?q=800+Washington+Street+Mendota+IL+61342' target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            800 Washington Street, Mendota, IL 61342
          </a>
          <a className='flex flex-row gap-2' href='tel:+18155396507'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
            </svg>
            815.539.6507
          </a>
          <a className='flex flex-row gap-2' href='mailto:president@mendotachamber.com'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
            </svg>
            president@mendotachamber.com
          </a>
        </div>
      </div>
      
      
      
      <Image
        src={logo} 
        alt="chamber logo large"
        className="h-40 w-auto object-contain"
      />
      <span>© Copyright 2026 Mendota Area Chamber of Commerce. All Rights Reserved. 
        <br /> Website built by Uriel Arellano (urielarellano017@gmail.com)</span>
    </footer>
  )
}
