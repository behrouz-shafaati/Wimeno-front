import React from "react";
import { alpha, styled } from '@mui/material/styles';
import { ButtonProps } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'

const BootstrapButton = styled(LoadingButton)(({ theme }) => ({
    '& .MuiLoadingButton-loadingIndicator':{
        color: theme.palette.primary.main
    }
    })
);
type Props = ButtonProps & {
    title: string;
}

const SendButton: React.FC<Props> = ({title, ...props}) => {
    return <BootstrapButton sx={{mt:4, width: '100%', borderRadius: '8px'}} {...props} >{title}</BootstrapButton>
};

export default SendButton