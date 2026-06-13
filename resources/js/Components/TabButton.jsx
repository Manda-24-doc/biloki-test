export default function TabButton({
    active = false,
    icon,
    hint,
    children,
    className = '',
    ...props
}) {
    return (
        <button
            type="button"
            className={[
                'group flex flex-1 items-center gap-3 rounded-2xl border px-4 py-3 text-left transition',
                active
                    ? 'border-gray-900 bg-gray-900 text-white shadow-sm shadow-gray-200'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900',
                className,
            ].join(' ')}
            {...props}
        >
            {icon && (
                <span
                    className={[
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                        active ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200',
                    ].join(' ')}
                >
                    {icon}
                </span>
            )}

            <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold">{children}</span>
                {hint && (
                    <span
                        className={[
                            'truncate text-xs',
                            active ? 'text-gray-200' : 'text-gray-500',
                        ].join(' ')}
                    >
                        {hint}
                    </span>
                )}
            </span>
        </button>
    );
}
