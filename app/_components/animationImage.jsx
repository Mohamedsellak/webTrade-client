import React from 'react';

export default function Page() {
    const images = [
        'binance',
        'ethereum',
        'eos',
        'tron',
        'metamask',
        'opensea',
        'telegram',
        'solana',
        'tether'
    ];

    return (
        <div className="overflow-hidden my-16">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...images, ...images].map((img, index) => (
                    <img
                        key={index}
                        src={`/assets/images/${img}.svg`}
                        alt={img}
                        className="
                            h-20 w-20 m-4
                            sm:h-24 sm:w-24 sm:m-6
                            md:h-28 md:w-28 md:m-8
                            lg:h-32 lg:w-32 lg:m-10
                            inline-block flex-shrink-0
                        "
                    />
                ))}
            </div>
        </div>
    );
}
