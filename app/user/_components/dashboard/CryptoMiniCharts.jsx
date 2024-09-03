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
                    width: '100%',
                    height: '100%',
                    locale: 'en',
                    dateRange: '12M',
                    colorTheme: 'dark',
                    trendLineColor: 'rgba(152, 0, 255, 1)',
                    underLineColor: 'rgba(152, 0, 255, 1)',
                    underLineBottomColor: 'rgba(0, 255, 255, 0)',
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
        <div className="flex flex-wrap gap-4 justify-center">
            {symbols.map((symbol, index) => (
                <div
                    key={index}
                    id={`tradingview-widget-container-${symbol}`}
                    className="w-full h-60 overflow-hidden bg-neutral-800 rounded-lg shadow-lg p-2"
                >
                    <div className="tradingview-widget-container__widget h-full"></div>
                </div>
            ))}
        </div>
    );
};

export default CryptoMiniCharts;
