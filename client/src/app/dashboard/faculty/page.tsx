"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function FacultyDashboard() {
    const { token } = useAuth();
    const [stats, setStats] = useState({ pendingVerifications: 0, myClasses: 0 });

    useEffect(() => {
        // Fetch stats if available, for now just mocked or partial
        if (token) {
            fetch('http://localhost:5000/api/faculty/requests/pending', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => setStats(prev => ({ ...prev, pendingVerifications: data.length })))
                .catch(err => console.error(err));
        }
    }, [token]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Faculty Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm uppercase font-semibold">Pending Verifications</h3>
                    <p className="text-4xl font-bold text-orange-600 mt-2">{stats.pendingVerifications}</p>
                    <a href="/dashboard/faculty/requests" className="text-blue-600 text-sm mt-2 inline-block">Review Requests &rarr;</a>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm uppercase font-semibold">My Classes</h3>
                    <p className="text-4xl font-bold text-blue-600 mt-2">Active</p>
                    {/* Placeholder for class count */}
                </div>
            </div>

            <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    Mark Attendance
                </button>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
                    Upload Internal Marks
                </button>
                <button className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
                    Update Syllabus
                </button>
            </div>
        </div>
    );
}
