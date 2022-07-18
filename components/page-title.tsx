import Typography from '@mui/material/Typography';

type Props = {
    title: string
}
const PageTitle: React.FC<Props> = ({title}) =>{ 
    // sx = typeof sx === 'undefined' ? {} : sx;
    // sx.width = typeof sx.width === 'undefined' ? '100%' : sx.width;
    // label = typeof label === 'undefined' ? props.name : label;
    // id = typeof id === 'undefined' ? props.name : id;
    return (
    <Typography
        variant='h2' 
        sx={{
            fontSize: '1rem', 
            fontWeight: 600,
            color: 'primary.main',
            textAlign: 'center',
            mt:4,
            mb:0
        }}
    >
        {title}
    </Typography>
    )
  }
  
  export default PageTitle