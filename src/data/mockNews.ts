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
        image: 'https://picsum.photos/seed/crypto1/600/400',
        coinSymbol: 'TRU',
        coinChange: -12.4,
        category: 'Güvenlik'
    },
    {
        id: '2',
        title: 'Son Dakika: ABD Yüksek Mahkemesi Gümrük Tarifesi Kararı Ne Oldu?',
        source: 'Cointurk',
        time: '27 dakika önce',
        image: 'https://picsum.photos/seed/crypto2/600/400',
        category: 'Düzenleme'
    },
    {
        id: '3',
        title: 'Bitcoin Cash 400 Dolar Olur Mu? Analistlerin Bitcoin Tahminleri Ne?',
        source: 'Cointurk',
        time: 'yaklaşık 1 saat önce',
        image: 'https://picsum.photos/seed/bitcoin/600/400',
        coinSymbol: 'BTC',
        coinChange: 0.4,
        category: 'Analiz'
    },
    {
        id: '4',
        title: 'Maduro bahsiyle 400 bin dolar kazanan kullanıcı ortadan kayboldu',
        source: 'CoinTelegraph Turkey',
        time: 'yaklaşık 1 saat önce',
        image: 'https://picsum.photos/seed/prediction/600/400',
        category: 'Gündem'
    },
    {
        id: '5',
        title: 'Bitcoin (BTC) Boğa Sezonuna Hazırlanıyor: 100.000 Dolar Hedefi Gerçekçi mi?',
        source: 'KriptoParalar Analiz',
        time: '10 Ocak 2026',
        image: 'https://picsum.photos/seed/btcbull/600/400',
        slug: 'bitcoin-boga-sezonu-hazirliklari-100-bin-dolar-hedefi',
        category: 'Analiz',
        excerpt: 'Kripto para piyasasının lideri Bitcoin, kurumsal alımlar ve yaklaşan halving döngüsüyle yeni bir boğa koşusuna hazırlanıyor.'
    },
    {
        id: '6',
        title: "Türkiye'de Kripto Para Düzenlemesi: Yeni Yasa Tasarısı Neler Getiriyor?",
        source: 'KriptoParalar Mevzuat',
        time: '9 Ocak 2026',
        image: 'https://picsum.photos/seed/regulation/600/400',
        slug: 'turkiye-kripto-para-duzenlemesi-yasa-tasarisi-detaylari',
        category: 'Düzenleme',
        excerpt: 'TBMM gündemindeki yeni kripto varlık yasa tasarısı, borsalara lisans zorunluluğu ve vergilendirme konularını içeriyor.'
    },
    {
        id: '7',
        title: 'Ethereum ETF Onayı Bekleniyor: Altcoin Rallisi Başlayacak mı?',
        source: 'KriptoParalar Piyasa',
        time: '8 Ocak 2026',
        image: 'https://picsum.photos/seed/ethetf/600/400',
        slug: 'ethereum-etf-onayi-altcoin-rallisi-basliyor-mu',
        category: 'Altcoinler',
        excerpt: "ABD SEC'in Ethereum Spot ETF başvurularını onaylaması beklenirken, piyasada altcoin rallisi beklentisi artıyor."
    },
    {
        id: '8',
        title: 'Kripto Para Madenciliğinde Yeni Dönem: Yeşil Enerji Zorunluluğu',
        source: 'KriptoParalar Teknoloji',
        time: '7 Ocak 2026',
        image: 'https://picsum.photos/seed/mining/600/400',
        slug: 'kripto-para-madenciligi-yesil-enerji-zorunlulugu',
        category: 'Teknoloji',
        excerpt: 'Avrupa Birliği, kripto para madenciliği tesisleri için %100 yenilenebilir enerji kullanımını zorunlu kılan yeni bir düzenleme hazırlıyor.'
    },
    {
        id: '9',
        title: 'Solana Ağında Rekor İşlem Hacmi: Meme Coin Çılgınlığı Sürüyor',
        source: 'KriptoParalar Piyasa',
        time: '6 Ocak 2026',
        image: 'https://picsum.photos/seed/solanameme/600/400',
        slug: 'solana-agi-rekor-islem-hacmi-meme-coin',
        category: 'Altcoinler',
        excerpt: 'Solana ağındaki günlük işlem sayısı, yeni çıkan meme coinlerin etkisiyle tüm zamanların en yüksek seviyesine ulaştı.'
    },
    {
        id: '10',
        title: 'Web3 Oyun Sektörü 2026\'da Patlama Yapabilir: İşte Öne Çıkan Projeler',
        source: 'KriptoParalar Analiz',
        time: '5 Ocak 2026',
        image: 'https://picsum.photos/seed/gaming/600/400',
        slug: 'web3-oyun-sektoru-2026-beklentileri',
        category: 'Analiz',
        excerpt: 'GameFi projeleri, AAA kalitesinde oyunların piyasaya sürülmesiyle birlikte kitlelere ulaşmayı hedefliyor.'
    }
];
