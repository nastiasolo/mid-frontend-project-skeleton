import "./CategoryFilter.css";

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="filter-container">
      <label className="category-label" htmlFor="category-select">
        Filter by category:{" "}
      </label>
      <select
        className="category-select"
        id="category-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
