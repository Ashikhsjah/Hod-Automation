"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Faculty {
    _id: string;
    name: string;
    email: string;
    designation: string;
    isDoctorate: boolean;
}

export default function FacultyManagement() {
    const { token } = useAuth();
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ name: '', designation: '', isDoctorate: false });

    // Sample data in case fetch fails or is empty initially
    const sampleFaculty = [
        { _id: '1', name: 'Dr. John Doe', email: 'john@college.edu', designation: 'Professor', isDoctorate: true },
        { _id: '2', name: 'Jane Smith', email: 'jane@college.edu', designation: 'Assistant Professor', isDoctorate: false },
    ];

    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/hod/faculty', {
                headers: { 'x-auth-token': token }
            })
                .then(res => res.json())
                .then(data => {
                    if (data && data.length > 0) setFaculty(data);
                    else setFaculty(sampleFaculty);
                })
                .catch(err => {
                    console.error(err);
                    setFaculty(sampleFaculty);
                });
        }
    }, [token]);

    const handleEdit = (fac: Faculty) => {
        setEditingId(fac._id);
        setFormData({ name: fac.name, designation: fac.designation, isDoctorate: fac.isDoctorate });
    };

    const handleSave = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/hod/faculty/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const updatedFac = await res.json();
                setFaculty(faculty.map(f => f._id === id ? updatedFac : f));
                setEditingId(null);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            try {
                const res = await fetch(`http://localhost:5000/api/hod/faculty/${id}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token || '' }
                });
                if (res.ok) {
                    setFaculty(faculty.filter(f => f._id !== id));
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Manage Faculty</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctorate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {faculty.map((fac) => (
                            <tr key={fac._id}>
                                <td className="px-6 py-4">
                                    {editingId === fac._id ? (
                                        <input
                                            className="border p-1 rounded"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    ) : fac.name}
                                </td>
                                <td className="px-6 py-4 text-gray-500">{fac.email}</td>
                                <td className="px-6 py-4">
                                    {editingId === fac._id ? (
                                        <input
                                            className="border p-1 rounded"
                                            value={formData.designation}
                                            onChange={e => setFormData({ ...formData, designation: e.target.value })}
                                        />
                                    ) : fac.designation}
                                </td>
                                <td className="px-6 py-4">
                                    {editingId === fac._id ? (
                                        <input
                                            type="checkbox"
                                            checked={formData.isDoctorate}
                                            onChange={e => setFormData({ ...formData, isDoctorate: e.target.checked })}
                                        />
                                    ) : (fac.isDoctorate ? 'Yes' : 'No')}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    {editingId === fac._id ? (
                                        <button onClick={() => handleSave(fac._id)} className="text-green-600 font-bold">Save</button>
                                    ) : (
                                        <button onClick={() => handleEdit(fac)} className="text-blue-600 font-bold">Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(fac._id)} className="text-red-600 font-bold">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
