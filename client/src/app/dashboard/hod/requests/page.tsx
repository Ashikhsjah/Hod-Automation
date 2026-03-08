"use client";
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, XCircle, Clock, Search, Filter, Eye, Check, X, FileText } from 'lucide-react';

interface Request {
    _id: string;
    title: string;
    description: string;
    type: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'VERIFIED';
    submittedBy: { name: string, role: string, department: string };
    createdAt: string;
}

export default function HodRequests() {
    const { token } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [filterType, setFilterType] = useState('ALL');

    const sampleRequests: Request[] = [
        { _id: 'REQ001', title: 'Leave Application', description: 'Medical leave for 3 days due to fever.', type: 'Leave', status: 'PENDING', submittedBy: { name: 'Jane Student', role: 'student', department: 'CSE' }, createdAt: '2026-03-05T10:00:00Z' },
        { _id: 'REQ002', title: 'OD Request', description: 'Attending Hackathon at MIT Chennai.', type: 'On-Duty', status: 'VERIFIED', submittedBy: { name: 'Rahul Sharma', role: 'student', department: 'CSE' }, createdAt: '2026-03-06T14:30:00Z' },
        { _id: 'REQ003', title: 'Equipment Purchase', description: 'Request for 5 new Raspberry Pi kits for IoT Lab.', type: 'Procurement', status: 'PENDING', submittedBy: { name: 'Prof. John Doe', role: 'faculty', department: 'CSE' }, createdAt: '2026-03-07T09:15:00Z' },
        { _id: 'REQ004', title: 'Seminar Hall Booking', description: 'Need Main Seminar Hall for Guest Lecture on AI.', type: 'Facility', status: 'APPROVED', submittedBy: { name: 'Dr. V. S. Thiyagarajan', role: 'faculty', department: 'CSE' }, createdAt: '2026-03-01T11:20:00Z' },
        { _id: 'REQ005', title: 'Fee Extension', description: 'Request to extend semester fee deadline by 1 week.', type: 'Administrative', status: 'REJECTED', submittedBy: { name: 'Priya Verma', role: 'student', department: 'CSE' }, createdAt: '2026-02-28T16:45:00Z' },
    ];

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/hod/requests', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => {
                    // Fallback to sample data if backend gives minimal mock data
                    if (!data || data.length <= 2) {
                        setRequests(sampleRequests);
                    } else {
                        setRequests(data);
                    }
                })
                .catch(err => {
                    console.error(err);
                    setRequests(sampleRequests);
                });
        }
    }, [token]);

    const handleAction = async (id: string, actionStatus: 'APPROVED' | 'REJECTED') => {
        // Optimistic UI update for prototyping
        setRequests(requests.map(req => req._id === id ? { ...req, status: actionStatus } : req));

        try {
            await fetch(`http://localhost:5000/api/hod/request/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify({ status: actionStatus })
            });
        } catch (err) {
            console.error(err);
        }
    };

    const filteredRequests = useMemo(() => {
        return requests.filter(req => {
            const matchesSearch = req.submittedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = filterStatus === 'ALL' || req.status === filterStatus || (filterStatus === 'PENDING' && req.status === 'VERIFIED');
            const matchesType = filterType === 'ALL' || req.type === filterType;
            return matchesSearch && matchesStatus && matchesType;
        });
    }, [requests, searchQuery, filterStatus, filterType]);

    // Summary Stats
    const totalReqs = requests.length;
    const pendingReqs = requests.filter(r => r.status === 'PENDING' || r.status === 'VERIFIED').length;
    const approvedReqs = requests.filter(r => r.status === 'APPROVED').length;
    const rejectedReqs = requests.filter(r => r.status === 'REJECTED').length;

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
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Pending Approvals</h1>
                <p className="text-gray-500 font-medium mt-1">
                    Review and manage administrative, academic, and facility requests submitted by faculty and students.
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Requests</p>
                        <p className="text-3xl font-black text-slate-800">{totalReqs}</p>
                    </div>
                    <div className="w-12 h-12 bg-slate-50 text-slate-500 rounded-full flex items-center justify-center"><FileText size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Pending Review</p>
                        <p className="text-3xl font-black text-blue-700">{pendingReqs}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><Clock size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-1">Approved</p>
                        <p className="text-3xl font-black text-green-700">{approvedReqs}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center"><CheckCircle2 size={24} /></div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-1">Rejected</p>
                        <p className="text-3xl font-black text-red-700">{rejectedReqs}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center"><XCircle size={24} /></div>
                </div>
            </div>

            {/* Filters and Table Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Toolbar */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative max-w-md w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by ID, Name or Title..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                className="bg-transparent text-sm text-gray-700 font-medium outline-none cursor-pointer"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="ALL">All Status</option>
                                <option value="PENDING">Pending</option>
                                <option value="APPROVED">Approved</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1.5">
                            <select
                                className="bg-transparent text-sm text-gray-700 font-medium outline-none cursor-pointer min-w-[100px]"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="ALL">All Types</option>
                                <option value="Leave">Leave</option>
                                <option value="On-Duty">On-Duty</option>
                                <option value="Procurement">Procurement</option>
                                <option value="Facility">Facility</option>
                                <option value="Administrative">Administrative</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-24">Req ID</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-48">Submitted By</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Request Details</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-32">Date</th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest w-32">Status</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-widest w-64">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {filteredRequests.map((req) => (
                                <tr key={req._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-500">
                                        #{req._id.replace('REQ', '')}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="font-bold text-gray-900">{req.submittedBy?.name || 'Unknown'}</div>
                                        <div className="text-xs font-semibold text-gray-500 mt-0.5 capitalize flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${req.submittedBy?.role === 'student' ? 'bg-orange-400' : 'bg-purple-400'}`}></span>
                                            {req.submittedBy?.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold uppercase tracking-wider">{req.type}</span>
                                            <span className="font-bold text-gray-900 text-sm">{req.title}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate max-w-[300px] lg:max-w-md">{req.description}</p>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-600">
                                        {new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center">
                                        <StatusBadge status={req.status} />
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right space-x-2">
                                        <button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-50 hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors border border-gray-200" title="View Details">
                                            <Eye size={18} />
                                        </button>
                                        {(req.status === 'PENDING' || req.status === 'VERIFIED') && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(req._id, 'APPROVED')}
                                                    className="inline-flex items-center gap-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-bold transition-colors border border-green-200"
                                                >
                                                    <Check size={16} /> Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(req._id, 'REJECTED')}
                                                    className="inline-flex items-center gap-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-bold transition-colors border border-red-200"
                                                >
                                                    <X size={16} /> Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {filteredRequests.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <FileText size={48} className="mb-4 opacity-50" />
                                            <p className="text-lg font-bold text-gray-600">No requests found</p>
                                            <p className="text-sm">Try adjusting your search or filters.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
