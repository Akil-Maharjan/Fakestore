import { StaticImageData } from 'next/image'

export const PARTNERS: { name: string; logo: StaticImageData }[] = [
  {
    name: 'Cloud Education',
    logo: {
      src: '/partners/cloudedu.svg',
      width: 120,
      height: 60
    }
  },
  {
    name: 'CMC',
    logo: {
      src: '/partners/Cmc.svg',
      width: 120,
      height: 60
    }
  },
  {
    name: 'IT SNP',
    logo: {
      src: '/partners/itSnp.svg',
      width: 120,
      height: 60
    }
  },
  {
    name: 'Zebec',
    logo: {
      src: '/partners/zebec.svg',
      width: 120,
      height: 60
    }
  }
]
