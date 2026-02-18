"use client";

export default function FacultyProfile() {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">
                    JD
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Prof. John Doe</h1>
                    <p className="text-gray-500 text-lg">Assistant Professor, Department of CSE</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        Faculty ID: FAC1023
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Academic Information</h2>
                    <ul className="space-y-3">
                        <li className="flex justify-between">
                            <span className="text-gray-600">Qualification:</span>
                            <span className="font-semibold text-gray-900">M.Tech, Ph.D. (Pursuing)</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Specialization:</span>
                            <span className="font-semibold text-gray-900">Artificial Intelligence</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Experience:</span>
                            <span className="font-semibold text-gray-900">8 Years</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">Current Load</h2>
                    <ul className="space-y-3">
                        <li className="flex justify-between">
                            <span className="text-gray-600">Class In-charge:</span>
                            <span className="font-semibold text-gray-900">III Year CSE - A</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Subjects Handled:</span>
                            <span className="font-semibold text-gray-900">3</span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Publication Target:</span>
                            <span className="font-semibold text-red-600">2 Pending</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t">
                <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
