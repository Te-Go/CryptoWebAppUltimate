import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
    data: number[];
    positive?: boolean;
    color?: string;
    width?: number;
    height?: number;
}

export function Sparkline({
    data,
    positive = true,
    color: colorProp,
    width = 100,
    height = 32
}: SparklineProps) {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const chartData = data.map((value, index) => ({ index, value }));
    const color = colorProp ?? (positive ? '#00FF88' : '#FF3366');

    return (
        <ResponsiveContainer width={width} height={height}>
            <LineChart data={chartData}>
                <defs>
                    <linearGradient id={`sparkline-${positive ? 'green' : 'red'}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={1.5}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
