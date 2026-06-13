import AdminLayout from '@/Layouts/AdminLayout';
import SearchFilter from '@/Components/SearchFilter';
import { Head, Link } from '@inertiajs/react';

function paginationLabel(label) {
    return label
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&nbsp;/g, ' ')
        .trim();
}

export default function Index({ customers, search, sort }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Customers
                </h2>
            }
        >
            <Head title="Customers" />

            <div className="py-0">
                <div className="mx-auto max-w-7xl space-y-6 px-0 sm:px-2 lg:px-0">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        Customers list
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Showing {customers.from ?? 0} to{' '}
                                        {customers.to ?? 0} of {customers.total ?? 0}{' '}
                                        customers
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 pt-6">
                            <SearchFilter
                                action={route('customers.index')}
                                search={search}
                                sort={sort}
                                placeholder="Search customers..."
                                sortLabel="Sort by date"
                            />
                        </div>

                        <div className="mt-6 space-y-3 px-6 sm:hidden">
                            {customers.data?.length ? (
                                customers.data.map((customer) => (
                                    <div
                                        key={customer.id}
                                        className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {customer.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {customer.created_at
                                                        ? new Date(customer.created_at).toLocaleDateString()
                                                        : '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 space-y-2 text-sm">
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">
                                                    Email:
                                                </span>{' '}
                                                {customer.email}
                                            </p>
                                            <p className="text-gray-600">
                                                <span className="font-medium text-gray-900">
                                                    Phone:
                                                </span>{' '}
                                                {customer.number}
                                            </p>
                                            <p className="break-words text-gray-600">
                                                <span className="font-medium text-gray-900">
                                                    Address:
                                                </span>{' '}
                                                {customer.address}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
                                    No customers found.
                                </div>
                            )}
                        </div>

                        <div className="hidden overflow-x-auto mt-6 sm:block">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Email
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                            Created
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {customers.data?.length ? (
                                        customers.data.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-gray-50">
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                    {customer.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {customer.email}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {customer.address}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {customer.number}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {customer.created_at
                                                        ? new Date(customer.created_at).toLocaleDateString()
                                                        : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-10 text-center text-sm text-gray-500"
                                            >
                                                No customers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {customers.links?.length > 3 && (
                            <div className="border-t border-gray-200 px-6 py-4">
                                <div className="flex flex-wrap gap-2">
                                    {customers.links.map((link, index) => {
                                        const label = paginationLabel(link.label);
                                        const isActive = link.active;
                                        const isDisabled = !link.url;

                                        return (
                                            <span key={`${label}-${index}`}>
                                                {isDisabled ? (
                                                    <span
                                                        className={[
                                                            'inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium',
                                                            isActive
                                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                                : 'border-gray-300 bg-white text-gray-400',
                                                        ].join(' ')}
                                                    >
                                                        {label}
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={link.url}
                                                        className={[
                                                            'inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium transition',
                                                            isActive
                                                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
                                                        ].join(' ')}
                                                    >
                                                        {label}
                                                    </Link>
                                                )}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
