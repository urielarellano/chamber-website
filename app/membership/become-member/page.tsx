import Link from "next/link";
import rates from '@/public/member-rates.jpg';
import Image from "next/image";

export default function Membership() {
    return (
        <div className='page'>
            <h1>Become a Chamber Member and Advertise Your Business, Build Your Network, and More!</h1>
            <a className='bg-blue-500 p-6 pt-3 pb-3 w-fit rounded no-underline! text-white shadow-lg hover:bg-blue-400 cursor-pointer'
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.mendotachamber.com/member/newmemberapp/">
                Click here to become a member!
            </a>
            <div className="flex flex-col gap-2">
                <b className="text-lg">Networking Opportunities</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Membership offers a variety of opportunities for making new contacts and building visibility in Mendota's business community. We host numerous events throughout the year that range from after hours networking events to legislative forums, to professional development seminars to recognition ceremonies featuring Mendota's foremost leaders.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Marketing Opportunities</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Membership in the Mendota Chamber of Commerce offers opportunities to gain marketing exposure and place your business before the area's business, government, and community.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Cost-Saving Programs</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Through membership in the Mendota Chamber of Commerce, businesses can save money through group advertising promotions.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Internet Marketing</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Gain added visibility for your business on the Chamber's website. Businesses are listed in both an alphabetic listing and business category listing and links will be made from each to your website. Banner and sponsorship opportunities are available. The Chamber also sends an e-newsletter to both members and non-members advertising your business and events. E-newsletters are sent out to over 700 email addresses.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Membership Directory</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    This referral resource is available on the Chamber website.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Telephone Referrals</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    The Chamber receives hundreds of requests for recommendations on local businesses. As a member, you'll be on our list of referrals and maximize your opportunities to gain market exposure.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Mendota Gift Certificates</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    The Chamber is in charge of Mendota Area Chamber of Commerce Gift Certificates, also known as "Chamber Bucks" or "Mendota Bucks". These gift certificates can be used at any chamber member business making it a wonderful gift option that helps keep money local. In 2023 around $19,000 was spent at our member businesses through the Gift Certificate Program.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Mendota Community Profile Book</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Every year in March the chamber partners with the LaSalle Tribune to produce The Mendota Community Profile Book which features a full directory of Mendota Area Chamber of Commerce Members. This year's Mendota Community Profile Book can be found HERE.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Lunch Specials</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Monday-Friday the chamber sends out the Daily Lunch Specials. This email, which is also posted on our social media, features restaurant specials, menu, and hours for the day.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Job Center</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Are you hiring? The Mendota Area Chamber of Commerce Job Center is on our website and a great way to get the word out about open positions. Having a listing is no-cost for Chamber Members.
                </span>
            </div>

            <div className="flex flex-col gap-2">
                <b className="text-lg">Events Calendar</b>
                <span className='p-4 border-l-3 border-gray-400'>
                    Our Events Calendar, which gets hundreds of views a month, is featured on our website, e-newsletter, and on the City of Mendota Website.
                </span>
            </div>
            <a className='bg-blue-500 p-6 pt-3 pb-3 w-fit rounded no-underline! text-white shadow-lg hover:bg-blue-400 cursor-pointer'
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.mendotachamber.com/member/newmemberapp/">
                Click here to become a member!
            </a>

            <div className="line"></div>
            <h2>Membership Rates:</h2>
            <Image
                src={rates}
                alt='membership rates'
                className='w-[100%] h-auto shadow-md'
            />

            <a className='bg-blue-500 p-6 pt-3 pb-3 w-fit rounded no-underline! text-white shadow-lg hover:bg-blue-400 cursor-pointer'
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.mendotachamber.com/member/newmemberapp/">
                Click here to become a member!
            </a>
        </div>
    )
}