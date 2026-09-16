'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit } from 'lucide-react';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-border">
        <div className="flex flex-col items-center">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-center text-3xl font-extrabold font-poppins text-text-dark">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            Start analyzing resumes with AI today
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-text-dark">Company Name</label>
              <Input
                required
                className="mt-1"
                placeholder="Acme Inc."
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-dark">Full Name</label>
              <Input
                required
                className="mt-1"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-dark">Work Email</label>
              <Input
                type="email"
                required
                className="mt-1"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-dark">Password</label>
              <Input
                type="password"
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-text-dark">Confirm Password</label>
              <Input
                type="password"
                required
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full h-11 text-base shadow-md shadow-blue-500/20" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-sm text-text-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
