export interface EducationArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML content or Markdown
    category: 'Analysis' | 'Security' | 'Technology' | 'Basics';
    author: string;
    date: string;
    readTime: string;
    image: string;
}

export const mockEducationArticles: EducationArticle[] = [
    {
        id: '1',
        title: 'Kripto Para Nedir? Yeni Başlayanlar İçin Kapsamlı Rehber',
        slug: 'kripto-para-nedir-rehber',
        excerpt: 'Blockchain teknolojisi, Bitcoin ve altcoinlerin çalışma mantığı. Kripto dünyasına ilk adımınızı atın ve temel kavramları öğrenin.',
        category: 'Basics',
        author: 'Emre Yılmaz',
        date: '12 Ocak 2026',
        readTime: '6 dk',
        image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop',
        content: `
            <p class="lead text-lg text-text-secondary mb-6">Kripto paralar, herhangi bir merkezi otoriteye (devlet veya banka gibi) bağlı olmadan çalışan dijital varlıklardır. Güvenliğini kriptografi (şifreleme) biliminden alır ve genellikle Blockchain (Blokzinciri) adı verilen dağıtık bir defter teknolojisi üzerinde işlem görür.</p>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">1. Merkeziyetsizlik (Decentralization)</h2>
            <p class="text-text-secondary mb-6">Geleneksel bankacılık sisteminde paranız bankanın kontrolündedir. Kripto paralarda ise varlıklarınızın kontrolü tamamen sizdedir. Aracıların ortadan kalkması, işlem maliyetlerini düşürür ve sansüre karşı direnç sağlar.</p>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">Bitcoin: İlk Kripto Para</h2>
            <p class="text-text-secondary mb-6">2009 yılında Satoshi Nakamoto takma adlı kişi veya grup tarafından yayınlanan Bitcoin, ilk başarılı kripto para birimidir. Amacı, uçtan uca (peer-to-peer) elektronik nakit sistemi oluşturmaktır. Sınırlı arzı (21 milyon) nedeniyle "Dijital Altın" olarak da adlandırılır.</p>

            <blockquote class="border-l-4 border-neon-cyan pl-4 py-2 my-8 bg-bg-tertiary/30 italic text-text-primary">
                "Kripto paralar, paranın internet çağına evrimidir."
            </blockquote>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">Peki Değeri Nereden Geliyor?</h2>
            <p class="text-text-secondary mb-6">Kripto paraların değeri, arz-talep dengesi, teknolojik altyapısı, topluluk desteği ve kullanım alanlarına göre belirlenir. Herhangi bir fiziksel karşılığı yoktur, değeri kullanıcıların ona atfettiği güvendir.</p>
        `
    },
    {
        id: '2',
        title: 'Kripto Yatırımlarınızı Nasıl Korursunuz? Güvenlik 101',
        slug: 'kripto-guvenlik-rehberi',
        excerpt: 'Soğuk cüzdan kullanımı, 2FA önemi ve oltalama (phishing) saldırılarından korunma yöntemleri. Varlıklarınızı güvende tutun.',
        category: 'Security',
        author: 'Canan Demir',
        date: '15 Ocak 2026',
        readTime: '5 dk',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2032&auto=format&fit=crop',
        content: `
            <p class="lead text-lg text-text-secondary mb-6">Kripto para dünyasında "Kendi bankan ol" felsefesi hakimdir. Bu özgürlük, aynı zamanda büyük bir sorumluluk getirir. Şifrenizi kaybederseniz, varlıklarınıza erişimi sonsuza dek kaybedebilirsiniz.</p>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">Sıcak Cüzdan vs. Soğuk Cüzdan</h2>
            <p class="text-text-secondary mb-6">
                <strong>Sıcak Cüzdanlar (Hot Wallets):</strong> İnternete bağlı cüzdanlardır (Örn: MetaMask, Borsalar). Hızlı işlem için uygundur ancak siber saldırı riski taşır.<br/><br/>
                <strong>Soğuk Cüzdanlar (Cold Wallets):</strong> İnternet bağlantısı olmayan fiziksel cihazlardır (Örn: Ledger, Trezor). Uzun vadeli saklama için en güvenli yöntemdir.
            </p>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">Phishing (Oltalama) Saldırıları</h2>
            <p class="text-text-secondary mb-6">Size "MetaMask desteği" gibi görünen sahte e-postalar veya mesajlar atılabilir. Asla 12 kelimelik gizli kurtarma şifrenizi (Seed Phrase) kimseyle paylaşmayın ve hiçbir web sitesine girmeyin.</p>
        `
    },
    {
        id: '3',
        title: 'Blockchain Teknolojisi Nasıl Çalışır?',
        slug: 'blockchain-nasil-calisir',
        excerpt: 'Blokzinciri veritabanı yapısı, madencilik (mining), konsensus mekanizmaları ve akıllı kontratların temelleri.',
        category: 'Technology',
        author: 'Mehmet Yılmaz',
        date: '10 Ocak 2026',
        readTime: '7 dk',
        image: 'https://images.unsplash.com/photo-1639322537228-ad71059f1fdb?q=80&w=1932&auto=format&fit=crop',
        content: `
            <p class="lead text-lg text-text-secondary mb-6">Blockchain, verilerin bloklar halinde birbirine zincirleme bağlandığı dağıtık bir veritabanı sistemidir. Bir bloktaki veri değiştirilmeye çalışıldığında, zincirdeki diğer tüm blokların kriptografik yapısı bozulur, bu da sistemi hacklenemez kılar.</p>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">PoW vs. PoS</h2>
            <p class="text-text-secondary mb-6">
                <strong>Proof of Work (İş Kanıtı):</strong> Bitcoin'in kullandığı yöntemdir. Madenciler karmaşık matematiksel problemleri çözmek için yüksek enerji harcar.<br/>
                <strong>Proof of Stake (Hisse Kanıtı):</strong> Ethereum'un kullandığı yöntemdir. Doğrulayıcılar, ellerindeki coinleri kilitleyerek (staking) ağ güvenliğini sağlar. Daha çevre dostudur.
            </p>

            <h2 class="text-2xl font-bold text-text-primary mt-8 mb-4">Akıllı Kontratlar</h2>
            <p class="text-text-secondary mb-6">Kod parçacıkları şeklinde yazılan ve belirli şartlar sağlandığında otomatik olarak çalışan sözleşmelerdir. DeFi (Merkeziyetsiz Finans) ekosisteminin temelini oluştururlar.</p>
        `
    }
];
