import Image from 'next/image';

export default function Loading(){
  return(
      <div className='loading'>
        <Image
          src='/ballLogo.png'
          height={50}
          width={50}
        />
      </div>
  )
}
