import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    if (pwd.length === 0) return '';
    if (pwd.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter.';
    if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter.';
    if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number.';
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pwd)) return 'Password must contain at least one special character.';
    return '';
  };

  useEffect(() => {
    setPasswordError(validatePassword(password));
  }, [password]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (passwordError) return;
    
    setErrorMsg('');
    setLoading(true);
    const { error } = await signup(email, password);
    setLoading(false);

    if (error) {
      setErrorMsg(error);
    } else {
      setSuccessMsg("Registration successful! Redirecting to dashboard...");
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-600/20 blur-[100px] pointer-events-none" />
      
      <div className="glass-card p-8 sm:p-12 rounded-2xl w-full max-w-md z-10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.15)] hover:border-indigo-500/30">
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Create Account</h2>
        <p className="text-slate-400 text-center mb-8">Join DataSage AI</p>

        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg mb-6 text-sm">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <input 
              type="email" 
              required
              autoComplete="email"
              className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-100 placeholder-slate-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <input 
              type="password" 
              required
              autoComplete="new-password"
              className="w-full bg-slate-900/50 border border-slate-700 hover:border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-100 placeholder-slate-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && password.length > 0 && (
              <p className="text-red-400 text-xs mt-2 transition-all">{passwordError}</p>
            )}
          </div>
          <button 
            type="submit" 
            disabled={loading || !!passwordError || password.length === 0}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg transition-all mt-6 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
