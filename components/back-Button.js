import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
const BackButton = () => {
    const router = useRouter()
    return (
            <IconButton onClick={() => router.back()} sx={{width: 40, height: 40}}>
                <Image src="/src/icons/back-right.svg" height={15} width={15} />
            </IconButton>
    )
}

export default BackButton