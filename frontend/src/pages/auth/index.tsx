import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { AppDispatch } from '../../store/store';
import { login } from '../../store/user/user.slice';
import { AuthService } from '../../service/auth.service';
import { useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const dispatch = useAppDispatch<AppDispatch>();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await AuthService.login({ email: username, password });
            if (data) {
                dispatch(login({ user: data }));
                navigate('/');
            }
        } catch (error) {
            // @ts-ignore
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}