import { Alert } from "react-bootstrap";

interface AlertMessageProps {
  message: string;
}

export const AlertMessage = ({ message }: AlertMessageProps) => {
  return (
    <div className="d-flex mt-1" style={{ marginBottom: ".2rem" }}>
      <Alert variant="warning" style={{ padding: ".1rem", margin: ".0rem" }}>
        {message}
      </Alert>
    </div>
  );
};
