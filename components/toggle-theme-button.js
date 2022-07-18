import Image from 'next/image';
import { useContext } from 'react'
import { ThemeModeContext } from '../pages/_app'
import BgIconButton from './bg-icon-button'
// ** if .ts file
// type HomeProps = {
//   toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
// }
const ToggleThemeButton = () => {
    const toggleTheme = useContext(ThemeModeContext);
    return (
    <BgIconButton onClick={toggleTheme} size="small">
        <Image src="/src/icons/moon.svg" height={30} width={30} />
    </BgIconButton>
    )
}

export default ToggleThemeButton