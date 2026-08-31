'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Loader2, Dumbbell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        setError(result.message || 'Invalid email or password.');
        setIsLoading(false);
      } else {
        setIsLoading(false);
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-zinc-950 text-zinc-100 font-sans">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
        <Image 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
          alt="Fitness Training"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute bottom-12 left-12 z-20 max-w-xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Push harder than yesterday if you want a different tomorrow.
            </h2>
            <p className="text-zinc-400 text-lg">
              Manage your FabFit Performance community, track assessments, and build programs seamlessly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          {/* Logo Name */}
          <div className="flex items-center gap-3 mb-10">
            <Image src="/logo.png" alt="FabFit Logo" width={48} height={48} className="object-contain" />
            <h1 className="text-2xl font-black tracking-tight text-white">
              Fab<span className="text-amber-500">Fit</span> <span className="font-light text-zinc-400">Performance</span>
            </h1>
          </div>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Please sign in to your admin dashboard.
          </p>

          <div className="mt-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex gap-3 items-center text-sm text-amber-400"
                >
                  <svg className="h-5 w-5 text-amber-400 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-lg border-0 bg-zinc-900/50 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-zinc-800 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all"
                    placeholder="admin@fabfit.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-lg border-0 bg-zinc-900/50 py-2.5 px-4 text-white shadow-sm ring-1 ring-inset ring-zinc-800 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-950"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-400">
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full justify-center rounded-lg bg-amber-500 px-3 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-zinc-900" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
