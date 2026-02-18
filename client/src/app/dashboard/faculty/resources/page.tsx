"use client";
import React, { useState } from 'react';

export default function FacultyUploads() {
    const [activeTab, setActiveTab] = useState('NOTE'); // NOTE, ASSIGNMENT

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Resource Management</h1>

            <div className="flex gap-4 border-b mb-6">
                {['NOTE', 'ASSIGNMENT', 'LAB_MANUAL'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 px-4 font-medium transition ${activeTab === tab
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                    >
                        {tab.replace('_', ' ')}s
                    </button>
                ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold mb-4">Upload New {activeTab}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input type="text" className="w-full border p-2 rounded" placeholder="e.g. Unit 1 Notes" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Code</label>
                        <input type="text" className="w-full border p-2 rounded" placeholder="e.g. CS8602" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Year / Sem</label>
                        <div className="flex gap-2">
                            <select className="border p-2 rounded w-1/2">
                                <option>I Year</option>
                                <option>II Year</option>
                                <option>III Year</option>
                                <option>IV Year</option>
                            </select>
                            <select className="border p-2 rounded w-1/2">
                                <option>Sem 1</option>
                                <option>Sem 2</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">File URL (GDrive/Cloudinary)</label>
                        <input type="text" className="w-full border p-2 rounded" placeholder="https://..." />
                    </div>
                </div>
                <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700">
                    Upload Resource
                </button>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Recent Uploads</h3>
                <div className="bg-white border rounded-lg divide-y">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50">
                            <div>
                                <p className="font-semibold text-gray-800">Unit {i} Question Bank</p>
                                <p className="text-sm text-gray-500">CS8602 - Compiler Design</p>
                            </div>
                            <button className="text-blue-600 text-sm font-medium hover:underline">View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
