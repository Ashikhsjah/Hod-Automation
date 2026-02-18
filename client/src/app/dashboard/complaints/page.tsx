"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ComplaintForm() {
    const { token } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = useState({
        category: 'LAB_ISSUE',
        location: '',
        title: '',
        description: '',
        priority: 'MEDIUM'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/portal/complaint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                alert('Complaint submitted successfully');
                router.back(); // Go back to dashboard
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting complaint');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Report an Issue</h1>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Category</label>
                        <select
                            className="w-full border p-3 rounded-lg bg-white"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="LAB_ISSUE">Lab Equipment Issue</option>
                            <option value="ELECTRICAL">Electrical / Power</option>
                            <option value="CLEANLINESS">Cleanliness</option>
                            <option value="FURNITURE">Furniture Damage</option>
                            <option value="PROJECTOR">Projector / AV</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Title (Short)</label>
                        <input
                            type="text"
                            className="w-full border p-3 rounded-lg"
                            placeholder="e.g. Broken connection"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Location / Lab Name</label>
                        <input
                            type="text"
                            className="w-full border p-3 rounded-lg"
                            placeholder="e.g. Computer Lab 1, Row 2"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                        <textarea
                            className="w-full border p-3 rounded-lg h-32"
                            placeholder="Describe the issue in detail..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio" name="priority" value="LOW"
                                    checked={formData.priority === 'LOW'}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="text-blue-600"
                                /> Low
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio" name="priority" value="MEDIUM"
                                    checked={formData.priority === 'MEDIUM'}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="text-orange-600"
                                /> Medium
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio" name="priority" value="HIGH"
                                    checked={formData.priority === 'HIGH'}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="text-red-600"
                                /> High
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition">
                        Submit Complaint
                    </button>
                </form>
            </div>
        </div>
    );
}
