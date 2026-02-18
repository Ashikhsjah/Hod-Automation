"use client";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    if (!user) return null;

    const links = {
        hod: [
            { name: 'Dashboard', href: '/dashboard/hod' },
            { name: 'Academics', href: '/dashboard/academics' }, // New
            { name: 'Requests', href: '/dashboard/hod/requests' },
            { name: 'Circulars', href: '/dashboard/hod/circulars' },
            { name: 'Faculty', href: '/dashboard/hod/faculty' },
            { name: 'Students', href: '/dashboard/hod/students' },
            { name: 'Complaints', href: '/dashboard/hod/complaints' },
            { name: 'Reports', href: '/dashboard/hod/reports' },
        ],
        faculty: [
            { name: 'Dashboard', href: '/dashboard/faculty' },
            { name: 'Academics', href: '/dashboard/academics' }, // New
            { name: 'Attendance', href: '/dashboard/faculty/attendance' },
            { name: 'Resources', href: '/dashboard/faculty/resources' },
            { name: 'Complaints', href: '/dashboard/complaints' },
            { name: 'Verify Requests', href: '/dashboard/faculty/requests' },
            { name: 'My Profile', href: '/dashboard/faculty/profile' },
        ],
        student: [
            { name: 'Dashboard', href: '/dashboard/student' },
            { name: 'Academics', href: '/dashboard/academics' }, // New
            { name: 'Notices', href: '/dashboard/student/circulars' },
            { name: 'My Attendance', href: '/dashboard/student/attendance' },
            { name: 'Apply Leave/OD', href: '/dashboard/student/apply' },
            { name: 'Complaints', href: '/dashboard/complaints' },
            { name: 'Results', href: '/dashboard/student/results' },
        ]
    };

    const roleLinks = links[user.role] || [];

    return (
        <aside className="w-64 bg-gray-900 text-gray-300 h-screen fixed top-0 left-0 flex flex-col shadow-lg z-50">
            <div className="p-6 text-xl font-bold text-white border-b border-gray-800">
                <span>HOD System</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {roleLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg transition-colors ${pathname === link.href
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <div className="mb-4 px-4">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role} - {user.department}</p>
                </div>
                <button
                    onClick={logout}
                    className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded transition-colors"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
}
