export interface NewsItem {
    id: string;
    title: string;
    source: string;
    time: string;
    image: string;
    coinSymbol?: string;
    coinChange?: number;
    slug?: string;
    category?: string;
    excerpt?: string;
}

export const mockNews: NewsItem[] = [
    {
        id: '1',
        title: 'Bir siber saldırı yetti: Truebit (TRU) dakikalar içinde dibi boyladı',
        source: 'CoinTelegraph Turkey',
        time: '11 dakika önce',
        image: 'https://images.cointelegraph.com/images/840_aHR0cHM6Ly9pbWFnZXMuY29pbnRlbGVncmFwaC5jb20vaW1hZ2VzLzEyMDBfZUhRWmRHOXlaV3d2T0dJM01qZzRPV0V4TXpZM05qZ3pPREZsWm1NMGJtSTRaajA5SWp4bWIzSnRiaUk2SW5CdmMyd2lPakkzZlE9PS5qcGc=.jpg',
        coinSymbol: 'TRU',
        coinChange: -12.4
    },
    {
        id: '2',
        title: 'Son Dakika: ABD Yüksek Mahkemesi Gümrük Tarifesi Kararı Ne Oldu?',
        source: 'Cointurk',
        time: '27 dakika önce',
        image: 'https://cointurk.com/wp-content/uploads/2024/02/dolar-kripto-4.jpg',
    },
    {
        id: '3',
        title: 'Bitcoin Cash 400 Dolar Olur Mu? Analistlerin Bitcoin Tahminleri Ne?',
        source: 'Cointurk',
        time: 'yaklaşık 1 saat önce',
        image: 'https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjMtMDQvN2QxMzQ4ODgtN2VlNC00YjI5LTk4ZTMtNjE2YTMwOGI1NjE1LmpwZw==.jpg',
        coinSymbol: 'BTC',
        coinChange: 0.4
    },
    {
        id: '4',
        title: 'Maduro bahsiyle 400 bin dolar kazanan kullanıcı ortadan kayboldu',
        source: 'CoinTelegraph Turkey',
        time: 'yaklaşık 1 saat önce',
        image: 'https://images.cointelegraph.com/images/840_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjQtMTEvOWFkMzVlYTMtMTJkZS00MjVjLThiOTktOGViYzEyOTk1MmM1LmpwZw==.jpg'
    },
    {
        id: '5',
        title: 'Bitcoin (BTC) Boğa Sezonuna Hazırlanıyor: 100.000 Dolar Hedefi Gerçekçi mi?',
        source: 'KriptoParalar Analiz',
        time: '10 Ocak 2026',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop',
        slug: 'bitcoin-boga-sezonu-hazirliklari-100-bin-dolar-hedefi',
        category: 'Analiz',
        excerpt: 'Kripto para piyasasının lideri Bitcoin, kurumsal alımlar ve yaklaşan halving döngüsüyle yeni bir boğa koşusuna hazırlanıyor.'
    },
    {
        id: '6',
        title: "Türkiye'de Kripto Para Düzenlemesi: Yeni Yasa Tasarısı Neler Getiriyor?",
        source: 'KriptoParalar Mevzuat',
        time: '9 Ocak 2026',
        image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1974&auto=format&fit=crop',
        slug: 'turkiye-kripto-para-duzenlemesi-yasa-tasarisi-detaylari',
        category: 'Düzenleme',
        excerpt: 'TBMM gündemindeki yeni kripto varlık yasa tasarısı, borsalara lisans zorunluluğu ve vergilendirme konularını içeriyor.'
    },
    {
        id: '7',
        title: 'Ethereum ETF Onayı Bekleniyor: Altcoin Rallisi Başlayacak mı?',
        source: 'KriptoParalar Piyasa',
        time: '8 Ocak 2026',
        image: 'https://images.unsplash.com/photo-1622790698141-94e30457ef12?q=80&w=2072&auto=format&fit=crop',
        slug: 'ethereum-etf-onayi-altcoin-rallisi-basliyor-mu',
        category: 'Altcoinler',
        excerpt: "ABD SEC'in Ethereum Spot ETF başvurularını onaylaması beklenirken, piyasada altcoin rallisi beklentisi artıyor."
    }
];
