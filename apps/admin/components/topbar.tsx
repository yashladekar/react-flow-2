// components/topbar.tsx

export function Topbar() {
    return (
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6">
            <p className="text-sm text-zinc-400">
                Configure IP headers
            </p>

            <div className="flex items-center gap-3">
                <div className="text-xs px-2 py-1 bg-zinc-800 rounded">
                    ⌘K
                </div>
            </div>
        </div>
    );
}