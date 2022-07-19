import React from 'react';
import { Box, Button, FormControl, InputLabel, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import {InputBaseProps} from '@mui/material/InputBase';
import { SxProps } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        width: '15px',
        marginLeft: '8px',
      borderRadius: 0,
      position: 'relative',
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? "#adadad" : "#1a1a1a"}`,
      fontSize: `1rem`,
      textAlign: 'center',
      padding: '9px 5px 2px 5px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
    },
  })
);

type Props = InputBaseProps &{
    label?: string;
    sx?: SxProps;
    fields: number;
    handleChange: ( code: string ) => void;
    id: string;
    wait: number;
    buttonText: string;
  };

const InputCode: React.FC<Props>  = ({ handleChange, id, buttonText, wait = 0,  sx = {},fields, label="", ...props }) => {
    const type = typeof props.type === 'undefined' ? 'number' : props.type;
    const preId = `inputCode-${id}-`;
    const getCode = () => {
        let code = "";
        for(var i = 1; i <= fields; i++)
            code = code + document.getElementById(`${preId}${i}`).value;
        handleChange(code);
    }
    const handleClick = (e) => {
        let el = document.getElementById(e.target.attributes['id'].value)
        const end = e.target.value.length;
        el.setSelectionRange(end, end);
        el.focus();
    }
    const handleKeyPress = (e) => {
        if( e.key.toLowerCase() == "enter" )
            return;
        let el = document.getElementById(e.target.attributes['id'].value)
        let nextEl = null;
        let CurrentValue = e.target.value;
        let newValue = e.key.replace(/\s/g, '');
        if( newValue != '' )
            el.value = e.key;
        if( newValue != '' && e.target.attributes['data-next'].value != '%')
            nextEl = document.getElementById(e.target.attributes['data-next'].value);
        if(nextEl)
        {
            const end = nextEl.value.length;
            nextEl.setSelectionRange(end, end);
            nextEl.focus();
        }

        getCode();
    }
    const handleKeyDown = (e) => {
        let value = e.target.value;
        let nextEl = null;
        if(value == '' && e.target.attributes['data-before'].value != '%')
            nextEl = document.getElementById(e.target.attributes['data-before'].value);
        if( e.keyCode == 8 && nextEl ){ // key code 8 == back button
            const end = nextEl.value.length;
            nextEl.setSelectionRange(end, end);
            nextEl.focus();
        }
        getCode()
    }
    var inputs = [];
    for (var i = 1; i <= fields; i++) {
        let beforeId = i == 1 ? '%' : `${preId}${i-1}`;
        let nextId = i == fields ? '%' : `${preId}${i+1}`;
        inputs.push(
            <BootstrapInput 
                inputProps={{
                    maxLength: 1,
                    'data-before': beforeId,
                    'data-next': nextId
                }}
                key={`n${i}`}
                id={`${preId}${i}`}
                onKeyPress={handleKeyPress}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
            />
        )
    } 
    
    if(props.name !== 'undefined')
        label = label == "" ? props.name : label;
    const Title = () => (
            <InputLabel shrink>
                <Typography sx={{fontSize: '0.9rem', fontWeight: 500}}>
                    {label}
                </Typography>
            </InputLabel>
    )

    return (
        <Paper sx={{mt:2, display : 'inline-block', width: '100%', backgroundColor: 'inherit', ...sx}} variant="standard">
            {label && <Title/>}
            <Box sx={{display: 'flex', justifyContent: "space-around", alignItems: "baseline"}}>
                <div style={{ direction: "ltr" }}>
                    {inputs.map((v,i) => inputs[i] )}
                </div>
                <Button>
                    {buttonText}
                </Button>
            </Box>
        </Paper>
    )
}

export default InputCode