"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
    BookOpen,
    Calendar,
    ClipboardList,
    BarChart3,
    AlertCircle,
    Download,
    Eye,
    Edit,
    UserPlus,
    CheckCircle2,
    XCircle,
    History,
    Filter,
    ChevronRight,
    Search,
    BookCheck,
    Bell,
    Clock,
    FileWarning,
    UserX
} from 'lucide-react';

export default function AcademicsPage() {
    const { user } = useAuth();
    const isHOD = user?.role === 'hod';
    const canEdit = user?.role === 'hod' || user?.role === 'faculty';
    const [activeTab, setActiveTab] = useState('SYLLABUS');
    const [selectedSem, setSelectedSem] = useState<number | null>(null);

    // --- Mock Data ---
    const summaryStats = [
        { label: 'Total Subjects', value: 48, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'On Track', value: 32, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Behind Schedule', value: 6, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Avg. Completion', value: '68%', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const academicAlerts = [
        { title: 'Lesson Plans Pending Approval', desc: '12 subjects in 4th & 6th Sem.', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
        { title: 'CIA Marks Overdue', desc: 'Operating Systems (Sec B) - CIA 1', icon: FileWarning, color: 'text-red-500', bg: 'bg-red-50' },
        { title: 'Faculty Unassigned', desc: 'Elective IV for 8th Sem Section A', icon: UserX, color: 'text-blue-500', bg: 'bg-blue-50' },
    ];

    const semesterData = [
        { sem: 1, program: 'B.E Computer Science', subjects: 6, progress: 95, faculty: 6 },
        { sem: 2, program: 'B.E Computer Science', subjects: 7, progress: 82, faculty: 7 },
        { sem: 3, program: 'B.E Computer Science', subjects: 6, progress: 75, faculty: 6 },
        { sem: 4, program: 'B.E Computer Science', subjects: 8, progress: 55, faculty: 8 },
        { sem: 5, program: 'B.E Computer Science', subjects: 5, progress: 40, faculty: 5 },
        { sem: 6, program: 'B.E Computer Science', subjects: 7, progress: 20, faculty: 7 },
        { sem: 7, program: 'B.E Computer Science', subjects: 4, progress: 10, faculty: 4 },
        { sem: 8, program: 'B.E Computer Science', subjects: 3, progress: 5, faculty: 3 },
    ];

    const detailedSubjects = [
        { code: 'CS8391', name: 'Data Structures', faculty: 'Prof. Anitha', year: 2, section: 'A', progress: 75, status: 'On Track' },
        { code: 'CS8392', name: 'Object Oriented Programming', faculty: 'Dr. Subramani', year: 2, section: 'A', progress: 68, status: 'On Track' },
        { code: 'CS8393', name: 'Digital Logic', faculty: 'Dr. Ramesh', year: 2, section: 'A', progress: 45, status: 'Behind Schedule' },
        { code: 'CS8491', name: 'Operating Systems', faculty: 'Prof. Karthik', year: 2, section: 'B', progress: 90, status: 'Completed' },
    ];

    const lessonPlans = [
        { subject: 'Data Structures', faculty: 'Prof. Anitha', date: '2026-03-01', status: 'Pending Approval' },
        { subject: 'Operating Systems', faculty: 'Prof. Karthik', date: '2026-02-28', status: 'Approved' },
        { subject: 'Machine Learning', faculty: 'Dr. Suresh', date: '2026-03-03', status: 'Rejected' },
    ];

    const ciaMonitoring = [
        { subject: 'Data Structures', faculty: 'Prof. Anitha', cia1: 'Submitted', cia2: 'Pending', overall: 'In Progress' },
        { subject: 'Networking', faculty: 'Dr. Priya', cia1: 'Approved', cia2: 'Submitted', overall: 'Ready' },
    ];

    const updateHistory = [
        { date: '04 Mar 2026', action: 'Modified Semester 4 Syllabus', user: 'HOD' },
        { date: '03 Mar 2026', action: 'Assigned Faculty for ML Lab', user: 'HOD' },
        { date: '01 Mar 2026', action: 'Approved 15 Lesson Plans', user: 'HOD' },
    ];

    const facultyMonitoringData = [
        { name: 'Dr. V. S. Thiyagarajan', year: '2nd Year', lessonPlan: 100, attendance: 85, marks: 45, notes: 90, logbook: 75 },
        { name: 'Ms. G. Vinitha', year: '3rd Year', lessonPlan: 80, attendance: 100, marks: 100, notes: 20, logbook: 90 },
        { name: 'Ms. K. Vani Shree', year: '1st Year', lessonPlan: 30, attendance: 90, marks: 0, notes: 40, logbook: 30 },
        { name: 'Ms. S. Gayathri', year: '4th Year', lessonPlan: 100, attendance: 0, marks: 0, notes: 100, logbook: 0 },
        { name: 'Dr. Subramani V', year: '2nd Year', lessonPlan: 100, attendance: 100, marks: 100, notes: 100, logbook: 100 },
    ];

    const getProgressColor = (percent: number) => {
        if (percent >= 80) return 'bg-green-500';
        if (percent >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const [selectedYear, setSelectedYear] = useState('All Years');
    const [selectedFacultyMember, setSelectedFacultyMember] = useState('All Faculty');

    const facultyList = Array.from(new Set(facultyMonitoringData.map(f => f.name)));
    const filteredFacultyMonitoring = facultyMonitoringData.filter(f => {
        const matchesYear = selectedYear === 'All Years' || f.year === selectedYear;
        const matchesFaculty = selectedFacultyMember === 'All Faculty' || f.name === selectedFacultyMember;
        return matchesYear && matchesFaculty;
    });

    return (
        <div className="p-8 bg-gray-50 min-h-screen text-gray-800 font-sans">
            {/* Header with Dashboard Title */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Academic ERP Dashboard</h1>
                    <p className="text-gray-500 mt-1 font-medium text-sm">HOD Monitoring & Curriculum Management</p>
                </div>
                {canEdit && (
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all font-semibold text-sm">
                        <BookCheck size={18} /> Update Curriculum
                    </button>
                )}
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {summaryStats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition hover:shadow-md">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-gray-900 leading-none">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Layout Container */}
            <div className="w-full flex flex-col space-y-10">
                {/* Academic Filters */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-5 text-gray-800 font-bold border-b border-gray-100 pb-4">
                        <Filter size={18} className="text-blue-600" />
                        Academic Filters
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Department</label>
                            <div className="w-full bg-gray-100 border-gray-200 border text-sm font-bold p-2.5 rounded-xl text-gray-500 flex items-center shadow-inner cursor-not-allowed">
                                {user?.department || 'CSE'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Regulation</label>
                            <select className="w-full bg-gray-50 border-gray-200 border text-sm font-semibold p-2.5 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition">
                                <option>R2023</option>
                                <option>R2021</option>
                                <option>R2017</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Academic Year</label>
                            <select className="w-full bg-gray-50 border-gray-200 border text-sm font-semibold p-2.5 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition">
                                <option>2025–2026</option>
                                <option>2024–2025</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Semester</label>
                            <select className="w-full bg-gray-50 border-gray-200 border text-sm font-semibold p-2.5 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition">
                                <option>All Semesters</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s}>Semester {s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid for Table and Alerts */}
                <div className="grid grid-cols-1 gap-10">
                    {/* Faculty Academic Responsibilities Monitoring */}
                    <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
                            <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-3">
                                <ClipboardList className="text-blue-600" size={20} />
                                Faculty Academic Progress Tracker
                            </h2>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <select
                                    className="bg-white border border-gray-200 text-sm font-semibold p-2.5 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition w-full md:w-48 shadow-sm"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    <option>All Years</option>
                                    <option>1st Year</option>
                                    <option>2nd Year</option>
                                    <option>3rd Year</option>
                                    <option>4th Year</option>
                                </select>
                                <select
                                    className="bg-white border border-gray-200 text-sm font-semibold p-2.5 rounded-xl text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition w-full md:w-48 shadow-sm"
                                    value={selectedFacultyMember}
                                    onChange={(e) => setSelectedFacultyMember(e.target.value)}
                                >
                                    <option>All Faculty</option>
                                    {facultyList.map(name => <option key={name}>{name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left table-fixed">
                                <thead className="bg-white border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 px-5 w-44 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Faculty Details</th>
                                        <th className="p-4 px-3 w-32 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Lesson Plan</th>
                                        <th className="p-4 px-3 w-32 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Attendance</th>
                                        <th className="p-4 px-3 w-32 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Marks Upload</th>
                                        <th className="p-4 px-3 w-32 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Notes Uploaded</th>
                                        <th className="p-4 px-3 w-32 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Logbook</th>
                                        <th className="p-4 px-4 w-40 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-right">Overall Performance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredFacultyMonitoring.map((faculty, i) => {
                                        const overall = Math.round((faculty.lessonPlan + faculty.attendance + faculty.marks + faculty.notes + faculty.logbook) / 5);
                                        const overallColor = getProgressColor(overall);

                                        return (
                                            <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="p-4 px-5">
                                                    <div className="font-bold text-gray-900 text-sm">{faculty.name}</div>
                                                    <div className="text-xs text-gray-500 font-medium mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded uppercase tracking-wider">{faculty.year}</div>
                                                </td>
                                                <td className="p-4 px-3">
                                                    <div className="flex flex-col gap-1.5 w-full">
                                                        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                                                            <span>{faculty.lessonPlan}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${getProgressColor(faculty.lessonPlan)} transition-all duration-500`} style={{ width: `${faculty.lessonPlan}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 px-3">
                                                    <div className="flex flex-col gap-1.5 w-full">
                                                        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                                                            <span>{faculty.attendance}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${getProgressColor(faculty.attendance)} transition-all duration-500`} style={{ width: `${faculty.attendance}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 px-3">
                                                    <div className="flex flex-col gap-1.5 w-full">
                                                        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                                                            <span>{faculty.marks}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${getProgressColor(faculty.marks)} transition-all duration-500`} style={{ width: `${faculty.marks}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 px-3">
                                                    <div className="flex flex-col gap-1.5 w-full">
                                                        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                                                            <span>{faculty.notes}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${getProgressColor(faculty.notes)} transition-all duration-500`} style={{ width: `${faculty.notes}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 px-3">
                                                    <div className="flex flex-col gap-1.5 w-full">
                                                        <div className="flex justify-between items-center text-xs font-bold text-gray-700">
                                                            <span>{faculty.logbook}%</span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${getProgressColor(faculty.logbook)} transition-all duration-500`} style={{ width: `${faculty.logbook}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-3">
                                                        <div className="w-24 bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner">
                                                            <div className={`h-full rounded-full ${overallColor} transition-all duration-500 shadow-sm`} style={{ width: `${overall}%` }}></div>
                                                        </div>
                                                        <span className={`text-sm font-black w-10 text-right ${overall >= 80 ? 'text-green-700' : overall >= 50 ? 'text-yellow-700' : 'text-red-700'}`}>{overall}%</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Lesson Plans */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-3">
                                <ClipboardList className="text-blue-600" size={20} />
                                Pending Lesson Plans
                            </h2>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left table-auto">
                                <thead className="bg-white border-b border-gray-100 border-t">
                                    <tr>
                                        <th className="p-4 px-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Subject & Faculty</th>
                                        <th className="p-4 px-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Uploaded Date</th>
                                        <th className="p-4 px-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="p-4 px-6 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {lessonPlans.map((lp, i) => (
                                        <tr key={i} className="hover:bg-gray-50 transition">
                                            <td className="p-4 px-6">
                                                <div className="font-bold text-gray-900 text-sm">{lp.subject}</div>
                                                <div className="text-xs text-gray-500 font-medium mt-0.5">{lp.faculty}</div>
                                            </td>
                                            <td className="p-4 px-6 text-sm font-semibold text-gray-600">{lp.date}</td>
                                            <td className="p-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border tracking-widest ${lp.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                                    lp.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        'bg-orange-50 text-orange-700 border-orange-200'
                                                    }`}>
                                                    {lp.status}
                                                </span>
                                            </td>
                                            <td className="p-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition" title="View"><Eye size={16} /></button>
                                                    {isHOD && lp.status === 'Pending Approval' && (
                                                        <>
                                                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Approve"><CheckCircle2 size={16} /></button>
                                                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Reject"><XCircle size={16} /></button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Academic Alerts */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-50">
                            <h3 className="font-extrabold text-gray-900 flex items-center gap-2">
                                <Bell size={18} className="text-gray-400" /> Academic Alerts
                            </h3>
                            <span className="bg-red-100 text-red-700 text-[10px] font-black tracking-widest px-2 py-1 rounded-lg">3 NEW</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            {academicAlerts.map((alert, i) => (
                                <div key={i} className="flex-1 flex flex-col gap-3 group cursor-default p-4 border border-gray-100 rounded-xl hover:shadow-md transition bg-gray-50/50">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2.5 rounded-xl ${alert.bg} ${alert.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                            <alert.icon size={18} strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800 mb-0.5">{alert.title}</p>
                                            <p className="text-xs font-medium text-gray-500 leading-tight">{alert.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
