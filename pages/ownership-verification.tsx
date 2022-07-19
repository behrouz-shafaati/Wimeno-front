import React from 'react'
import { Box, Container, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LocaleSwitcher from '../components/locale-switcher-button';
import ToggleThemeButton from '../components/toggle-theme-button';
import BackButton from '../components/back-Button'
import PageTitle from '../components/page-title'
import InputCode from '../components/input-code'
import SendButton from '../components/send-button'
import BLink from '../components/link'

const OwnershipVerification: NextPage = () => {
  const[code,setCode] = React.useState('');
    const { t } = useTranslation('common');
    const [loading, setLoading] = React.useState(false);
    const handleChangeCode = ( code: string ) => {
      setCode(code);
      console.log("new code set: ",code)
    }
    function handleClick() {
      setLoading(true);
    }
    return (
      <Container>
        <Box className='flex-row-space-between mt2'>
          <BackButton/>
          <Box className='flex-row-space-between'>
            <LocaleSwitcher sx={{mr:1}} />
            <ToggleThemeButton />
          </Box>
        </Box>
        <PageTitle title={t("account_ownership_verification")} />
        <Typography sx={{ fontSize: '0.9rem', mt:3}}>
          {t("enter_ownership_emailed")}
        </Typography>
        <InputCode id="code" handleChange={handleChangeCode} fields={4} wait= {60} buttonText={t("resend")} sx={{mt:4,mb:0}} />
        <SendButton title={t("send")} variant='contained' loading={loading} onClick={handleClick} />
        <BLink href="/login" title={t("login")} />
      </Container>
    )
}

export async function getServerSideProps({ locale }: {locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default OwnershipVerification