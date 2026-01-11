import type { Crypto } from '../../data/mockCryptos';

export function getSmartSummary(coin: Crypto): string {
    const isUp = coin.change24h >= 0;

    // Base template
    let summary = `${coin.name} (${coin.symbol}), güncel olarak ₺${coin.price.toLocaleString('tr-TR')} fiyatından işlem gören ve son 24 saatte %${Math.abs(coin.change24h).toFixed(2)} oranında bir ${isUp ? 'değer kazanan' : 'değer kaybeden'} dijital varlıktır. `;

    // Archetype specific content
    if (coin.category.includes('layer-1') || coin.category.includes('layer-0')) {
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

    if (coin.category.includes('pow')) {
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
