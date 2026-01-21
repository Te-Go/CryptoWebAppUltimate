import type { Crypto } from '../../data/mockCryptos';

export function getSmartSummary(coin: Crypto): string {
    const isUp = coin.change24h >= 0;

    // Base template
    let summary = `${coin.name} (${coin.symbol}), güncel olarak ₺${coin.price.toLocaleString('tr-TR')} fiyatından işlem gören ve son 24 saatte %${Math.abs(coin.change24h).toFixed(2)} oranında bir ${isUp ? 'değer kazanan' : 'değer kaybeden'} dijital varlıktır. `;

    // Archetype specific content
    if (coin.category.includes('stablecoin')) {
        summary += `${coin.name}, ABD Doları'na 1:1 oranında sabitlenmiş bir stablecoin'dir. Kripto piyasasındaki volatiliteden korunmak isteyen yatırımcılar için güvenli liman görevi görür. Teminat rezervleri düzenli olarak denetlenmektedir.`;
    } else if (coin.category.includes('exchange-token') || coin.category.includes('exchange')) {
        summary += `${coin.name}, büyük bir kripto para borsasının yerel yardımcı tokenidir. Token sahipleri işlem ücretlerinde indirim, launchpad erişimi ve özel VIP avantajlarından yararlanır. Borsa düzenli olarak token yakımı gerçekleştirerek arzı deflasyonist tutmaktadır.`;
    } else if (coin.category.includes('layer-1') || coin.category.includes('layer-0')) {
        summary += `${coin.name}, kendi blockchain ağına sahip bir Layer-1 projesidir. Ağ güvenliği, merkeziyetsizlik ve ölçeklenebilirlik konularında sunduğu çözümlerle ekosistemin temel taşlarından biridir. Madencilik veya staking mekanizmaları ile ağın sürekliliği sağlanır.`;
    } else if (coin.category.includes('defi')) {
        summary += `${coin.name}, Merkeziyetsiz Finans (DeFi) ekosisteminin önemli bir parçasını oluşturur. Kullanıcılara bankacılık sistemine ihtiyaç duymadan finansal işlem yapma özgürlüğü sunan protokolün yerel yönetişim ve fayda tokenidir.`;
    } else if (coin.category.includes('meme')) {
        summary += `${coin.name}, güçlü topluluk desteği ve sosyal medya etkileşimi ile öne çıkan popüler bir meme projesidir. Genellikle internet kültürü ve mizah üzerine kurulu olan bu varlık, yüksek volatilite ve viral büyüme potansiyeli taşır.`;
    } else if (coin.category.includes('ai')) {
        summary += `${coin.name}, Yapay Zeka (AI) ve Blockchain teknolojilerini birleştiren yenilikçi bir projedir. Veri işleme, model eğitimi ve merkeziyetsiz hesaplama gücü gibi alanlarda sunduğu çözümlerle geleceğin teknolojisine öncülük etmektedir.`;
    } else if (coin.category.includes('gaming') || coin.category.includes('metaverse')) {
        summary += `${coin.name}, Blockchain tabanlı oyun ve Metaverse dünyasının yerel para birimidir. Oyunculara dijital varlık mülkiyeti ve oyun içi ekonomi yönetimi gibi Web3 avantajları sunar.`;
    } else {
        summary += `Yüksek piyasa değeri ve likiditesi ile yatırımcıların dikkatini çeken ${coin.name}, kripto para piyasasının dinamik yapısında önemli bir konuma sahiptir.`;
    }

    return summary;
}

export function getSmartFAQs(coin: Crypto): { question: string, answer: string }[] {
    const faqs = [
        {
            question: `${coin.name} (${coin.symbol}) nedir?`,
            answer: getSmartSummary(coin)
        },
        {
            question: `${coin.name} güvenilir mi?`,
            answer: `${coin.name}, piyasa değeri ve işlem hacmi bakımından dünyanın en büyük kripto paralarından biridir. Blockchain teknolojisi sayesinde işlemler şeffaf ve güvenli bir şekilde kaydedilir.`
        }
    ];

    // Archetype-specific FAQs for Template Entropy
    if (coin.category.includes('stablecoin')) {
        faqs.push({
            question: `${coin.name} dolar paritesini nasıl koruyor?`,
            answer: `${coin.name}, 1:1 oranında USD rezervleri ile teminatlandırılmıştır. Teminat varlıkları bağımsız denetim firmaları tarafından düzenli olarak doğrulanır ve raporlanır.`
        });
        faqs.push({
            question: `${coin.name} de-peg riski taşıyor mu?`,
            answer: `Tam teminatlı stablecoin'ler genellikle düşük de-peg riski taşır. Ancak algoritmik veya kısmi teminatlı alternatiflerde bu risk daha yüksek olabilir.`
        });
    } else if (coin.category.includes('exchange-token') || coin.category.includes('exchange')) {
        faqs.push({
            question: `${coin.name} burn mekanizması nasıl çalışıyor?`,
            answer: `Borsa, üç ayda bir işlem ücretlerinden elde ettiği gelirin bir kısmını kullanarak ${coin.symbol} tokenleri satın alır ve kalıcı olarak yakar. Bu deflasyonist mekanizma token değerini destekler.`
        });
        faqs.push({
            question: `${coin.name} tutmanın avantajları nelerdir?`,
            answer: `${coin.symbol} sahipleri işlem ücretlerinde %25'e varan indirim, yeni token satışlarına (Launchpad) erken erişim ve VIP müşteri hizmetleri avantajlarından yararlanır.`
        });
    } else if (coin.category.includes('meme')) {
        faqs.push({
            question: `${coin.name} pump-and-dump riski taşıyor mu?`,
            answer: `Meme coin'ler doğası gereği yüksek volatiliteye sahiptir. ${coin.name} güçlü bir topluluğa sahip olsa da, yatırım yapmadan önce kendi araştırmanızı (DYOR) yapmanız önerilir.`
        });
        faqs.push({
            question: `${coin.name} topluluğu ne kadar aktif?`,
            answer: `${coin.name} topluluğu sosyal medyada oldukça aktiftir. Twitter, Reddit ve Telegram gruplarında binlerce aktif üye bulunmaktadır.`
        });
    } else if (coin.category.includes('ai')) {
        faqs.push({
            question: `${coin.name} yapay zeka teknolojisini nasıl kullanıyor?`,
            answer: `${coin.name}, merkeziyetsiz yapay zeka hesaplama gücü, model eğitimi pazarı veya AI destekli tahmin sistemleri gibi çözümler sunmaktadır.`
        });
    } else if (coin.category.includes('pow')) {
        faqs.push({
            question: `${coin.name} madenciliği nasıl yapılır?`,
            answer: `${coin.name}, Proof-of-Work (PoW) algoritması kullanır. Madencilik yapmak için ASIC cihazlar veya güçlü ekran kartları (GPU) kullanılarak ağdaki işlemler doğrulanır ve ödül kazanılır.`
        });
    } else {
        faqs.push({
            question: `${coin.name} staking nasıl yapılır?`,
            answer: `${coin.name} ağına destek olmak ve pasif gelir elde etmek için borsalar üzerinden veya kendi cüzdanınızdan staking yapabilirsiniz. Staking, ağı güvence altına alan doğrulayıcılara destek olmayı içerir.`
        });
    }

    return faqs;
}

