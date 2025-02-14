import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Kopi",
    quantity: 5,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 5,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <GroceryList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Footer />
    </div>
  );
}

function Header() {
  return <h1>Daftar Belanjaku</h1>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;

    const newItem = { name, quantity, checked: false, id: Date.now() };
    onAddItem(newItem);

    console.log(newItem);
  }

  const quantityNum = [...Array(20)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
    </option>
  ));

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          {quantityNum}
        </select>
        <input
          type="text"
          placeholder="nama barang..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button>Tambah</button>
    </form>
  );
}

function GroceryList({ items, onDeleteItem, onToggleItem }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="stats">
      Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)
    </footer>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}
