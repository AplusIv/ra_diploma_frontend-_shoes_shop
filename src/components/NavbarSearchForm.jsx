import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSearchField } from "../constants/actions";

import { toggleVisibility } from "../constants/actions";

const NavbarSearchForm = () => {
  // redux
  const { invisibleSearchField, searchField } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    // e.preventDefault();
    const { value } = e.target;
    console.log(value);
    dispatch(changeSearchField(value));
    // changeSearchField(value);
  };

  const handleSearch = (e) => {
    // в склейке с NavbarControls handleSubmit
    e.preventDefault();
    if (searchField && invisibleSearchField == false) {
      console.log("navigate to Catalog");
      navigate("/catalog");
    }
    // dispatch(toggleVisibility());
  };

  return invisibleSearchField ? (
    <Form
      onSubmit={handleSearch}
      data-id="search-form"
      className="header-controls-search-form d-inline invisible"
    >
      {/* <input className="form-control" placeholder="Поиск" /> */}
      <Form.Control
        type="search"
        placeholder="Поиск"
        className="form-control"
        aria-label="Search"
        onChange={handleChange}
        value={searchField}
      />
    </Form>
  ) : (
    <Form
      onSubmit={handleSearch}
      data-id="search-form"
      className="header-controls-search-form d-inline"
    >
      {/* <input className="form-control" placeholder="Поиск" /> */}
      <Form.Control
        type="search"
        placeholder="Поиск"
        className="form-control"
        aria-label="Search"
        onChange={handleChange}
        value={searchField}
      />
    </Form>
  );
};

export default NavbarSearchForm;

/* // legacy redux
const mapStateToProps = (state) => {
  return {
    searchField: state.search.searchField,
    invisibleSearchField: state.search.invisibleSearchField,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSearchField: (text) => {
      dispatch({ type: CHANGE_SEARCHFIELD, text });
    },
    toggleVisibility: () => {
      dispatch({ type: TOGGLE_VISIBILITY });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarSearchForm); */
