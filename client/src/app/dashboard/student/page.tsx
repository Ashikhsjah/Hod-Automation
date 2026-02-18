"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function StudentDashboard() {
    const { token } = useAuth();
    const [data, setData] = useState({ attendance: 0, marks: [] });

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/student/stats', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(d => setData(d))
                .catch(err => console.error(err));
        }
    }, [token]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm uppercase font-semibold">Attendance</h3>
                    <div className="flex items-end gap-2 mt-2">
                        <span className="text-5xl font-bold text-blue-600">{Math.round(data.attendance)}%</span>
                        <span className="text-gray-400 mb-1">Overall</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Internal Marks</h3>
                    {data.marks.length === 0 ? <p className="text-gray-500">No marks available.</p> : (
                        <ul className="space-y-2">
                            {data.marks.map((m: any, idx) => (
                                <li key={idx} className="flex justify-between border-b pb-2">
                                    <span>{m.subject} <span className="text-xs text-gray-500">({m.examType})</span></span>
                                    <span className="font-bold">{m.marks}/{m.totalMarks}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4">Requests</h3>
                    <a href="/dashboard/student/apply" className="block w-full text-center py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-semibold mb-2">
                        Apply for Leave / OD
                    </a>
                </div>
            </div>
        </div>
    );
}
