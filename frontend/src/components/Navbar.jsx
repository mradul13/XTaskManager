import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar  from '@mui/material/Toolbar';

export const Navbar = ()=>{
    return (
            <AppBar position='static' sx={{flexGrow:1}}>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{flexGrow:1}}>
                        Task Manager
                    </Typography>
                </Toolbar>
            </AppBar>
    )
};