import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    public render() {
        if (this.state.hasError) {
            // Allow custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-6 text-center bg-surface/50 rounded-lg border border-loss/20 my-4">
                    <div className="text-3xl mb-2">⚠️</div>
                    <h2 className="text-lg font-bold text-loss mb-2">Bir şeyler yanlış gitti</h2>
                    <p className="text-muted text-sm mb-4">
                        Veri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
                    </p>
                    <button
                        onClick={this.handleRetry}
                        className="px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors text-sm font-medium"
                    >
                        Tekrar Dene
                    </button>
                    {import.meta.env.DEV && (
                        <pre className="text-left bg-gray-900 p-4 rounded overflow-auto max-w-2xl mx-auto text-xs text-red-300 mt-4">
                            {this.state.error?.toString()}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
