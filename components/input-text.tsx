
import React from 'react';
import { FormControl, FormHelperText, IconButton, InputLabel, Typography } from '@mui/material';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import { SxProps } from '@mui/material/styles';
import Image from 'next/image';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#EFEFEF' : '#1a1a1a',
      border: `1px solid ${theme.palette.mode === 'light' ? "#EFEFEF" : "#1a1a1a"}`,
      fontSize: `1rem`,
      //width: 'auto',
      padding: '9px 5px 9px 5px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:focus': {
        // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  })
);

type Props = InputBaseProps &{
  name: string;
  label?: string;
  id?: string;
  sx?: SxProps;
};

const InputText: React.FC<Props> = ({register, error, sx, label, id, ...props}) => {
  const[showPassword, setShowPassword] = React.useState(false);
  sx = typeof sx === 'undefined' ? {mt:2} : sx;
  sx.width = typeof sx.width === 'undefined' ? '100%' : sx.width;
  label = typeof label === 'undefined' ? props.name : label;
  id = typeof id === 'undefined' ? props.name : id;
  const type = typeof props.type === 'undefined' ? 'text' : props.type;

  const handleClickShowPassword = () => {
    setShowPassword( prev => !prev )
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  if(type == 'password')
    return(
      <FormControl sx={sx} variant="standard">
        <InputLabel shrink htmlFor={id}>
          <Typography sx={{fontSize: '0.9rem', fontWeight: 500}}>
            {label}
          </Typography>
        </InputLabel>
        <BootstrapInput
          id={id}
          {...props}
          type={showPassword ? 'text' : 'password'}
          {...register(props.name)}
          error={Boolean(error)}
        />
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          sx={{
            position: 'absolute',
            top: '26px',
            right: '1px'
          }}
        >
          <Image src={showPassword ? "/src/icons/akar-icons_eye-closed.svg" : "/src/icons/akar-icons_eye.svg" }  height={25} width={25} />
        </IconButton>
        <FormHelperText error>
                {error ? error.message : ""}
        </FormHelperText>
      </FormControl>
    )

    return(
      <FormControl sx={sx} variant="standard">
        <InputLabel shrink htmlFor={id}>
          <Typography sx={{fontSize: '0.9rem', fontWeight: 500}}>
            {label}
          </Typography>
        </InputLabel>
        <BootstrapInput
          id={id}
          {...props}
          {...register(props.name)}
          error={Boolean(error)}
        />
        <FormHelperText error>
                {error ? error.message : ""}
        </FormHelperText>
      </FormControl>
    )
}

export default InputText