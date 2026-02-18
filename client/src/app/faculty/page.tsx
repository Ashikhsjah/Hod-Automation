"use client";
import React from 'react';

export default function FacultyListPublic() {
    const faculty = [
        { name: "Dr. Head of Dept", designation: "Professor & HOD", area: "Data Science" },
        { name: "Prof. John Doe", designation: "Assistant Professor", area: "AI & ML" },
        { name: "Prof. Jane Smith", designation: "Associate Professor", area: "Cyber Security" },
    ];

    return (
        <div>
            {/* Simple wrapper if used directly, or layout wraps it */}
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-bold mb-10 text-center">Our Faculty</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    {faculty.map((f, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-gray-500">
                                {f.name[0]}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{f.name}</h3>
                            <p className="text-blue-600 font-medium">{f.designation}</p>
                            <p className="text-gray-500 text-sm mt-2">{f.area}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
