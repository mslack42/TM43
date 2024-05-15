import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Link href='/level'>Play a level</Link>
      <Link href='/designer'>Design a level</Link>
    </div>
  )
}
