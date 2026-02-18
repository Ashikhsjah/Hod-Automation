"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Circular {
    _id: string;
    title: string;
    content: string;
    audience: string;
    createdAt: string;
}

export default function CircularsManagement() {
    const { token } = useAuth();
    const [circulars, setCirculars] = useState<Circular[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [audience, setAudience] = useState('ALL');

    useEffect(() => {
        if (token) fetchCirculars();
    }, [token]);

    const fetchCirculars = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/portal/circulars', {
                headers: { 'x-auth-token': token || '' }
            });
            const data = await res.json();
            setCirculars(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/portal/circular', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token || ''
                },
                body: JSON.stringify({ title, content, audience, isPublic: audience === 'ALL' })
            });
            if (res.ok) {
                setTitle('');
                setContent('');
                fetchCirculars();
                alert('Circular Posted Successfully');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Circulars & Announcements</h1>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <h2 className="text-lg font-bold mb-4">Post New Circular</h2>
                <form onSubmit={handlePost} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Content</label>
                        <textarea
                            className="w-full border p-2 rounded h-24 focus:ring-2 focus:ring-blue-500"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Audience</label>
                        <select
                            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                            value={audience}
                            onChange={(e) => setAudience(e.target.value)}
                        >
                            <option value="ALL">Everyone (Public)</option>
                            <option value="STUDENT">Students Only</option>
                            <option value="FACULTY">Faculty Only</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-bold hover:bg-blue-700">
                        Publish Circular
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold">Recent Circulars</h2>
                {circulars.map((c) => (
                    <div key={c._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-900">{c.title}</h3>
                            <p className="text-gray-600 mt-1 text-sm">{c.content}</p>
                            <div className="mt-2 flex gap-2 text-xs">
                                <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">{new Date(c.createdAt).toLocaleDateString()}</span>
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded font-medium">{c.audience}</span>
                            </div>
                        </div>
                        <button className="text-red-500 text-sm hover:underline">Delete</button>
                    </div>
                ))}
                {circulars.length === 0 && <p className="text-gray-500 text-center">No circulars posted yet.</p>}
            </div>
        </div>
    );
}
