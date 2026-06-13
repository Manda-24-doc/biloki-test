import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-white px-4 py-8 text-slate-950 sm:justify-center sm:px-6">
            <div className="mb-6">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-2 shadow-sm transition hover:border-black/20 hover:bg-slate-50"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white transition group-hover:scale-105">
                        <span className="text-lg font-black uppercase tracking-[0.2em]">
                            A
                        </span>
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">
                            Admin
                        </p>
                        <p className="text-sm text-slate-500">Biloki panel</p>
                    </div>
                </Link>
            </div>

            <div className="w-full overflow-hidden rounded-3xl border border-black/10 bg-white px-6 py-6 shadow-sm shadow-black/5 sm:max-w-md">
                {children}
            </div>
        </div>
    );
}
