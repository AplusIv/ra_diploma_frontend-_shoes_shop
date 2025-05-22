import { Button, CloseButton, InputGroup } from "react-bootstrap";

const PromoCode = ({ title, deletePromoCode }) => {
  return (
    <InputGroup className="mb-4">
      <div className="promocode-container">
        <Button variant="outline-success" size="lg">
          {title}
        </Button>
        <CloseButton className="close-button" onClick={deletePromoCode} />
      </div>
    </InputGroup>
  );
};

export default PromoCode;
