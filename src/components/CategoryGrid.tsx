/**
 * Komponen grid kategori untuk navigasi kategori produk
 */
import { categories } from '../data/products';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Kategori Populer</h2>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-orange-50 transition-colors group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-orange-200 transition-colors">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-sm text-gray-700 text-center font-medium">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
