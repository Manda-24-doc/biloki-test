import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import TabButton from '@/Components/TabButton';
import SearchFilter from '@/Components/SearchFilter';
import { Head, Link, router } from '@inertiajs/react';
import { List, PencilLine, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import FormCategories from './FormCategories';

function paginationLabel(label) {
    return label
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&nbsp;/g, ' ')
        .trim();
}

export default function Index({ categories, search, sort }) {
    const [activeTab, setActiveTab] = useState('list');
    const [editingCategory, setEditingCategory] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const openList = () => {
        setEditingCategory(null);
        setActiveTab('list');
    };

    const openCreate = () => {
        setEditingCategory(null);
        setActiveTab('form');
    };

    const openEdit = (category) => {
        setEditingCategory(category);
        setActiveTab('form');
    };

    const handleDelete = (category) => {
        setDeleteTarget(category);
    };

    const confirmDelete = () => {
        if (!deleteTarget) {
            return;
        }

        router.delete(route('categories.destroy', deleteTarget.id), {
            preserveScroll: true,
            onStart: () => setDeleting(true),
            onSuccess: () => {
                setDeleteTarget(null);
                setDeleting(false);
                if (editingCategory?.id === deleteTarget.id) {
                    openList();
                }
            },
            onError: () => setDeleting(false),
            onFinish: () => setDeleting(false),
        });
    };

    const isEditMode = activeTab === 'form' && Boolean(editingCategory);

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categories
                </h2>
            }
        >
            <Head title="Categories" />

            <div className="py-0">
                <div className="mx-auto max-w-7xl space-y-4 px-0 sm:px-2 lg:px-0">
                    <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-white via-gray-50 to-white p-2 shadow-sm">
                        <div className="grid gap-2 md:grid-cols-2">
                            <TabButton
                                active={activeTab === 'list'}
                                icon={<List size={16} />}
                                hint={`${categories.total ?? 0} categories`}
                                onClick={openList}
                            >
                                Categories list
                            </TabButton>
                            <TabButton
                                active={activeTab === 'form'}
                                icon={
                                    isEditMode ? (
                                        <PencilLine size={16} />
                                    ) : (
                                        <PlusCircle size={16} />
                                    )
                                }
                                hint={
                                    isEditMode
                                        ? `Editing ${editingCategory?.name ?? 'category'}`
                                        : 'Add a new category'
                                }
                                onClick={openCreate}
                            >
                                {isEditMode ? 'Edit category' : 'Create category'}
                            </TabButton>
                        </div>
                    </div>

                    {activeTab === 'form' ? (
                        <FormCategories
                            key={editingCategory?.id ?? 'create-category'}
                            initialValues={editingCategory ?? {}}
                            mode={isEditMode ? 'edit' : 'create'}
                            onSuccess={openList}
                            onCancel={openList}
                        />
                    ) : (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Categories list
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Showing {categories.from ?? 0} to{' '}
                                            {categories.to ?? 0} of{' '}
                                            {categories.total ?? 0} categories
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pt-6">
                                <SearchFilter
                                    action={route('categories.index')}
                                    search={search}
                                    sort={sort}
                                    placeholder="Search categories..."
                                    sortLabel="Sort by date"
                                />
                            </div>

                            <div className="mt-6 space-y-3 px-6 sm:hidden">
                                {categories.data?.length ? (
                                    categories.data.map((category) => (
                                        <div
                                            key={category.id}
                                            className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
                                        >
                                            <div className="flex items-start gap-3">
                                                {category.image ? (
                                                    <img
                                                        src={`/storage/${category.image}`}
                                                        alt={category.name}
                                                        className="h-16 w-16 rounded-xl object-cover shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                                                        No image
                                                    </div>
                                                )}

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div>
                                                            <p className="truncate text-sm font-semibold text-gray-900">
                                                                {category.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {category.created_at
                                                                    ? new Date(
                                                                          category.created_at,
                                                                      ).toLocaleDateString()
                                                                    : '-'}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEdit(category)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-sm transition hover:bg-blue-50"
                                                                title="Edit category"
                                                            >
                                                                <PencilLine size={16} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(category)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 shadow-sm transition hover:bg-red-50"
                                                                title="Delete category"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p className="mt-3 break-words text-sm text-gray-600">
                                                        {category.description ?? '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
                                        No categories found.
                                    </div>
                                )}
                            </div>

                            <div className="hidden mt-6 sm:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Created
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {categories.data?.length ? (
                                            categories.data.map((category) => (
                                                <tr
                                                    key={category.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        {category.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {category.image ? (
                                                            <img
                                                                src={`/storage/${category.image}`}
                                                                alt={category.name}
                                                                className="h-12 w-12 rounded-lg object-cover shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                                No
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {category.description ?? '-'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {category.created_at
                                                            ? new Date(
                                                                  category.created_at,
                                                              ).toLocaleDateString()
                                                            : '-'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEdit(category)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                                                                title="Edit category"
                                                            >
                                                                <PencilLine size={16} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(category)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                                                                title="Delete category"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="px-6 py-10 text-center text-sm text-gray-500"
                                                >
                                                    No categories found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {categories.links?.length > 3 && (
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {categories.links.map((link, index) => {
                                            const label = paginationLabel(
                                                link.label,
                                            );
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
                    )}
                </div>
            </div>

            <ConfirmDeleteModal
                show={Boolean(deleteTarget)}
                title="Delete category"
                message={
                    deleteTarget
                        ? `Delete "${deleteTarget.name}"? This action cannot be undone.`
                        : ''
                }
                confirmLabel="Delete category"
                processing={deleting}
                onClose={() => {
                    if (!deleting) {
                        setDeleteTarget(null);
                    }
                }}
                onConfirm={confirmDelete}
            />
        </AdminLayout>
    );
}
