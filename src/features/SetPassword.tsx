import { useState } from "react";
import config from "../config/config";

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off w-4 h-4"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
  );
}
 
function CheckItem({ met, label }: { met: boolean; label: string }) {
  return (
    <li className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? "text-green-600" : "text-gray-400"}`}>
      <span className={`flex items-center justify-center w-4 h-4 rounded-full border transition-all duration-200 ${
        met ? "border-green-500 bg-green-500 text-white" : "border-gray-300"
      }`}>
        {met && (
          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label}
    </li>
  );
}

function SetPassword() {
    const [password, setPassword] = useState("");
    const [password_confirmation, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const rules = {
        length: password.length >= 8
    };
    const allRulesMet = Object.values(rules).every(Boolean);
    const passwordsMatch = password === password_confirmation && password_confirmation !== "";
    const canSubmit = allRulesMet && passwordsMatch;

    function handleSubmit() {
        if (!canSubmit) return;
        config.post('/auth/change-password/0', {
            password: password,
            password_confirmation: password_confirmation,
        })
            .then((res) => {
                if(res.status === 200){
                    window.location.href = `/`
                }
            })
            .catch((err)=>console.log(err))
            .finally(()=>setLoading(false))
    }

    const handleLogout = async () => {
        await config.post('/auth/logout');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-2/5 bg-gray-900 flex-col justify-between p-10">
                <div>
                    {/* Logo placeholder */}
                    <div className="flex items-center gap-2 mb-16"></div>
            
                    <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                        Secure your<br />account.
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        You're setting up your password for the first time. Make sure it's something strong and memorable.
                    </p>
                </div>
        
                {/* Status cards — mirrors the design language */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-gray-800 rounded-xl px-4 py-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        <span className="text-gray-300 text-xs">At least 8 characters</span>
                    </div>
                </div>
            </div>
        
            {/* Right Panel */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
        
                {/* Header */}
                <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
                    First Time Setup
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">Set your password</h2>
                    <p className="text-gray-500 text-sm">Create a strong password to protect your account.</p>
                </div>
        
                {/* Form */}
                <div className="space-y-5">
        
                    {/* New Password */}
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-10 transition-all"
                        />
                        <button
                            tabIndex={-1}
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                    </div>
        
                    {/* Confirm Password */}
                    <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                        type={showConfirm ? "text" : "password"}
                        value={password_confirmation}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`w-full border rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-opacity-10 transition-all ${
                            password_confirmation && !passwordsMatch
                            ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                            : password_confirmation && passwordsMatch
                            ? "border-green-400 focus:border-green-400 focus:ring-green-400"
                            : "border-gray-200 focus:border-gray-900 focus:ring-gray-900"
                        }`}
                        />
                        <button
                            tabIndex={-1}
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                            <EyeIcon open={showConfirm} />
                        </button>
                    </div>
                    {password_confirmation && !passwordsMatch && (
                        <p className="mt-1.5 text-xs text-red-500 font-medium">Passwords do not match</p>
                    )}
                    {password_confirmation && passwordsMatch && (
                        <p className="mt-1.5 text-xs text-green-600 font-medium">Passwords match</p>
                    )}
                    </div>
        
                    {/* Requirements checklist */}
                    {password && (
                    <div className="bg-gray-50 rounded-xl px-4 py-4">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Requirements</p>
                        <ul className="space-y-2">
                            <CheckItem met={rules.length} label="At least 8 characters" />
                        </ul>
                    </div>
                    )}
        
                    {/* Submit */}
                    <button onClick={handleSubmit} disabled={!canSubmit || loading}
                        className={`w-full py-3 rounded-lg text-sm font-bold transition-all duration-200 ${
                            canSubmit
                            ? "bg-gray-900 text-white hover:bg-gray-700 active:scale-95"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Set Password
                    </button>
        
                    {/* Logout */}
                    <button onClick={handleLogout} className={`w-full py-3 rounded-lg text-sm font-bold transition-all duration-200 bg-gray-900 text-white hover:bg-gray-700 active:scale-95`}>
                        Logout
                    </button>
                </div>
        
                {/* <p className="mt-6 text-center text-xs text-gray-400">
                    Already have a password?{" "}
                    <a href="#" className="text-gray-700 font-semibold hover:underline">
                    Sign in
                    </a>
                </p> */}
                </div>
            </div>
        </div>
    );
}

export default SetPassword