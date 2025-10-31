import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(
                err.response?.data?.message ||
                err.message ||
                'Failed to sign in. Please check your credentials.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E5E5E5] to-[#FFFFFF] dark:from-[#000000] dark:to-[#14213D] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-[#FFFFFF] dark:bg-[#14213D] rounded-2xl shadow-xl p-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[#14213D] dark:text-white">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-[#14213D] dark:text-[#E5E5E5]">
                        Or{' '}
                        <Link
                            to="/register"
                            className="font-medium text-[#FCA311] hover:text-[#e38f0d] dark:text-[#FCA311] dark:hover:text-[#e38f0d]"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="input rounded-t-md"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="input rounded-b-md"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-[#FCA311] text-[#000000] hover:bg-[#e38f0d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCA311] rounded-md py-3 text-sm font-medium transition-colors disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 