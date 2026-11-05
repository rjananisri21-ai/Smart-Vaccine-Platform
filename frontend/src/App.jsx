import React, { useEffect, useState } from "react";

function App() {
  const [vaccines, setVaccines] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const API = "http://localhost:5000";

  async function loadVaccines() {
    try {
      const response = await fetch(`${API}/api/vaccines`);
      setVaccines(await response.json());
    } catch (error) {
      console.log("Unable to load vaccines");
    }
  }

  useEffect(() => {
    loadVaccines();
  }, []);

  async function addVaccine(e) {
    e.preventDefault();

    await fetch(`${API}/api/vaccines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        quantity: Number(quantity),
        expiryDate
      })
    });

    setName("");
    setQuantity("");
    setExpiryDate("");
    loadVaccines();
  }

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Smart Vaccine Distribution</h1>
      <h2>Vaccine Inventory Management</h2>

      <form onSubmit={addVaccine}>
        <input
          placeholder="Vaccine Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />

        <input
          type="date"
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
          required
        />

        <button type="submit">Add Vaccine</button>
      </form>

      <h2>Available Vaccines</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {vaccines.map(v => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.quantity}</td>
              <td>{v.expiryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;