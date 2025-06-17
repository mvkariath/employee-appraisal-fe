import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px] opacity-10 z-0" />

      {/* Angled gradient overlay */}
      <div className="absolute -top-1/3 -left-1/3 w-[150%] h-[150%] bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 transform rotate-12 blur-3xl z-0" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-8">
          {/* Branding */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-md">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Employee Appraisal Portal</h1>
            <p className="text-slate-300 text-sm">Sign in to access your performance dashboard</p>
          </div>

          <LoginForm />

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-400">
              Need help accessing your account?{" "}
              <button className="text-blue-400 hover:text-blue-200 font-medium underline">
                Contact HR Support
              </button>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-500">© 2025 Employee Appraisal Management System</p>
          </div>
        </div>
      </div>
    </div>
  );
}
