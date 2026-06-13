import { Head, Link } from '@inertiajs/react';

const highlights = [
    {
        title: 'Clients',
        description: 'Gardez une vue rapide sur vos derniers clients et leurs infos.',
    },
    {
        title: 'Produits',
        description: 'Suivez vos articles, vos stocks et vos images en un seul endroit.',
    },
    {
        title: 'Categories',
        description: 'Classez vos produits avec une navigation claire et simple.',
    },
];

const benefits = [
    'Acces direct a la connexion',
    'Interface propre pour administrer les donnees',
    'Experience pensee pour mobile et desktop',
];

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const isAuthenticated = Boolean(auth?.user);

    return (
        <>
            <Head title="Bienvenue" />

            <div className="min-h-screen bg-white text-slate-950">
                <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                    <header className="flex items-center justify-between gap-4 border-b border-black/10 py-4">
                        <Link href="/" className="group inline-flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white transition group-hover:scale-105">
                                <span className="text-lg font-black tracking-[0.2em]">A</span>
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">
                                    Admin
                                </p>
                                <p className="text-sm text-slate-500">Biloki panel</p>
                            </div>
                        </Link>

                        <Link
                            href={route('login')}
                            className="inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
                        >
                            Se connecter
                        </Link>
                    </header>

                    <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
                        <section className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-black/10 bg-black/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700">
                                Espace de gestion
                            </span>

                            <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                                Une interface admin simple, nette et directe.
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                                Cette interface vous permet de rejoindre rapidement
                                votre espace de gestion pour travailler sur les clients,
                                les produits et les categories sans distraction.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                                >
                                    Ouvrir la connexion
                                </Link>

                                {isAuthenticated ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
                                    >
                                        Aller au dashboard
                                    </Link>
                                ) : (
                                    <div className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-slate-500">
                                        Acces rapide au compte
                                    </div>
                                )}
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {highlights.map((item) => (
                                    <article
                                        key={item.title}
                                        className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm shadow-black/5"
                                    >
                                        <p className="text-sm font-semibold text-slate-950">
                                            {item.title}
                                        </p>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            {item.description}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </section>

                        <aside className="grid gap-4">
                            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                            Apercu rapide
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-slate-950">
                                            Tout ce qu&apos;il faut sous la main
                                        </h2>
                                    </div>
                                    <div className="rounded-2xl border border-black/10 bg-black px-3 py-2 text-sm font-semibold text-white">
                                        Live
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3">
                                    {benefits.map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white p-4"
                                        >
                                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                                                <span className="text-sm font-bold">+</span>
                                            </div>
                                            <p className="text-sm leading-6 text-slate-700">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                                    Environnement
                                </p>
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                                        <p className="text-slate-400">Laravel</p>
                                        <p className="mt-1 font-semibold text-slate-950">
                                            v{laravelVersion}
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-black/10 bg-white p-4">
                                        <p className="text-slate-400">PHP</p>
                                        <p className="mt-1 font-semibold text-slate-950">
                                            v{phpVersion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </>
    );
}
