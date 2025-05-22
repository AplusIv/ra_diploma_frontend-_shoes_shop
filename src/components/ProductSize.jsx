import { useState } from "react";

const ProductSize = ({
  availableSize,
  isActive,
  index,
  setActiveIndex,
  handleSize,
}) => {
  // const [isSelected, setIsSelected] = useState(false);

  // return !isSelected ? (
  //   <span
  //     className="catalog-item-size"
  //     onClick={() => setIsSelected(!isSelected)}
  //   >
  //     {availableSize.size}
  //   </span>
  // ) : (
  //   <span
  //     className="catalog-item-size selected"
  //     onClick={() => setIsSelected(!isSelected)}
  //   >
  //     {availableSize.size}
  //   </span>
  // );
  // const [isSelected, setIsSelected] = useState(false);

  return !isActive ? (
    <span
      className="catalog-item-size"
      onClick={() => {
        setActiveIndex(index);
        // Обновить поле в продукте с размером
        handleSize(availableSize.size);
      }}
    >
      {availableSize.size}
    </span>
  ) : (
    <span
      className="catalog-item-size selected"
      // onClick={() => setActiveIndex(null)}
    >
      {availableSize.size}
    </span>
  );
};

export default ProductSize;
