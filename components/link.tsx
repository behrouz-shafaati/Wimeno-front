import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

type Props = {
    href: string;
    title : string;
}

const Link_: React.FC<Props> = ({href, title}) => (
    <Box sx={{mt:2}}>
        <Link href={href}>
            <Typography sx={{fontSize: '0.8rem', color: 'primary.main',fontWeight: 500}}>
                {title}
            </Typography>
        </Link>
    </Box>
)

export default Link_