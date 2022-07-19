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

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login: NextPage = () => {
    const { t } = useTranslation('common');
    const [sending, setSending] = React.useState(false);

    const initialValues = {
      email: '',
      password: ''
    }

    const validationSchema = Yup.object().shape({
      email: Yup.string().email(t("email_is_invalid")).required(t("email_is_required")),
      password: Yup.string().min(6, t("password_must_be_at_least_6_characters")).required(t("password_is_required"))
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
      defaultValues: initialValues,
      resolver: yupResolver(validationSchema)
    });

    
    function submit() {
      setSending(true);
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
        
        <PageTitle title={t("login")} />
        <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(submit)}
            sx={{ mt:3 }}
        >
          <InputText
            label={t("email")}
            name="email"
            register={register}
            error={errors.email}
            autoFocus
          />
          <InputText
            label={t("password")}
            name="password"
            type="password"
            register={register}
            error={errors.password}
            autoComplete="on"
          />
          <SendButton title={t("send")} variant='contained' loading={sending} type="submit" />
        </Box>
        <BLink href="/register" title={t("register")} />
        <BLink href="/forgot-password" title={t("forgot_password")} />
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

export default Login