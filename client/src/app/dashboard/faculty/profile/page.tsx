"use client";

export default function FacultyProfile() {
    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden p-10">
            <div className="flex items-center gap-8 mb-10 pb-8 border-b border-gray-100">
                <div className="w-28 h-28 bg-gradient-to-br from-indigo-700 to-blue-600 rounded-full flex items-center justify-center text-4xl font-extrabold text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-50">
                    VT
                </div>
                <div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">Dr. V. S. Thiyagarajan</h1>
                    <p className="text-gray-600 text-lg font-medium mt-1">Professor, Department of Computer Science and Engineering</p>
                    <span className="inline-flex items-center mt-3 px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
                        Faculty ID: FAC1001
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <h2 className="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="w-2 h-6 bg-blue-600 rounded-full inline-block"></span> Academic Information
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Qualification:</span>
                            <span className="font-extrabold text-gray-900">M.E., Ph.D.</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Specialization:</span>
                            <span className="font-extrabold text-gray-900">Cyber Security</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Experience:</span>
                            <span className="font-extrabold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">18 Years</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <h2 className="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-2">
                        <span className="w-2 h-6 bg-purple-600 rounded-full inline-block"></span> Current Load
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Class In-charge:</span>
                            <span className="font-extrabold text-gray-900">III Year CSE – A</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-gray-200/60 pb-3">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Subjects Handled:</span>
                            <span className="font-extrabold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">2</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Publication Target:</span>
                            <span className="font-extrabold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">1 Pending</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Research Summary Section */}
            <div className="mt-10 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <h2 className="text-lg font-extrabold text-gray-800 mb-5 flex items-center gap-2">
                    <span className="w-2 h-6 bg-green-500 rounded-full inline-block"></span> Research & Publications Summary
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-2xl font-black text-gray-900">12</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Scopus</p>
                        <p className="text-2xl font-black text-indigo-600">5</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">SCI</p>
                        <p className="text-2xl font-black text-blue-600">3</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Conference</p>
                        <p className="text-2xl font-black text-purple-600">4</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Publication Target Progress (Current Academic Year)</p>
                            <p className="text-sm font-semibold text-gray-700 mt-1">2 Achieved / 3 Target</p>
                        </div>
                        <span className="text-xl font-black text-green-500">66%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '66%' }}></div>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                <button className="bg-blue-600 text-white font-bold text-sm px-8 py-3 rounded-xl hover:bg-blue-700 transition tracking-wide shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5">
                    Edit Profile
                </button>
            </div>
        </div>
    );
}
