import Image from 'next/image'
import award from '@/public/Horace-Hume-25-Photo.jpg';


export default function HoraceHumeAward() {
  return (
    <div className="page">
      <h2>Horace Hume Outstanding Service Award</h2>
      <p>Every year the Chamber presents an Outstanding Service Award to a Chamber Member who has actively played a role in the Mendota Chamber, Community Activities and Service.</p>
      <div className="line"></div>
      <h2>2024 Horace Hume Award Winner</h2>
      <Image src={award}
        alt='sweet corn volunteer award'
        className='md:h-[80vh] h-[60vh] w-auto object-contain'
      />
      <p>Tony Troyer</p>
      <div className="line"></div>
      <h2>Past Award Recipients</h2>
      <p>1970 - Harold Atherton</p>
      <p>1970 - George Frost Jr.</p>
      <p>1971 - Emerson Tidd</p>
      <p>1972 - Horace D. Hume</p>
      <p>1973 - Richard Leiser</p>
      <p>1974 - Henry Sauer</p>
      <p>1975 - G.A. Prescott</p>
      <p>1975 - Julius Schaller</p>
      <p>1976 - Kenneth B. Butler</p>
      <p>1977 - Harry F. Schaller</p>
      <p>1978 - John Goebel</p>
      <p>1979 - June Claus</p>
      <p>1980 - Jessica Nashold</p>
      <p>1981 - Christ Troupis</p>
      <p>1982 - Allen Bonnell</p>
      <p>1983 - Thomas Merwin</p>
      <p>1984 - James "Stymie" Schmitt</p>
      <p>1985 - Robert Shafer</p>
      <p>1986 - Stan Kordek</p>
      <p>1987 - Roger Krenz</p>
      <p>1988 - Bill Phalen</p>
      <p>1989 - Len Schaller</p>
      <p>1990 - Gaylon Ehlers</p>
      <p>1991 - Bill Gish</p>
      <p>1992 - Jim Wade</p>
      <p>1993 - Horace D. Hume</p>
      <p>1994 - Robert Cooper</p>
      <p>1995 - James Strouss</p>
    </div>
  )
}
