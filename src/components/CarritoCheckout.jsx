import { useState } from "react";
import { Button, Alert, Spinner } from "react-bootstrap";

function CarritoCheckout({ carrito }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const items = carrito.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "ARS",
      }));

      const response = await fetch("https://tuservidor.com/api/mercadopago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok && data.init_point) {
        window.open(data.init_point, "_blank");
      } else {
        throw new Error(data?.msg || "No se pudo generar el link de pago.");
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      setErrorMsg("Ocurrió un error al generar el pago. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      <Button variant="success" onClick={handleCheckout} disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" /> Redirigiendo...
          </>
        ) : (
          "Finalizar compra"
        )}
      </Button>
    </div>
  );
}

export default CarritoCheckout.jsx;

