"use client";

import { createContext, use, useEffect } from 'react';
import type { AuthService } from '../types/auth.types';
import { AuthService as AuthServiceImpl } from '../services/auth.service';
import React from 'react';
import { useCustomToast } from '@/hooks/useCustomToast';
import {useLocalStorage} from '@/hooks/useLocalStorage';

interface User {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    isActive?: boolean;
    isEmailVerified?: boolean;
    isTwoFactorEnabled?: boolean;
    lastLoginAt?: string;
    roles?: string[];
    permissions?: string[];
    metadata?: Record<string, any>;
    [key: string]: any; // Allow additional properties
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
    updateUser: (user: Partial<User>) => void;
    clearError: () => void;
    setToken: (token: string) => void;
    clearToken: () => void;
    isTokenValid: () => boolean;
    getUser: () => User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    refreshUser: () => Promise<void>;
    isUserAuthenticated: () => boolean;
    isUserActive: () => boolean;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(undefined as any);

export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [token, setToken] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const authService = AuthServiceImpl;
    const showToast = useCustomToast();
    const [storedToken, setStoredToken] = useLocalStorage<string | null>('authToken', null);
    const [storedUser, setStoredUser] = useLocalStorage<User | null>('user', null);

    // Client-side navigation helper
    const navigateTo = (path: string) => {
        if (typeof window !== 'undefined') {
            window.location.href = path;
        }
    };

    useEffect(() => {
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setToken(null);
            setIsAuthenticated(false);
        }
    }, [storedToken]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login({ email, password });
            
            if (response.data && response.data.token) {
                setToken(response.data.token);
                setStoredToken(response.data.token);
                setUser(response.data.user);
                setStoredUser(response.data.user);
                setIsAuthenticated(true);
                showToast.success('Login successful');
            } else {
                throw new Error('Invalid response format');
            }
            return response.data.message;
        } catch (err) {
            console.error('AuthContext: Login error', err);
            const errorMessage = err || 'Login failed';
            setError(errorMessage ?  (errorMessage as any).message || errorMessage : 'Login failed');
            showToast.error('Login failed', errorMessage ? (errorMessage as any).message || errorMessage : 'Login failed');
            return Promise.reject(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authService.logout();
            setToken(null);
            setStoredToken(null);
            setIsAuthenticated(false);
            setUser(null);
            setStoredUser(null);
            showToast.success('Logout successful');
        } catch (err) {
            const errorMessage = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : 'Login failed';
            setError(errorMessage);
            showToast.error('Login failed', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, confirmPassword: string) => {
        setIsLoading(true);
        setError(null);
        try {
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            await authService.register({ name, email, password });
            showToast.success('Registration successful');
        } catch (err) {
            console.error('AuthContext: Registration error', err);
            const errorMessage = err || 'Registration failed';
            setError(errorMessage ? (errorMessage as any).message || errorMessage : 'Registration failed');
            showToast.error('Registration failed', errorMessage ? (errorMessage as any).message || errorMessage : 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = (userData: Partial<User>) => {
        setUser((prevUser) => {
            if (!prevUser) return null;
            return {
                ...prevUser,
                ...userData,
                id: userData.id ?? prevUser.id,
                email: userData.email ?? prevUser.email,
            };
        });
    };

    const clearError = () => {
        setError(null);
    };

    const clearToken = () => {
        setToken(null);
        setStoredToken(null);
    };

    const isTokenValid = () => {
        return !!token;
    };

    const getUser = () => {
        return user;
    };

    const setUserDirect = (userData: User) => {
        setUser(userData);
    };

    const clearUser = () => {
        setUser(null);
    };

    const refreshUser = async () => {
        setIsLoading(true);
        try {
            const refreshedUserData = await authService.getUser(Number(user?.id) || 0);
            setUser(refreshedUserData);
            setIsAuthenticated(!!refreshedUserData);
        } catch (err) {
            const errorMessage = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : 'Login failed';
            setError(errorMessage);
            showToast.error('Login failed', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const isUserAuthenticated = () => {
        return isAuthenticated;
    };

    const isUserActive = () => {
        return user?.isActive ?? false;
    };

    const changePassword = async (currentPassword: string, newPassword: string) => {
        setIsLoading(true);
        try {
            await authService.changePassword(currentPassword, newPassword);
            showToast.success('Password changed successfully');
        } catch (err) {
            const errorMessage = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : 'Login failed';
            setError(errorMessage);
            showToast.error('Login failed', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (email: string) => {
        setIsLoading(true);
        try {
            await authService.resetPassword(email);
            showToast.success('Password reset email sent');
        } catch (err) {
            const errorMessage = (err && typeof err === 'object' && 'message' in err) ? (err as any).message : 'Login failed';
            setError(errorMessage);
            showToast.error('Login failed', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                token,
                isLoading,
                error,
                login,
                logout,
                register,
                updateUser,
                clearError,
                setToken: (newToken) => {
                    setToken(newToken);
                    setStoredToken(newToken);
                },
                clearToken,
                isTokenValid,
                getUser,
                setUser: setUserDirect,
                clearUser,
                refreshUser,
                isUserAuthenticated,
                isUserActive,
                changePassword,
                resetPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

