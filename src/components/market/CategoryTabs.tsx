import { useMarket } from '../../context/MarketContext';

export function CategoryTabs() {
    const { categories, selectedCategory, setSelectedCategory } = useMarket();

    return (
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-2">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`category-chip ${selectedCategory === category.id ? 'active' : ''
                        }`}
                >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                </button>
            ))}
        </div>
    );
}
