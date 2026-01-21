export const normalizeString = (str: string): string => {
    return str
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/i/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c');
};

export const levenshteinDistance = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // increment along the first column of each row
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(
                        matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1 // deletion
                    )
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

/**
 * Searches for a crypto match.
 * @param query The user's search query
 * @param items List of items to search (must have name and symbol properties)
 * @returns { match: Item | null, suggestions: Item[] }
 */
export const searchCrypto = <T extends { name: string; symbol: string; id: string }>(
    query: string,
    items: T[]
): { exactMatch: T | null; bestMatch: T | null; suggestions: T[] } => {
    const normalizedQuery = normalizeString(query);

    // 1. Exact Match (checking name, symbol, id)
    const exactMatch = items.find(
        item =>
            normalizeString(item.id) === normalizedQuery ||
            normalizeString(item.symbol) === normalizedQuery ||
            normalizeString(item.name) === normalizedQuery
    );

    if (exactMatch) {
        return { exactMatch, bestMatch: exactMatch, suggestions: [] };
    }

    // 2. Fuzzy Search
    const candidates = items.map(item => {
        const nameDist = levenshteinDistance(normalizedQuery, normalizeString(item.name));
        const symbolDist = levenshteinDistance(normalizedQuery, normalizeString(item.symbol));
        // Give preference to matches at the start of the string
        const nameStartsWith = normalizeString(item.name).startsWith(normalizedQuery);
        const symbolStartsWith = normalizeString(item.symbol).startsWith(normalizedQuery);

        let score = Math.min(nameDist, symbolDist);

        // Boost score (lower is better) if it starts with the query
        if (nameStartsWith || symbolStartsWith) score -= 2;

        return { item, score };
    });

    // Sort by score (lower distance is better)
    candidates.sort((a, b) => a.score - b.score);

    // Filter reasonable matches (threshold depends on string length, simplified here)
    // Allow edit distance of 3 for longer words, 1-2 for shorter
    const threshold = normalizedQuery.length < 4 ? 1 : 3;
    const suggestions = candidates
        .filter(c => c.score <= threshold)
        .slice(0, 3)
        .map(c => c.item);

    const bestMatch = suggestions.length > 0 ? suggestions[0] : null;

    return { exactMatch: null, bestMatch, suggestions };
};
