import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { logout } from '../../store/user/user.slice';
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {AuthService} from "../../service/auth.service.ts";

export default function Header() {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.user);

    const handleLogout = async () => {
        await AuthService.logout()
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Survey App
                </Typography>
                {isAuthenticated && (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}