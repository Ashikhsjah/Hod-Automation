"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AcademicsPage() {
    const { user } = useAuth();
    const canEdit = user?.role === 'hod' || user?.role === 'faculty';
    const [activeTab, setActiveTab] = useState('SYLLABUS');

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Academics & Curriculum</h1>
                {canEdit && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
                        + Update Curriculum
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
                {['SYLLABUS', 'TIMETABLE', 'LESSON_PLAN', 'INTERNAL_ASSESSMENT'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 font-semibold text-sm tracking-wide ${activeTab === tab
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                    >
                        {tab.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[400px]">

                {activeTab === 'SYLLABUS' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Course Syllabus (2025-2026)</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <div key={sem} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                            {sem}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">Semester {sem}</p>
                                            <p className="text-sm text-gray-500">B.E Computer Science</p>
                                        </div>
                                    </div>
                                    <button className="text-blue-600 font-medium hover:underline">Download PDF</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'TIMETABLE' && (
                    <div>
                        <h2 className="text-xl font-bold mb-6">Class Timetables</h2>
                        {/* Placeholder for Timetable Grid */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-center border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border p-3">Day / Hour</th>
                                        <th className="border p-3">1</th>
                                        <th className="border p-3">2</th>
                                        <th className="border p-3">3</th>
                                        <th className="border p-3">4</th>
                                        <th className="border p-3">5</th>
                                        <th className="border p-3">6</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border p-3 font-bold bg-gray-50">Monday</td>
                                        <td className="border p-3 bg-blue-50">Maths</td>
                                        <td className="border p-3">Physics</td>
                                        <td className="border p-3">CS Lab</td>
                                        <td className="border p-3">CS Lab</td>
                                        <td className="border p-3">English</td>
                                        <td className="border p-3">Library</td>
                                    </tr>
                                    {/* More rows... */}
                                </tbody>
                            </table>
                        </div>
                        {canEdit && <p className="mt-4 text-sm text-gray-500 italic">* Click on cells to edit subjects (Host/Faculty only)</p>}
                    </div>
                )}

                {activeTab === 'LESSON_PLAN' && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Lesson Plans Status</h2>
                        <div className="space-y-4">
                            {['Data Structures', 'Operating Systems', 'Networks'].map((subject) => (
                                <div key={subject} className="border p-4 rounded-lg">
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-bold">{subject}</h3>
                                        <span className="text-green-600 font-bold">75% Completed</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <div className="mt-3 flex justify-end">
                                        {canEdit ? (
                                            <button className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">Update Progress</button>
                                        ) : (
                                            <button className="text-sm text-blue-600 hover:underline">View Detailed Plan</button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
