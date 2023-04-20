import Image from 'next/image'

const TopPhoto: React.FC = () => (
    <Image
    src="/photo/sakura2.jpg"
    layout={"intrinsic"}
    width={3000}
    height={2000}
    loading={'eager'}
    quality={75}
    alt="sakura" />
)

export default TopPhoto;