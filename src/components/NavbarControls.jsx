import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toggleVisibility } from "../constants/actions";

const NavbarControls = () => {
  // redux
  const { invisibleSearchField, searchField } = useSelector(
    (state) => state.search
  );
  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(products); // товары в корзине (глобальный стейт)

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchField && invisibleSearchField == false) {
      console.log("navigate to Catalog");
      navigate("/catalog");
    }
    dispatch(toggleVisibility());
  };

  return (
    <Nav className="header-controls-pics">
      <Nav.Link
        data-id="search-expander"
        className="header-controls-pic header-controls-search"
        // onClick={handleShowSearchForm}
        onClick={handleSearch}
      ></Nav.Link>
      {/* <!-- Do programmatic navigation on click to /cart.html --> */}
      <Nav.Link
        as={Link}
        to="/cart"
        className="header-controls-pic header-controls-cart"
      >
        {/* <div className="header-controls-cart-full">4</div> */}
        {products.length > 0 ? (
          <div className="header-controls-cart-full">{products.length}</div>
        ) : null}
        <div className="header-controls-cart-menu"></div>
      </Nav.Link>
    </Nav>
  );
};

export default NavbarControls;

/* // redux legacy
const mapStateToProps = (state) => {
  return {
    products: state.cart.products,
    searchField: state.search.searchField,
    invisibleSearchField: state.search.invisibleSearchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleVisibility: () => {
      dispatch({ type: TOGGLE_VISIBILITY });
    },
    // searchProducts: () => {
    //   dispatch({ type: SEARCH_PRODUCTS });
    // },
  };
};

// export default NavbarControls;
export default connect(mapStateToProps, mapDispatchToProps)(NavbarControls); */
