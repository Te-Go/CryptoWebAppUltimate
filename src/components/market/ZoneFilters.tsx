import { useMarket } from '../../context/MarketContext';

export function ZoneFilters() {
    const { zones, selectedZone, setSelectedZone } = useMarket();

    return (
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2 px-1">
            {zones.map((zone) => (
                <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    className={`
            px-3 py-1.5 text-sm font-medium rounded-lg
            border transition-all duration-200
            whitespace-nowrap
            ${selectedZone === zone.id
                            ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan'
                            : 'bg-transparent border-border text-text-secondary hover:border-text-muted hover:text-text-primary'
                        }
          `}
                >
                    {zone.name}
                </button>
            ))}
        </div>
    );
}
