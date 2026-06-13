import StatCard from '@/Components/StatCard';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Package, Tags, TrendingDown, Users } from 'lucide-react';

export default function Dashboard({
    totalCustomers = 0,
    totalProducts = 0,
    totalCategories = 0,
    lowStockProducts = 0,
    recentCustomers = [],
    recentProducts = [],
}) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tableau de bord
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="space-y-6 py-0">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        icon={Users}
                        label="Clients"
                        value={totalCustomers}
                        tone="blue"
                        note="Nombre total de clients enregistrés"
                    />
                    <StatCard
                        icon={Package}
                        label="Produits"
                        value={totalProducts}
                        tone="emerald"
                        note="Catalogue global disponible"
                    />
                    <StatCard
                        icon={Tags}
                        label="Catégories"
                        value={totalCategories}
                        tone="gray"
                        note="Répartition du catalogue"
                    />
                    <StatCard
                        icon={TrendingDown}
                        label="Stock faible"
                        value={lowStockProducts}
                        tone="amber"
                        note="Produits avec 5 stocks ou moins"
                    />
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Derniers clients
                            </h3>
                            <p className="text-sm text-gray-500">
                                Aperçu rapide des ajouts récents
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {recentCustomers.length ? (
                                recentCustomers.map((customer) => (
                                    <div
                                        key={customer.id}
                                        className="flex items-center justify-between gap-4 px-6 py-4"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate font-medium text-gray-900">
                                                {customer.name}
                                            </p>
                                            <p className="truncate text-sm text-gray-500">
                                                {customer.email}
                                            </p>
                                        </div>
                                        <span className="whitespace-nowrap text-xs text-gray-400">
                                            {customer.created_at
                                                ? new Date(
                                                    customer.created_at,
                                                ).toLocaleDateString()
                                                : '-'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-10 text-sm text-gray-500">
                                    Aucun client récent.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Derniers produits
                            </h3>
                            <p className="text-sm text-gray-500">
                                Vue rapide du stock et des prix
                            </p>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {recentProducts.length ? (
                                recentProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between gap-4 px-6 py-4"
                                    >
                                        <div className="min-w-0">
                                            <p className="truncate font-medium text-gray-900">
                                                {product.name}
                                            </p>
                                            <p className="truncate text-sm text-gray-500">
                                                {product.productCategory?.name ??
                                                    '-'}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-emerald-600">
                                                {new Intl.NumberFormat('fr-FR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }).format(Number(product.price ?? 0))}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Stocks: {product.stocks}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-10 text-sm text-gray-500">
                                    Aucun produit récent.
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Vue rapide
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                        Vous avez une vision immédiate de votre activité: clients,
                        produits, catégories et alertes de stock. Utilisez le menu
                        pour gérer le catalogue ou aller directement aux listes.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                            href={route('customers.index')}
                            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                        >
                            Voir les clients
                        </Link>
                        <Link
                            href={route('products.index')}
                            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Voir les produits
                        </Link>
                        <Link
                            href={route('categories.index')}
                            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Voir les catégories
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
