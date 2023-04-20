import Image from 'next/image'

const TopPhoto: React.FC = () => (
    <Image
    src="/photo/sakura.jpg"
    layout={"intrinsic"}
    width={3000}
    height={2000}
    alt="" />
)
