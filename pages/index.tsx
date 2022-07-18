import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import LocaleSwitcher from '../components/locale-switcher-button'
import ToggleThemeButton from '../components/toggle-theme-button'

const Home: NextPage = () => {
    const { t } = useTranslation('common');
    return (
      <Container maxWidth="xs">
        <Box className='flex-row-space-between mt2'>
          <Link href="login">
            <Button variant='text'>{t("login")}</Button>
          </Link>
          <Box className='flex-row-space-between'>
            <LocaleSwitcher sx={{mr:1}} />
            <ToggleThemeButton />
          </Box>
        </Box>
        
      </Container>
    )
}

export async function getServerSideProps({ locale }: { locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Home
