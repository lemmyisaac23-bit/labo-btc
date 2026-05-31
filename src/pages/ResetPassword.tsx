import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Footer } from '@/components/Footer';
import { supabase } from '@/lib/supabase';
import { Lock, Eye, EyeOff } from 'lucide-react';

/**
 * Supabase sends users here after "Reset password" from email.
 * Add this exact URL to Supabase → Authentication → URL Configuration → Redirect URLs:
 *   https://<your-production-domain>/reset-password
 *   http://localhost:8080/reset-password   (or your dev port)
 */
function urlLooksLikeRecovery(): boolean {
  const h = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash.slice(1) : '';
  const q = (typeof window !== 'undefined' && window.location.search) ? window.location.search.slice(1) : '';
  const combined = `${h}&${q}`;
  return combined.includes('type=recovery') || combined.includes('type%3Drecovery');
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(true);
  const [invalid, setInvalid] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resolvedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const markReady = () => {
      if (cancelled || resolvedRef.current) return;
      resolvedRef.current = true;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      setReady(true);
      setInvalid(false);
      setChecking(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && event === 'PASSWORD_RECOVERY') {
        markReady();
      }
    });

    void supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled) return;
      if (session && urlLooksLikeRecovery()) {
        markReady();
        return;
      }
      timer = setTimeout(() => {
        void supabase.auth.getSession().then(({ data: { session: s2 } }) => {
          if (cancelled || resolvedRef.current) return;
          if (s2) markReady();
          else {
            setChecking(false);
            setInvalid(true);
          }
        });
      }, 1800);
    });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      await supabase.auth.signOut();
      navigate('/login', { replace: true, state: { passwordReset: true } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Could not update password.');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-600">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#2563eb] border-t-transparent" />
        <p className="mt-4 text-sm">Verifying reset link…</p>
      </div>
    );
  }

  if (invalid && !ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center">
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Link invalid or expired</h1>
            <p className="text-sm text-gray-500 mb-6">
              Request a new reset link from the sign-in page. If you already reset your password, sign in with your new
              password.
            </p>
            <Button asChild className="app-btn-primary hover:brightness-110">
              <Link to="/forgot-password">Request new link</Link>
            </Button>
            <div className="mt-4">
              <Link to="/login" className="text-sm text-[#2563eb] hover:underline">
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="landing-hero-banner w-full py-5 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Set new password</h1>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 sm:p-8">
          {error && (
            <div className="mb-4 rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-600">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-600">New password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type={show ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 pl-10 pr-10 text-white border-gray-200"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShow((s) => !s)}
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label className="text-gray-600">Confirm password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type={show ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="bg-gray-50 pl-10 text-white border-gray-200"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full app-btn-primary hover:brightness-110 font-semibold"
            >
              {loading ? 'Updating…' : 'Update password'}
            </Button>
          </form>
          <Link to="/login" className="mt-6 block text-center text-sm text-[#2563eb] hover:underline">
            Cancel and sign in
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
