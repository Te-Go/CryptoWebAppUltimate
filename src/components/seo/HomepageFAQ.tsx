import { PeopleAlsoAsk } from '../seo/PeopleAlsoAsk';
import { SchemaMarkup } from './SchemaMarkup';

// General crypto market FAQs for the homepage
const homepageFAQs = [
    {
        question: 'Kripto para nedir?',
        answer: 'Kripto para, kriptografik güvenlik teknolojisi kullanılarak oluşturulan ve merkezi olmayan bir yapıda çalışan dijital para birimidir. Bitcoin, Ethereum ve diğer altcoinler bu kategoriye girer. Blokzinciri teknolojisi sayesinde işlemler şeffaf ve güvenli bir şekilde kaydedilir.',
    },
    {
        question: 'Bitcoin ve Ethereum arasındaki fark nedir?',
        answer: 'Bitcoin, dijital altın olarak görülen ve değer saklama amaçlı kullanılan ilk kripto paradır. Ethereum ise akıllı sözleşmeler (smart contracts) ve DeFi uygulamaları için tasarlanmış bir platformdur. Bitcoin madenciliğe dayalı (PoW), Ethereum ise Proof-of-Stake (PoS) konsensüs mekanizması kullanmaktadır.',
    },
    {
        question: 'Kripto para nasıl satın alınır?',
        answer: 'Türkiye\'de kripto para satın almak için BtcTurk, Paribu veya Binance TR gibi onaylı borsalarda hesap açabilirsiniz. IBAN ile TL yatırarak Bitcoin, Ethereum veya diğer altcoinleri alım satım yapabilirsiniz. İşlem öncesinde KYC (Kimlik Doğrulama) tamamlamanız gerekmektedir.',
    },
    {
        question: 'Altcoin nedir?',
        answer: 'Altcoin, Bitcoin dışındaki tüm kripto paraları tanımlamak için kullanılan bir terimdir. Ethereum (ETH), Solana (SOL), Cardano (ADA), XRP ve Dogecoin gibi yüzlerce altcoin mevcuttur. Her biri farklı teknolojik özelliklere ve kullanım alanlarına sahiptir.',
    },
    {
        question: 'Stablecoin nedir ve neden önemlidir?',
        answer: 'Stablecoin, değeri ABD Doları veya başka bir varlığa sabitlenmiş kripto paralardır. USDT (Tether) ve USDC en popüler stablecoinlerdir. Volatiliteden korunmak, borsa işlemlerinde köprü görevi görmek ve uluslararası transferler için kullanılırlar.',
    },
    {
        question: 'DeFi (Merkeziyetsiz Finans) nedir?',
        answer: 'DeFi, geleneksel bankaların yerine akıllı sözleşmeleri kullanan finansal uygulamalardır. Borç verme, staking, yield farming ve merkeziyetsiz borsalar (DEX) bu ekosistemin bir parçasıdır. Uniswap, Aave ve MakerDAO popüler DeFi protokollerindendir.',
    },
];

/**
 * Homepage FAQ Section
 * Displays general crypto market questions for SEO and user education
 */
export function HomepageFAQ() {
    return (
        <section className="mt-8 mb-8">
            <PeopleAlsoAsk
                faqs={homepageFAQs}
                title="Kripto Para Hakkında Sık Sorulan Sorular"
            />
            {/* Inject JSON-LD Schema for Google FAQ Snippet */}
            <SchemaMarkup type="faq" faqs={homepageFAQs} />
        </section>
    );
}
