import React from "react";
import { ButtonProps } from "@mui/material"
import Button from '@mui/material/Button';

type Props = ButtonProps & {
    title: string;
}

const FullWidthButton: React.FC<Props> = ({title, ...props}) => {
    return <Button sx={{mt:4, width: '100%', borderRadius: '8px'}} {...props} >{title}</Button>
};

export default FullWidthButton