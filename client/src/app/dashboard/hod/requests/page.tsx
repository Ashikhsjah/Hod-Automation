"use client";
import Link from 'next/link';
import { Users, GraduationCap, ArrowRight, ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function RequestManagementDashboard() {
    const { token } = useAuth();
    
    // Mocked counts for demonstration, matching the ERP style
    const [facultyPendingCount, setFacultyPendingCount] = useState(5);
    const [studentPendingCount, setStudentPendingCount] = useState(12);
    const [facultyTotal, setFacultyTotal] = useState(24);
    const [studentTotal, setStudentTotal] = useState(86);

    return (
        <div className="max-w-5xl mx-auto pb-12 pt-4">
            {/* Header section matching ERP style */}
            <div className="mb-10 pb-6 border-b border-gray-100">
                <h1 className="text-3xl font-extrabold mb-2 text-gray-900 flex items-center gap-3">
                    <ClipboardCheck size={32} className="text-blue-600 bg-blue-50 p-1.5 rounded-lg" />
                    Request Management
                </h1>
                <p className="text-gray-500 font-medium tracking-wide">Review and manage administrative, academic, and facility requests submitted by faculty and students.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Student Requests Card */}
                <Link href="/dashboard/hod/student-requests" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                        
                        {/* Interactive Background Gradient */}
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:-rotate-12">
                            <Users size={120} strokeWidth={1.5} />
                        </div>
                        
                        {/* Header area */}
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <Users size={32} strokeWidth={2.5} />
                            </div>
                            {studentPendingCount > 0 && (
                                <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    {studentPendingCount} Pending
                                </span>
                            )}
                            {studentPendingCount === 0 && (
                                <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <CheckCircle2 size={14} /> All Clear
                                </span>
                            )}
                        </div>

                        {/* Title and Description */}
                        <div className="mb-8 relative z-10">
                            <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">Student Requests</h2>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Review and manage leave requests, OD requests, and academic requests submitted by students.
                            </p>
                        </div>

                        {/* Footer Data & Button */}
                        <div className="mt-auto border-t border-gray-100 pt-6 flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Records</p>
                                <p className="text-2xl font-black text-gray-800">{studentTotal} <span className="text-sm font-medium text-gray-500 uppercase">Requests</span></p>
                            </div>
                            <button className="flex items-center gap-2 bg-gray-50 hover:bg-blue-50 text-blue-700 px-6 py-3 rounded-xl font-bold text-sm transition-colors border border-gray-100 group-hover:border-blue-200 shadow-sm group-hover:shadow-md">
                                View Requests <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </Link>

                {/* 2. Faculty Requests Card */}
                <Link href="/dashboard/hod/faculty-requests" className="group">
                    <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                        
                        {/* Interactive Background Gradient */}
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:-rotate-12">
                            <GraduationCap size={120} strokeWidth={1.5} />
                        </div>
                        
                        {/* Header area */}
                        <div className="flex items-start justify-between mb-8 relative z-10">
                            <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <GraduationCap size={32} strokeWidth={2.5} />
                            </div>
                            {facultyPendingCount > 0 && (
                                <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm animate-pulse">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                    {facultyPendingCount} Pending
                                </span>
                            )}
                            {facultyPendingCount === 0 && (
                                <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <CheckCircle2 size={14} /> All Clear
                                </span>
                            )}
                        </div>

                        {/* Title and Description */}
                        <div className="mb-8 relative z-10">
                            <h2 className="text-2xl font-black text-gray-800 tracking-tight mb-2 group-hover:text-purple-600 transition-colors">Faculty Requests</h2>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                Review and manage equipment requests, procurement requests, and administrative requests submitted by faculty members.
                            </p>
                        </div>

                        {/* Footer Data & Button */}
                        <div className="mt-auto border-t border-gray-100 pt-6 flex items-center justify-between relative z-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Records</p>
                                <p className="text-2xl font-black text-gray-800">{facultyTotal} <span className="text-sm font-medium text-gray-500 uppercase">Requests</span></p>
                            </div>
                            <button className="flex items-center gap-2 bg-gray-50 hover:bg-purple-50 text-purple-700 px-6 py-3 rounded-xl font-bold text-sm transition-colors border border-gray-100 group-hover:border-purple-200 shadow-sm group-hover:shadow-md">
                                View Requests <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
