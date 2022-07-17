import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import BgIconButton from '../components/bg-icon-button'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LocaleSwitcher from '../components/language-switcher'

const Home: NextPage = () => {
  
  const { locale } = useRouter();
    const { t } = useTranslation('common');
    return (
      <Container maxWidth="xs">
        <Box className='flex-row-space-between mt2'>
          <Button variant='text'>{t("login")}</Button>
          <Box className='flex-row-space-between'>
            <BgIconButton sx={{width: 40, height: 40, mr:1}}>
              <Typography>
                {locale}
              </Typography>
            </BgIconButton>
            
            <BgIconButton size="small">
              <Image src="/src/icons/Vector.svg" height={30} width={30} />
            </BgIconButton>
          </Box>
        </Box>
        <LocaleSwitcher />
      </Container>
    )
}

export async function getStaticProps({ locale }: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Home
