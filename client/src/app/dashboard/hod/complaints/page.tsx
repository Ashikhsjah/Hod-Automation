"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Complaint {
    _id: string;
    title: string;
    location: string;
    priority: string;
    status: string;
    category: string;
    description: string;
    submittedBy: { name: string, role: string };
    createdAt: string;
}

export default function HODComplaints() {
    const { token } = useAuth();
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        if (token) fetchComplaints();
    }, [token]);

    const fetchComplaints = () => {
        fetch('http://localhost:5000/api/portal/complaints', {
            headers: { 'x-auth-token': token || '' }
        })
            .then(res => res.json())
            .then(data => setComplaints(data))
            .catch(err => console.error(err));
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/portal/complaint/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) fetchComplaints();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Complaint Management</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {complaints.map((c) => (
                            <tr key={c._id}>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{c.title}</div>
                                    <div className="text-xs text-gray-500">{c.category}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{c.location}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.priority === 'HIGH' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {c.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
                                            c.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {c.submittedBy?.name} <span className="text-xs">({c.submittedBy?.role})</span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium space-x-2">
                                    {c.status === 'PENDING' && (
                                        <button
                                            onClick={() => updateStatus(c._id, 'IN_PROGRESS')}
                                            className="text-blue-600 hover:text-blue-900 font-bold"
                                        >
                                            Assign
                                        </button>
                                    )}
                                    {c.status !== 'RESOLVED' && (
                                        <button
                                            onClick={() => updateStatus(c._id, 'RESOLVED')}
                                            className="text-green-600 hover:text-green-900 font-bold"
                                        >
                                            Resolve
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {complaints.length === 0 && (
                    <div className="p-6 text-center text-gray-500">No complaints found.</div>
                )}
            </div>
        </div>
    );
}
