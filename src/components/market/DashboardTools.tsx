import { CryptoConverter } from '../tools/CryptoConverter';
import { FearGreedGauge } from './FearGreedGauge';
import { AltcoinSeasonGauge } from './AltcoinSeasonGauge';

export function DashboardTools() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Converter (60% width - 3 cols) */}
            <div className="lg:col-span-3">
                <CryptoConverter />
            </div>

            {/* Gauges (40% width - 2 cols) */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <FearGreedGauge />
                <AltcoinSeasonGauge />
            </div>
        </div>
    );
}
