"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function HodDashboard() {
    const { user, token } = useAuth();
    const [stats, setStats] = useState({ studentCount: 0, facultyCount: 0, pendingRequests: 0 });

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/hod/dashboard', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => setStats(data))
                .catch(err => console.error(err));
        }
    }, [token]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">HOD Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Students</h3>
                    <p className="text-4xl font-bold text-blue-600 mt-2">{stats.studentCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm uppercase font-semibold">Total Faculty</h3>
                    <p className="text-4xl font-bold text-green-600 mt-2">{stats.facultyCount}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm uppercase font-semibold">Pending Requests</h3>
                    <p className="text-4xl font-bold text-orange-600 mt-2">{stats.pendingRequests}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <a href="/dashboard/hod/requests" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Manage Requests</a>
                    <a href="/dashboard/hod/reports" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Generate Report</a>
                </div>
            </div>

            {/* Charts would go here */}
        </div>
    );
}
