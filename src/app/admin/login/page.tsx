'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman bawaan browser
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.push('/admin');
      }
    } catch (err: any) {
      console.error('Login error detail:', err.code, err.message);

      // Menampilkan pesan spesifik berdasarkan error dari Firebase
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Failed to sign in. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-bg-card rounded-2xl border border-border-main shadow-xl">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-text-main">Admin Login</h2>
          <p className="text-text-muted text-sm mt-1">Sign in to manage your portfolio content</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-main mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 bg-bg-main border border-border-main rounded-lg text-text-main placeholder:text-text-muted/60 focus:outline-none focus:border-primary transition"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition disabled:opacity-50 cursor-pointer">
            {loading ? 'Processing...' : 'Sign In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
