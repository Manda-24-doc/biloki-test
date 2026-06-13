import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Package,
    Users,
    Tags,
    Menu,
    X,
    Settings,
    LogOut,
} from 'lucide-react';
import { useState } from 'react';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const menu = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            href: route('dashboard'),
            routeName: 'dashboard',
        },
        {
            name: 'Customers',
            icon: Users,
            href: route('customers.index'),
            routeName: 'customers.index',
        },
        {
            name: 'Categories',
            icon: Tags,
            href: route('categories.index'),
            routeName: 'categories.index',
        },
        {
            name: 'Products',
            icon: Package,
            href: route('products.index'),
            routeName: 'products.index',
        },
    ];

    const closeMobile = () => setMobileOpen(false);

    return (
        <div className="min-h-screen bg-gray-100 md:flex">
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close menu overlay"
                    className="fixed inset-0 z-30 bg-gray-900/50 md:hidden"
                    onClick={closeMobile}
                />
            )}

            <aside
                className={[
                    'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-white transition-transform duration-300 md:static md:z-auto md:translate-x-0 md:border-r',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
                    open ? 'md:w-64' : 'md:w-20',
                ].join(' ')}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">Biloki</span>
                    </div>

                    <button
                        onClick={closeMobile}
                        className="inline-flex rounded p-2 hover:bg-gray-100 md:hidden"
                        aria-label="Close mobile menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="mt-4 flex-1 space-y-1 px-2">
                    {menu.map((item) => {
                        const active = route().current(item.routeName);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMobile}
                                className={[
                                    'flex items-center gap-3 rounded-lg px-3 py-2 transition',
                                    active
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-black',
                                ].join(' ')}
                            >
                                <item.icon size={18} />
                                {open && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t p-2">
                    {open && (
                        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Compte
                        </div>
                    )}

                    <Link
                        href={route('profile.edit')}
                        onClick={closeMobile}
                        className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition hover:bg-gray-100 hover:text-black"
                    >
                        <Settings size={18} />
                        {open && <span>Configuration du compte</span>}
                    </Link>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition hover:bg-red-100 hover:text-red-500"
                        onClick={closeMobile}
                    >
                        <LogOut size={18} />
                        {open && <span>Déconnexion</span>}
                    </Link>
                </div>
            </aside>

            <div className="flex min-h-screen flex-1 flex-col md:ml-0">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/10 bg-white px-4 shadow-sm md:px-6">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(true)}
                            className="inline-flex items-center justify-center rounded-md border border-black/10 p-2 text-slate-600 shadow-sm transition hover:bg-blue-50 md:hidden"
                            aria-label="Open mobile menu"
                        >
                            <Menu size={18} />
                        </button>

                        <h1 className="text-lg font-bold text-slate-900">
                            {header}
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden text-sm font-medium text-slate-500 md:block">
                            {new Date().toLocaleDateString('fr-FR', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long'
                            })}
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-black/5 bg-slate-50 py-1.5 px-3">
                            <div className="h-6 w-6 flex items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                                {user.name}
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
