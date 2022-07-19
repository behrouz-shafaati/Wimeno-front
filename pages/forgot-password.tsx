import React from 'react'
import { Box, Container } from '@mui/material';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LocaleSwitcher from '../components/locale-switcher-button';
import ToggleThemeButton from '../components/toggle-theme-button';
import BackButton from '../components/back-Button'
import PageTitle from '../components/page-title'
import InputText from '../components/input-text'
import SendButton from '../components/send-button'
import BLink from '../components/link'

const ForgotPassword: NextPage = () => {
    const { t } = useTranslation('common');
    const [loading, setLoading] = React.useState(false);
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
        <PageTitle title={t("forgot_password")} />
        <InputText
          name={t("email")}
          autoFocus  
        />
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

export default ForgotPassword