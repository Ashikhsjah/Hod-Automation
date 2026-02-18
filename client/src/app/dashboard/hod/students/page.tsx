"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Student {
    _id: string;
    name: string;
    rollNumber: string;
    year: string;
    attendance: number;
}

export default function StudentList() {
    const { token } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);

    // Sample data
    const sampleStudents = [
        { _id: '1', name: 'Alice Johnson', rollNumber: 'CSE2024001', year: 'III', attendance: 85 },
        { _id: '2', name: 'Bob Smith', rollNumber: 'CSE2024002', year: 'III', attendance: 92 },
        { _id: '3', name: 'Charlie Brown', rollNumber: 'CSE2024003', year: 'III', attendance: 76 },
    ];

    useEffect(() => {
        // Simulate fetch
        setStudents(sampleStudents);
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Student Database</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((stu) => (
                            <tr key={stu._id}>
                                <td className="px-6 py-4 font-mono text-sm">{stu.rollNumber}</td>
                                <td className="px-6 py-4 text-sm font-medium">{stu.name}</td>
                                <td className="px-6 py-4 text-sm">{stu.year}</td>
                                <td className="px-6 py-4 text-sm font-bold text-blue-600">{stu.attendance}%</td>
                                <td className="px-6 py-4 text-sm">
                                    {stu.attendance < 75 ? (
                                        <span className="text-red-500 font-bold">Low Attendance</span>
                                    ) : (
                                        <span className="text-green-500 font-bold">Good</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
