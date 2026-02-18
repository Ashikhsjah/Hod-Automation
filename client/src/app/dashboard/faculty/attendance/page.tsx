"use client";
import { useState } from 'react';

export default function FacultyAttendance() {
    const [date, setDate] = useState('');
    const [students, setStudents] = useState([
        { id: '1', name: 'Alice', status: 'Present' },
        { id: '2', name: 'Bob', status: 'Present' },
        { id: '3', name: 'Charlie', status: 'Absent' },
    ]);

    const toggleStatus = (id: string) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Present' ? 'Absent' : 'Present' } : s));
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>

            <div className="mb-6 flex gap-4 items-center bg-white p-4 rounded shadow">
                <label className="font-semibold">Select Date:</label>
                <input type="date" className="border p-2 rounded" value={date} onChange={e => setDate(e.target.value)} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded ml-auto">Submit Attendance</button>
            </div>

            <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-3">Student Name</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => (
                            <tr key={s.id} className="border-b">
                                <td className="p-3">{s.name}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${s.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {s.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => toggleStatus(s.id)}
                                        className="text-blue-600 font-bold hover:underline"
                                    >
                                        Toggle
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
