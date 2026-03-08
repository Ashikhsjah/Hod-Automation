"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
    Users, GraduationCap, BookOpen, Clock, AlertTriangle, MessageSquare,
    CheckCircle2, XCircle, FileText, Download, Activity, FileWarning, ArrowUpRight, ArrowDownRight, MoreHorizontal, Bell
} from 'lucide-react';

export default function HodDashboard() {
    const { user, token } = useAuth();
    // Using mock data for realistic ERP visualization since backend might not have all endpoints yet
    const [stats, setStats] = useState({ studentCount: 1240, facultyCount: 48, pendingRequests: 12 });

    // Mock Data
    const overviewCards = [
        { label: 'Total Students', value: 1240, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', link: '/dashboard/hod/students' },
        { label: 'Total Faculty', value: 48, icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-50', link: '/dashboard/hod/faculty' },
        { label: 'Subjects Running', value: 36, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', link: '/dashboard/hod/academics' },
        { label: 'Classes Today', value: 24, icon: Clock, color: 'text-cyan-600', bg: 'bg-cyan-50', link: '/dashboard/hod/classes' },
        { label: 'Pending Requests', value: 12, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', link: '/dashboard/hod/requests' },
        { label: 'Active Complaints', value: 3, icon: MessageSquare, color: 'text-red-600', bg: 'bg-red-50', link: '/dashboard/hod/complaints' },
    ];

    const attendanceStats = [
        { label: 'Average Attendance', value: '86%', sub: 'Dept. average', trend: 'up', icon: Activity, link: '/dashboard/hod/reports/attendance' },
        { label: 'Students > 75%', value: '1100', sub: 'Safe zone', trend: 'up', icon: ArrowUpRight, link: '/dashboard/hod/students?attendance=safe' },
        { label: 'Students < 75%', value: '95', sub: 'Action required', trend: 'down', icon: ArrowDownRight, link: '/dashboard/hod/students?attendance=warning' },
        { label: 'Critical (< 65%)', value: '45', sub: 'Immediate warning', trend: 'down', icon: FileWarning, link: '/dashboard/hod/students?attendance=critical' },
    ];

    const liveClasses = [
        { id: 'cls1', class: '2nd Year - Sec A', subject: 'Data Structures', faculty: 'Prof. Anitha', present: 55, total: 60, percentage: 91 },
        { id: 'cls2', class: '3rd Year - Sec B', subject: 'Operating Systems', faculty: 'Prof. Karthik', present: 48, total: 55, percentage: 87 },
        { id: 'cls3', class: '4th Year - Sec A', subject: 'Machine Learning', faculty: 'Dr. Suresh', present: 50, total: 55, percentage: 90 },
    ];

    const academicProgress = [
        { id: 'sub1', subject: 'Data Structures', faculty: 'Prof. Anitha', progress: 75, status: 'On Track' },
        { id: 'sub2', subject: 'Computer Networks', faculty: 'Dr. Ramesh', progress: 60, status: 'Behind Schedule' },
        { id: 'sub3', subject: 'Cloud Computing', faculty: 'Prof. Priya', progress: 100, status: 'Completed' },
    ];

    const pendingApprovals = [
        { id: 'req1', type: 'Leave Request', by: 'Prof. Karthik', date: '05 Mar 2026', status: 'Pending', link: '/dashboard/hod/requests/leave' },
        { id: 'req2', type: 'OD Request', by: 'Dr. Subramani', date: '04 Mar 2026', status: 'Pending', link: '/dashboard/hod/requests/od' },
        { id: 'req3', type: 'Lesson Plan', by: 'Prof. Anitha', date: '03 Mar 2026', status: 'Pending', link: '/dashboard/hod/requests/lesson-plan' },
    ];

    const facultyPerformance = [
        { id: 'fac1', name: 'Prof. Anitha', subjects: 2, progress: 85, publications: 2 },
        { id: 'fac2', name: 'Dr. Suresh', subjects: 1, progress: 90, publications: 5 },
        { id: 'fac3', name: 'Dr. Ramesh', subjects: 2, progress: 65, publications: 1 },
    ];

    const recentHistry = [
        { text: 'Attendance submitted for 2nd Year A (Data Structures)', link: '/dashboard/hod/reports/attendance' },
        { text: 'Lesson plan uploaded by Prof. Karthik', link: '/dashboard/hod/requests/lesson-plan' },
        { text: 'Complaint submitted by Staff ID: ST004', link: '/dashboard/hod/complaints' },
        { text: 'Leave request approved for Dr. Priya', link: '/dashboard/hod/requests/leave' },
    ];

    return (
        <div className="p-8 md:p-10 bg-gray-50/50 min-h-screen font-sans text-gray-800">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200/60">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">HOD Automation</h1>
                    <p className="text-gray-500 mt-2 font-medium text-sm tracking-wide">Department Monitoring & Academic Management</p>
                </div>
            </div>

            {/* 1. Department Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                {overviewCards.map((card, i) => (
                    <Link href={card.link} key={i}>
                        <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 cursor-pointer h-full group">
                            <div className={`p-4 rounded-2xl ${card.bg} ${card.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                                <card.icon size={26} strokeWidth={2} />
                            </div>
                            <p className="text-3xl font-black text-gray-800 tracking-tight">{card.value}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{card.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* 2. Attendance Analytics Section */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-5">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Activity size={20} />
                        </div>
                        <h2 className="text-xl font-extrabold text-gray-800">Attendance Analytics</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        {attendanceStats.map((stat, i) => (
                            <Link href={stat.link} key={i}>
                                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300 cursor-pointer h-full group">
                                    <div className="flex justify-between items-start mb-3">
                                        <stat.icon size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                        {stat.trend === 'up' ? <ArrowUpRight size={16} className="text-green-500" /> : <ArrowDownRight size={16} className="text-red-500" />}
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">{stat.value}</h3>
                                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-2">{stat.label}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CSS Distribution Chart Placeholder */}
                    <div className="flex h-12 w-full rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '75%' }}>Above 75%</div>
                        <div className="bg-orange-400 h-full flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '15%' }}>65% - 75%</div>
                        <div className="bg-red-500 h-full flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '10%' }}>&lt;65%</div>
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mt-2 px-2">
                        <span>Safe Zone</span>
                        <span>Warning Zone</span>
                        <span>Critical Zone</span>
                    </div>
                </div>

                {/* 7. Complaints & 9. Reports Section */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
                            <MessageSquare size={18} className="text-red-600" />
                            <h2 className="text-md font-extrabold text-gray-900">Complaints Overview</h2>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <Link href="/dashboard/hod/complaints" className="text-center bg-gray-50 p-3 rounded-lg flex-1 mr-2 hover:bg-gray-100 hover:shadow-sm transition cursor-pointer">
                                <p className="text-lg font-black text-gray-800">18</p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase">Total</p>
                            </Link>
                            <Link href="/dashboard/hod/complaints?status=pending" className="text-center bg-red-50 p-3 rounded-lg flex-1 mx-1 hover:bg-red-100 hover:shadow-sm transition cursor-pointer">
                                <p className="text-lg font-black text-red-600">3</p>
                                <p className="text-[9px] font-bold text-red-400 uppercase">Pending</p>
                            </Link>
                            <Link href="/dashboard/hod/complaints?status=resolved" className="text-center bg-green-50 p-3 rounded-lg flex-1 ml-2 hover:bg-green-100 hover:shadow-sm transition cursor-pointer">
                                <p className="text-lg font-black text-green-600">15</p>
                                <p className="text-[9px] font-bold text-green-400 uppercase">Resolved</p>
                            </Link>
                        </div>
                        <Link href="/dashboard/hod/complaints" className="block text-center w-full py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition border border-blue-100 cursor-pointer">
                            View Complaints
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex-1">
                        <div className="flex items-center gap-2 mb-4 border-b border-gray-50 pb-3">
                            <FileText size={18} className="text-purple-600" />
                            <h2 className="text-md font-extrabold text-gray-900">Generate Reports</h2>
                        </div>
                        <div className="space-y-3">
                            <Link href="/dashboard/hod/reports/attendance" className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 hover:shadow-sm border border-gray-100 rounded-xl transition cursor-pointer group">
                                <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Attendance Report</span>
                                <Download size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </Link>
                            <Link href="/dashboard/hod/reports/academic" className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 hover:shadow-sm border border-gray-100 rounded-xl transition cursor-pointer group">
                                <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Academic Report</span>
                                <Download size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </Link>
                            <Link href="/dashboard/hod/reports/faculty" className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 hover:shadow-sm border border-gray-100 rounded-xl transition cursor-pointer group">
                                <span className="text-xs font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Faculty Performance</span>
                                <Download size={14} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                {/* 3. Class Monitoring Panel */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-3">
                            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg"><Clock size={18} /></div> Live Class Status
                        </h2>
                        <Link href="/dashboard/hod/classes" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                            View Full Monitoring &rarr;
                        </Link>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Class / Subject</th>
                                <th className="p-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-center">Attendance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {liveClasses.map((cls, i) => (
                                <tr key={i} className="hover:bg-blue-50/40 transition-colors cursor-pointer group" onClick={() => window.location.href = `/dashboard/hod/classes/${cls.id}`}>
                                    <td className="p-4 px-6">
                                        <div className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{cls.class}</div>
                                        <div className="text-xs font-medium text-gray-500">{cls.subject} <span className="opacity-70">({cls.faculty})</span></div>
                                    </td>
                                    <td className="p-4 px-6 text-center">
                                        <div className="flex items-center gap-3 justify-center">
                                            <span className="text-sm font-bold text-gray-800">{cls.present}/{cls.total}</span>
                                            <span className="text-xs font-bold text-green-700 bg-green-100/80 px-2.5 py-1 rounded-md">{cls.percentage}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 4. Academic Progress Tracker */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-white">
                        <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-3">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BookOpen size={18} /></div> Syllabus Progress
                        </h2>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="p-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-center">Progress</th>
                                <th className="p-4 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {academicProgress.map((prog, i) => (
                                <tr key={i} className="hover:bg-blue-50/40 transition-colors cursor-pointer group" onClick={() => window.location.href = `/dashboard/hod/academics/subject/${prog.id}`}>
                                    <td className="p-4 px-6">
                                        <div className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{prog.subject}</div>
                                        <div className="text-xs font-medium text-gray-500">{prog.faculty}</div>
                                    </td>
                                    <td className="p-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${prog.progress < 70 ? 'bg-orange-500' : 'bg-blue-600'}`} style={{ width: `${prog.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-700">{prog.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <span className={`text-xs font-bold uppercase ${prog.status === 'Completed' ? 'text-green-600' :
                                            prog.status === 'On Track' ? 'text-blue-600' : 'text-orange-600'
                                            }`}>{prog.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 5. Pending Approvals Panel */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-white">
                        <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-3">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><AlertTriangle size={18} /></div> Pending Approvals
                        </h2>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="p-5 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Request</th>
                                <th className="p-5 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Submitted By</th>
                                <th className="p-5 px-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingApprovals.map((req, i) => (
                                <tr key={i} className="hover:bg-blue-50/40 transition-colors cursor-pointer group" onClick={() => window.location.href = req.link}>
                                    <td className="p-5 px-6">
                                        <div className="font-bold text-gray-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{req.type}</div>
                                        <div className="text-xs font-medium text-gray-500">{req.date}</div>
                                    </td>
                                    <td className="p-5 px-6 text-sm font-semibold text-gray-700">{req.by}</td>
                                    <td className="p-5 px-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                className="text-xs font-bold text-blue-700 bg-blue-50/80 border border-blue-200 hover:bg-blue-100 px-4 py-1.5 rounded-lg transition-all cursor-pointer hover:shadow-sm"
                                                onClick={(e) => { e.stopPropagation(); window.location.href = req.link; }}
                                            >View</button>
                                            <button
                                                className="text-xs font-bold text-white bg-green-500 hover:bg-green-600 px-4 py-1.5 rounded-lg transition-all cursor-pointer shadow-md shadow-green-500/20"
                                                onClick={(e) => { e.stopPropagation(); alert(`Approved request ${req.id}`); }}
                                            >Approve</button>
                                            <button
                                                className="text-xs font-bold text-gray-600 bg-gray-100 hover:bg-red-50 hover:text-red-600 border border-gray-200 hover:border-red-200 px-4 py-1.5 rounded-lg transition-all cursor-pointer hover:shadow-sm"
                                                onClick={(e) => { e.stopPropagation(); alert(`Rejected request ${req.id}`); }}
                                            >Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 6. Faculty Performance Snapshot & 8. Recent Activities */}
                <div className="flex flex-col gap-8">
                    {/* Faculty Performance Snapshot */}
                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 bg-white">
                            <h2 className="text-base font-extrabold text-gray-800 flex items-center gap-3">
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><GraduationCap size={16} /></div> Faculty Performance
                            </h2>
                        </div>
                        <div className="p-2 space-y-1">
                            {facultyPerformance.map((fac, i) => (
                                <Link href={`/dashboard/hod/faculty/${fac.id}`} key={i}>
                                    <div className="flex justify-between items-center p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm mb-1.5 group-hover:text-blue-600 transition-colors">{fac.name}</p>
                                            <div className="flex gap-2 text-xs">
                                                <span className="font-bold text-gray-600 bg-gray-100/80 px-2 py-0.5 rounded-md">{fac.subjects} Subjects</span>
                                                <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">{fac.publications} Pubs</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Syllabus</p>
                                            <p className={`text-base font-black ${fac.progress > 80 ? 'text-green-600' : 'text-orange-500'}`}>{fac.progress}%</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-extrabold text-gray-900 flex items-center gap-2 text-sm">
                                <Bell size={16} className="text-gray-400" /> Activity Feed
                            </h3>
                        </div>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:to-transparent">
                            {recentHistry.map((item, i) => (
                                <Link href={item.link} key={i}>
                                    <div className="relative flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer group">
                                        <div className="w-4 h-4 rounded-full bg-blue-100 border-2 border-white shadow-sm mt-0.5 z-10 shrink-0 group-hover:bg-blue-400 transition-colors"></div>
                                        <p className="text-xs font-medium text-gray-600 group-hover:text-blue-700 transition-colors">{item.text}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
