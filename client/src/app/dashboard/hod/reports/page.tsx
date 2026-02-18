"use client";

export default function Reports() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Department Reports</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h2 className="text-lg font-bold mb-2">Attendance Report</h2>
                    <p className="text-gray-500 text-sm mb-4">Monthly attendance analysis for all years.</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download PDF</button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h2 className="text-lg font-bold mb-2">Faculty Performance</h2>
                    <p className="text-gray-500 text-sm mb-4">Research output and student feedback scores.</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Download Excel</button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h2 className="text-lg font-bold mb-2">Placement Stats</h2>
                    <p className="text-gray-500 text-sm mb-4">Current placement status 2024-2025.</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">View Analytics</button>
                </div>
            </div>
        </div>
    );
}
