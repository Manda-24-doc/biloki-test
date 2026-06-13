export default function StatCard({ icon: Icon, label, value, tone = 'gray', note }) {
    const tones = {
        gray: 'from-gray-900 to-gray-700 text-white',
        blue: 'from-blue-600 to-cyan-500 text-white',
        emerald: 'from-emerald-600 to-green-500 text-white',
        amber: 'from-amber-500 to-orange-500 text-white',
    };

    return (
        <div
            className={[
                'rounded-2xl bg-gradient-to-br p-5 shadow-sm ring-1 ring-black/5',
                tones[tone],
            ].join(' ')}
        >
            <div className="flex items-start justify-between gap-4 ">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
                        {label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-gray-100">{value}</p>
                    {note && (
                        <p className="mt-2 text-sm text-white">{note}</p>
                    )}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-gray-50">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    );
}
