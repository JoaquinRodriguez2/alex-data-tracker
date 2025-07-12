/* Create a Form view for this supabase databse.

CREATE TABLE tracked_field_templates (
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT NOT NULL,
description TEXT,
is_invisible BOOLEAN DEFAULT false,
value_type TEXT NOT NULL CHECK (value_type IN ('date', 'boolean', 'double'))
);

Add all the logic to create,edit or update please. Use good ui as well and add logic to, what will be the id to create? i mean use good practices in general but do everything in page.tsx. Use supabase

*/

'use client';

import supabase from '@/utils/SupabaseConfig';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const VALUE_TYPES = ['date', 'boolean', 'double'];

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const { id } = params || {};

    const isNew = id === 'new';

    const [form, setForm] = useState({
        name: '',
        description: '',
        is_invisible: false,
        value_type: 'date',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Load existing data if editing
    useEffect(() => {
        if (!isNew && id) {
            setLoading(true);
            supabase
                .from('tracked_field_templates')
                .select('*')
                .eq('id', id)
                .single()
                .then(({ data, error }) => {
                    if (error) setError('Failed to load data');
                    else if (data) setForm({
                        name: data.name || '',
                        description: data.description || '',
                        is_invisible: !!data.is_invisible,
                        value_type: data.value_type || 'date',
                    });
                })
                .finally(() => setLoading(false));
        }
    }, [id, isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!form.name.trim()) {
            setError('Name is required');
            return;
        }
        if (!VALUE_TYPES.includes(form.value_type)) {
            setError('Invalid value type');
            return;
        }

        setLoading(true);

        if (isNew) {
            // CREATE
            const { error } = await supabase
                .from('tracked_field_templates')
                .insert([form]);
            if (error) setError(error.message);
            else {
                setSuccess('Created successfully!');
                router.push('/dashboard/tracked-fields'); // Go back to list
            }
        } else {
            // UPDATE
            const { error } = await supabase
                .from('tracked_field_templates')
                .update(form)
                .eq('id', id);
            if (error) setError(error.message);
            else setSuccess('Updated successfully!');
        }
        setLoading(false);
    };

    // ...existing code...
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 md:p-10 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {isNew ? 'Create' : 'Edit'} Tracked Field Template
                </h2>
                <button
                    type="button"
                    onClick={() => router.push('/dashboard/tracked-fields')}
                    className="text-blue-600 hover:underline text-sm font-medium"
                    disabled={loading}
                >
                    &larr; Back
                </button>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                autoComplete="off"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 transition"
                        disabled={loading}
                        placeholder="Enter field name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 transition"
                        disabled={loading}
                        placeholder="Optional description"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="is_invisible"
                        checked={form.is_invisible}
                        onChange={handleChange}
                        disabled={loading}
                        className="accent-blue-600 w-5 h-5"
                        id="is_invisible"
                    />
                    <label htmlFor="is_invisible" className="text-sm font-medium text-gray-700">
                        Invisible
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="value_type"
                        value={form.value_type}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 transition"
                        disabled={loading}
                    >
                        {VALUE_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded text-sm">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded text-sm">
                        {success}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2.5 rounded-lg font-semibold text-white text-base shadow transition-colors ${
                        loading
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : isNew ? 'Create' : 'Update'}
                </button>
            </form>
        </div>
    </div>
);
// ...existing code...
}