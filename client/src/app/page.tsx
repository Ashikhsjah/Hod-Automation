"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SplitLoginPage() {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'faculty' | 'hod' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRoleSelect = (role: 'student' | 'faculty' | 'hod') => {
    setSelectedRole(role);
    setError('');
    // Pre-fill for demo convenience, or clear for production
    if (role === 'hod') { setEmail('hod@college.edu'); setPassword('admin123'); }
    if (role === 'faculty') { setEmail('faculty@college.edu'); setPassword('faculty123'); }
    if (role === 'student') { setEmail('student@college.edu'); setPassword('student123'); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response. Check backend logs.");
      }

      const data = await res.json();
      if (res.ok) {
        if (data.user.role !== selectedRole) {
          setError(`Please log in as a ${selectedRole} account.`);
          return;
        }
        login(data.token, data.user);
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Server connection error');
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16 tracking-tight">
            Select Your Portal
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div
              onClick={() => handleRoleSelect('student')}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl cursor-pointer hover:bg-white/20 transition transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-blue-500 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30 group-hover:scale-110 transition">
                🎓
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Student</h2>
              <p className="text-gray-300">Access results, attendance, and learning materials.</p>
            </div>

            {/* Faculty Card */}
            <div
              onClick={() => handleRoleSelect('faculty')}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl cursor-pointer hover:bg-white/20 transition transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-purple-500 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg shadow-purple-500/30 group-hover:scale-110 transition">
                👨🏫
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Faculty</h2>
              <p className="text-gray-300">Manage attendance, marks, and resources.</p>
            </div>

            {/* HOD Card */}
            <div
              onClick={() => handleRoleSelect('hod')}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl cursor-pointer hover:bg-white/20 transition transform hover:-translate-y-2 group text-center"
            >
              <div className="bg-red-500 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg shadow-red-500/30 group-hover:scale-110 transition">
                🏛️
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">HOD / Admin</h2>
              <p className="text-gray-300">Department administration and oversight.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <a href="/public" className="text-gray-400 hover:text-white transition underline">Visit Public Website</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <button
        onClick={() => setSelectedRole(null)}
        className="absolute top-10 left-10 text-gray-400 hover:text-white flex items-center gap-2"
      >
        &larr; Back to Selection
      </button>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full flex flex-col">
        <div className={`p-8 text-center text-white ${selectedRole === 'student' ? 'bg-blue-600' :
          selectedRole === 'faculty' ? 'bg-purple-600' : 'bg-red-600'
          }`}>
          <h2 className="text-3xl font-bold capitalize">{selectedRole} Login</h2>
          <p className="opacity-90 mt-2">Enter your credentials to continue</p>
        </div>

        <div className="p-8 bg-white">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-6 text-center border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2 text-sm uppercase tracking-wide">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-4 rounded-lg font-bold text-white transition transform hover:scale-[1.02] ${selectedRole === 'student' ? 'bg-blue-600 hover:bg-blue-700' :
                selectedRole === 'faculty' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'
                }`}
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
