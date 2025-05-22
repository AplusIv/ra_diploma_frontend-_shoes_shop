import { Nav } from "react-bootstrap";

const Categories = ({ categories, activeKey, handleSelect }) => {
  return (
    <Nav
      as="ul"
      className="catalog-categories justify-content-center"
      activeKey={activeKey}
      // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      onSelect={handleSelect}
    >
      <Nav.Item as="li">
        <Nav.Link eventKey="all" href="#">
          Все
        </Nav.Link>
      </Nav.Item>
      {categories.map((category) => (
        <Nav.Item key={category.id} as="li">
          <Nav.Link eventKey={`${category.id}`} href="#">
            {category.title}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default Categories;
