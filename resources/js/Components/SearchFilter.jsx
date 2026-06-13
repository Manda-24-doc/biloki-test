import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SearchFilter({
    action,
    search = '',
    sort = 'recent',
    placeholder = 'Search...',
    sortLabel = 'Filter by date',
}) {
    const [term, setTerm] = useState(search);
    const [order, setOrder] = useState(sort);

    useEffect(() => {
        setTerm(search);
    }, [search]);

    useEffect(() => {
        setOrder(sort);
    }, [sort]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (term === search && order === sort) {
                return;
            }

            router.get(
                action,
                {
                    search: term,
                    sort: order,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300);

        return () => clearTimeout(timer);
    }, [action, order, search, sort, term]);

    return (
        <div
            className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 md:flex-row md:items-center"
        >
            <div className="flex-1">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Search
                </label>
                <input
                    type="text"
                    value={term}
                    onChange={(event) => setTerm(event.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
            <div className="w-full md:w-56">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {sortLabel}
                </label>
                <select
                    value={order}
                    onChange={(event) => setOrder(event.target.value)}
                    className="w-full cursor-pointer rounded-lg border-slate-200 bg-white py-2 pl-3 pr-8
                    text-sm text-slate-700 shadow-sm transition-all duration-200 hover:border-blue-300 focus:border-blue-500 focus:ring-blue-500/20"
                >
                    <option value="recent">Recent</option>
                    <option value="old">Old</option>
                </select>
            </div>
        </div>
    );
}
