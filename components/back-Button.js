import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import Link from 'next/link'
const BackButton = () => {
    return (
        <Link href="/">
            <IconButton sx={{width: 40, height: 40}}>
                <Image src="/src/icons/back-right.svg" height={15} width={15} />
            </IconButton>
        </Link>
    )
}

export default BackButton