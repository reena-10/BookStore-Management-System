import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Checkout({
  cart,
  removeFromCart,
  clearCart,
  closeCheckout,
  userInfo,
}) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    name: userInfo?.name || "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      alert("Please login to place an order!");
      return;
    }

    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          name: item.title,
          qty: 1,
          price: item.price,
          book: item._id,
        })),
        shippingAddress: {
          address: shipping.address,
          city: shipping.city,
          postalCode: shipping.postalCode,
          country: shipping.country,
        },
        paymentMethod: "Cash On Delivery",
        totalPrice: totalPrice,
      };

      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

      await axios.post("http://localhost:5000/api/orders", orderData, config);

      setStep(3);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Check console.");
    }
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        className="checkout-card"
        style={{
          background: "var(--bg-body)",
          padding: "40px",
          borderRadius: "24px",
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid var(--border)",
        }}
      >
        {/* STEP 1: CART ITEMS LIST */}
        {step === 1 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>Your Cart 🛒</h2>
              <button
                onClick={closeCheckout}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--text-main)",
                }}
              >
                ✖
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <h3 style={{ color: "var(--text-muted)" }}>Cart is empty!</h3>
              </div>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 0",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <img
                        src={item.imageUrl || "https://via.placeholder.com/50"}
                        alt="book"
                        style={{
                          width: "50px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                      <div>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        <p
                          style={{
                            margin: 0,
                            color: "var(--text-muted)",
                            fontSize: "0.9rem",
                          }}
                        >
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    fontSize: "1.3rem",
                    fontWeight: "800",
                  }}
                >
                  <span>Total Amount:</span>
                  <span style={{ color: "var(--primary)" }}>₹{totalPrice}</span>
                </div>
                <button
                  onClick={() => {
                    userInfo ? setStep(2) : alert("Please Login First!");
                  }}
                  className="btn-primary"
                  style={{ width: "100%", marginTop: "30px", padding: "15px" }}
                >
                  Proceed to Buy
                </button>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>Delivery Details 📍</h2>
              <button
                onClick={() => setStep(1)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-main)",
                  fontWeight: "bold",
                }}
              >
                ← Back
              </button>
            </div>

            <form
              onSubmit={handlePlaceOrder}
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <input
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "inherit",
                }}
                placeholder="Customer Name"
                required
                value={shipping.name}
                onChange={(e) =>
                  setShipping({ ...shipping, name: e.target.value })
                }
              />
              <input
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "inherit",
                }}
                placeholder="Mobile Number"
                required
                type="tel"
                onChange={(e) =>
                  setShipping({ ...shipping, mobile: e.target.value })
                }
              />
              <input
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "inherit",
                }}
                placeholder="Full Address (House No, Street)"
                required
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
              />

              <div style={{ display: "flex", gap: "15px" }}>
                <input
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "inherit",
                  }}
                  placeholder="City"
                  required
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                />
                <input
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "inherit",
                  }}
                  placeholder="Pin/Postal Code"
                  required
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                />
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <input
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "inherit",
                  }}
                  placeholder="State"
                  required
                  onChange={(e) =>
                    setShipping({ ...shipping, state: e.target.value })
                  }
                />
                <input
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid var(--border)",
                    background: "var(--bg-card)",
                    color: "inherit",
                  }}
                  value="India"
                  disabled
                />
              </div>

              <div
                style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <strong>Amount to Pay: ₹{totalPrice}</strong> (Cash on Delivery)
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: "15px", fontSize: "1.1rem" }}
              >
                Confirm Order
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ fontSize: "5rem", marginBottom: "20px" }}>🎉</div>
            <h2 style={{ fontSize: "2.5rem", color: "var(--primary)" }}>
              Order Confirmed!
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                margin: "20px 0",
                fontSize: "1.1rem",
              }}
            >
              Thank you for shopping with BookBliss. Your books will be
              delivered to your address soon.
            </p>
            <button
              className="btn-primary"
              onClick={closeCheckout}
              style={{ padding: "12px 30px" }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
