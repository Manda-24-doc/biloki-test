import AdminLayout from '@/Layouts/AdminLayout';
import ConfirmDeleteModal from '@/Components/ConfirmDeleteModal';
import TabButton from '@/Components/TabButton';
import SearchFilter from '@/Components/SearchFilter';
import { Head, Link, router } from '@inertiajs/react';
import { List, PencilLine, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import FormProduct from './FormProduct';

function paginationLabel(label) {
    return label
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&nbsp;/g, ' ')
        .trim();
}

function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(price ?? 0));
}

export default function Index({ products, categories, search, sort }) {
    const [activeTab, setActiveTab] = useState('list');
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const openList = () => {
        setEditingProduct(null);
        setActiveTab('list');
    };

    const openCreate = () => {
        setEditingProduct(null);
        setActiveTab('form');
    };

    const openEdit = (product) => {
        setEditingProduct(product);
        setActiveTab('form');
    };

    const handleDelete = (product) => {
        setDeleteTarget(product);
    };

    const confirmDelete = () => {
        if (!deleteTarget) {
            return;
        }

        router.delete(route('products.destroy', deleteTarget.id), {
            preserveScroll: true,
            onStart: () => setDeleting(true),
            onSuccess: () => {
                setDeleteTarget(null);
                setDeleting(false);
                if (editingProduct?.id === deleteTarget.id) {
                    openList();
                }
            },
            onError: () => setDeleting(false),
            onFinish: () => setDeleting(false),
        });
    };

    const isEditMode = activeTab === 'form' && Boolean(editingProduct);

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-0">
                <div className="mx-auto max-w-7xl space-y-4 px-2 sm:px-2 lg:px-0">
                    <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-white via-gray-50 to-white p-2 shadow-sm">
                        <div className="grid gap-2 md:grid-cols-2">
                            <TabButton
                                active={activeTab === 'list'}
                                icon={<List size={16} />}
                                hint={`${products.total ?? 0} products`}
                                onClick={openList}
                            >
                                Products list
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
                                        ? `Editing ${editingProduct?.name ?? 'product'}`
                                        : 'Add a new product'
                                }
                                onClick={openCreate}
                            >
                                {isEditMode ? 'Edit product' : 'Create product'}
                            </TabButton>
                        </div>
                    </div>

                    {activeTab === 'form' ? (
                        <FormProduct
                            key={editingProduct?.id ?? 'create-product'}
                            categories={categories}
                            initialValues={editingProduct ?? {}}
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
                                            Products list
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Showing {products.from ?? 0} to{' '}
                                            {products.to ?? 0} of{' '}
                                            {products.total ?? 0} products
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 pt-6">
                                <SearchFilter
                                    action={route('products.index')}
                                    search={search}
                                    sort={sort}
                                    placeholder="Search products..."
                                    sortLabel="Sort by date"
                                />
                            </div>

                            <div className="mt-6 space-y-3 px-6 sm:hidden">
                                {products.data?.length ? (
                                    products.data.map((product) => (
                                        <div
                                            key={product.id}
                                            className="rounded-2xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
                                        >
                                            <div className="flex items-start gap-3">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
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
                                                                {product.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {product.product_category?.name ??
                                                                    product.productCategory?.name ??
                                                                    '-'}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEdit(product)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-sm transition hover:bg-blue-50"
                                                                title="Edit product"
                                                            >
                                                                <PencilLine size={16} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(product)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 shadow-sm transition hover:bg-red-50"
                                                                title="Delete product"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                                        <div className="rounded-xl bg-white px-3 py-2">
                                                            <p className="text-[11px] uppercase tracking-wide text-gray-400">
                                                                Price
                                                            </p>
                                                            <p className="font-medium text-green-600">
                                                                {formatPrice(product.price)}
                                                            </p>
                                                        </div>
                                                        <div className="rounded-xl bg-white px-3 py-2">
                                                            <p className="text-[11px] uppercase tracking-wide text-gray-400">
                                                                Stocks
                                                            </p>
                                                            <p className="font-medium text-red-600">
                                                                {product.stocks}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Created:{' '}
                                                        {product.created_at
                                                            ? new Date(
                                                                  product.created_at,
                                                              ).toLocaleDateString()
                                                            : '-'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
                                        No products found.
                                    </div>
                                )}
                            </div>

                            <div className="hidden mt-6 overflow-x-auto sm:block">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Image
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Price
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                Stocks
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
                                        {products.data?.length ? (
                                            products.data.map((product) => (
                                                <tr
                                                    key={product.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        {product.product_category?.name ??
                                                            product.productCategory?.name ??
                                                            '-'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {product.image ? (
                                                            <img
                                                                src={`/storage/${product.image}`}
                                                                alt={product.name}
                                                                className="h-12 w-12 rounded-lg object-cover shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                                                                No
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {product.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">
                                                        {product.description ?? '-'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-green-600">
                                                        {formatPrice(product.price)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-red-600">
                                                        {product.stocks}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                        {product.created_at
                                                            ? new Date(
                                                                  product.created_at,
                                                              ).toLocaleDateString()
                                                            : '-'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    openEdit(product)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                                                                title="Edit product"
                                                            >
                                                                <PencilLine size={16} />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleDelete(product)
                                                                }
                                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                                                                title="Delete product"
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
                                                    colSpan="8"
                                                    className="px-6 py-10 text-center text-sm text-gray-500"
                                                >
                                                    No products found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {products.links?.length > 3 && (
                                <div className="border-t border-gray-200 px-6 py-4">
                                    <div className="flex flex-wrap gap-2">
                                        {products.links.map((link, index) => {
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
                title="Delete product"
                message={
                    deleteTarget
                        ? `Delete "${deleteTarget.name}"? This action cannot be undone.`
                        : ''
                }
                confirmLabel="Delete product"
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
