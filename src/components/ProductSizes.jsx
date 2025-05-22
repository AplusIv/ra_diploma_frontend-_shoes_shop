const ProductSizes = ({ availableSizes }) => {
  return availableSizes.map((availableSize) =>
    !isSelected ? (
      <span
        className="catalog-item-size"
        onClick={() => setIsSelected(!isSelected)}
      >
        {availableSize.size}
      </span>
    ) : (
      <span
        className="catalog-item-size selected"
        onClick={() => setIsSelected(!isSelected)}
      >
        {availableSize.size}
      </span>
    )
  );
};

export default ProductSizes;
