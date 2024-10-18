import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Header from './components/Header';
import AuthPage from './pages/auth';
import SurveyPage from './pages/survey';
import ResultsPage from './pages/results';
import ProtectedRoute from './components/ProtectedRoute';
import { RootState } from './store/store';
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { Role } from "./types/types.ts";
import { getTokenFromLocalStorage } from "./helpers/localstorage.ts";
import { login, logout } from "./store/user/user.slice.ts";
import { AuthService } from "./service/auth.service.ts";

const theme = createTheme();

export default function App() {
    const { isAuthenticated, user } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = async () => {
        const token = getTokenFromLocalStorage();
        if (token) {
            try {
                const data = await AuthService.getMe();
                if (data) {
                    dispatch(login({ user: data }));
                } else {
                    dispatch(logout());
                }
            } catch (error: any) {
                alert(error.message);
                dispatch(logout());
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const isAdmin = !!user && user.role === Role.Admin;

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/auth"
                        element={isAuthenticated ? <Navigate to={isAdmin ? '/results' : '/survey'} replace /> : <AuthPage />}
                    />
                    <Route
                        path="/survey"
                        element={
                            <ProtectedRoute
                                isAuthenticated={isAuthenticated}
                                isAdmin={isAdmin}
                                element={<SurveyPage />}
                            />
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <ProtectedRoute
                                isAuthenticated={isAuthenticated}
                                isAdmin={isAdmin}
                                element={<ResultsPage />}
                            />
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to={isAuthenticated ? (isAdmin ? '/results' : '/survey') : '/auth'}
                                replace
                            />
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}