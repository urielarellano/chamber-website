import rates from '@/public/member-rates.jpg';
import Image from 'next/image';

export default function MembershipRates() {
    return (
        <div className='page'>
            <h1>Membership Rates</h1>
            <Image
                src={rates}
                alt='membership rates'
                className='w-[100%] h-auto shadow-md'
            />
        </div>
    )
}