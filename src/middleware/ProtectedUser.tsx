import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios';

export default function ProtectedUser() {
    const { user, logout } = useAuth();

    const SetupAxiosInterceptors = () => {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.data.code === 401 && error.response.data.message === 'Token expired') {
                    logout()

                }
                return Promise.reject(error);
            }
        );
    };

    useEffect(() => {
        SetupAxiosInterceptors();
    }, []);

    return user ? <Outlet /> : <Navigate to="/login" replace />
}