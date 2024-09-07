import React, { useEffect } from 'react';

const CryptoMiniCharts = ({ symbols }) => {
    useEffect(() => {
        const loadTradingViewWidgets = () => {
            symbols.forEach(symbol => {
                const script = document.createElement('script');
                script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
                script.type = 'text/javascript';
                script.async = true;
                script.innerHTML = JSON.stringify({
                    symbol,
                    width: '400',
                    height: '300',
                    locale: 'en',
                    dateRange: '12M',
                    colorTheme: 'dark',
                    trendLineColor: 'rgba(0,255,79,0.5)',
                    underLineColor: 'rgba(38,38,39,255)',
                    underLineBottomColor: 'rgba(26,27,28,255)',
                    isTransparent: false,
                    autosize: true,
                    largeChartUrl: ''
                });

                const container = document.getElementById(`tradingview-widget-container-${symbol}`);
                if (container) {
                    container.appendChild(script);
                }
            });
        };

        loadTradingViewWidgets();

        return () => {
            symbols.forEach(symbol => {
                const container = document.getElementById(`tradingview-widget-container-${symbol}`);
                if (container) {
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
                }
            });
        };
    }, [symbols]);

    return (
        <div className="whitespace-nowrap space-x-4">
            {symbols.map((symbol, index) => (
                <div
                    key={index}
                    id={`tradingview-widget-container-${symbol}`}
                    className="inline-block border border-white bg-neutral-800 rounded-3xl shadow-lg overflow-hidden"
                >
                    {/* TradingView Widget will be appended here */}
                </div>
            ))}
        </div>
    );
};

export default CryptoMiniCharts;
