"use client";
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, XCircle, Clock, Search, Filter, Eye, Check, X, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Request {
    _id: string;
    title: string;
    description: string;
    type: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'VERIFIED';
    submittedBy: { name: string, role: string, department: string };
    createdAt: string;
}

export default function StudentRequests() {
    const { token } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');

    const sampleRequests: Request[] = [
        { _id: 'REQ001', title: 'Leave Application', description: 'Medical leave for 3 days due to fever.', type: 'Leave', status: 'PENDING', submittedBy: { name: 'Jane Student', role: 'student', department: 'CSE' }, createdAt: '2026-03-05T10:00:00Z' },
        { _id: 'REQ002', title: 'OD Request', description: 'Attending Hackathon at MIT Chennai.', type: 'On-Duty', status: 'VERIFIED', submittedBy: { name: 'Rahul Sharma', role: 'student', department: 'CSE' }, createdAt: '2026-03-06T14:30:00Z' },
        { _id: 'REQ005', title: 'Fee Extension', description: 'Request to extend semester fee deadline by 1 week.', type: 'Administrative', status: 'REJECTED', submittedBy: { name: 'Priya Verma', role: 'student', department: 'CSE' }, createdAt: '2026-02-28T16:45:00Z' },
    ];

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/hod/requests', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        const studentReqs = data.filter(r => r.submittedBy?.role === 'student');
                        setRequests(studentReqs.length > 0 ? studentReqs : sampleRequests);
                    } else {
                        setRequests(sampleRequests);
                    }
                })
                .catch(() => setRequests(sampleRequests));
        }
    }, [token]);

    const handleAction = async (id: string, actionStatus: 'APPROVED' | 'REJECTED') => {
        setRequests(requests.map(req => req._id === id ? { ...req, status: actionStatus } : req));
        try {
            await fetch(`http://localhost:5000/api/hod/request/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token || '' },
                body: JSON.stringify({ status: actionStatus })
            });
        } catch (err) { console.error(err); }
    };

    const filteredRequests = useMemo(() => {
        return requests.filter(req => {
            const matchesSearch = req.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'ALL' || req.status === filterStatus || (filterStatus === 'PENDING' && req.status === 'VERIFIED');
            return matchesSearch && matchesStatus;
        });
    }, [requests, searchQuery, filterStatus]);

    const StatusBadge = ({ status }: { status: string }) => {
        switch (status) {
            case 'APPROVED': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200"><CheckCircle2 size={12} /> Approved</span>;
            case 'REJECTED': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200"><XCircle size={12} /> Rejected</span>;
            case 'VERIFIED': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><Clock size={12} /> Faculty Verified</span>;
            default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200"><Clock size={12} /> Pending</span>;
        }
    };

    return (
        <div className="py-6 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/hod/requests" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Requests</h1>
                    <p className="text-gray-500 font-medium mt-1">Review leave applications and other student requests.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search student requests..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                                <th className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Request</th>
                                <th className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {filteredRequests.map((req) => (
                                <tr key={req._id}>
                                    <td className="px-6 py-5 text-sm font-bold text-gray-500">#{req._id.replace('REQ', '')}</td>
                                    <td className="px-6 py-5 font-bold text-gray-900">{req.submittedBy.name}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">{req.type}</span>
                                            <span className="font-bold text-gray-900 text-sm">{req.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center"><StatusBadge status={req.status} /></td>
                                    <td className="px-6 py-5 text-right space-x-2">
                                        {(req.status === 'PENDING' || req.status === 'VERIFIED') && (
                                            <>
                                                <button onClick={() => handleAction(req._id, 'APPROVED')} className="p-2 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition-colors"><Check size={18} /></button>
                                                <button onClick={() => handleAction(req._id, 'REJECTED')} className="p-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition-colors"><X size={18} /></button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
