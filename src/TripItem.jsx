import React from 'react'

const TripItem = () => {
  const [items, setItems] = React.useState([{
    id: 1, itemName: "Passports", quantity: 2, packed: true
  },
  {
    id: 2, itemName: "Sunglasses", quantity: 1, packed: false
  }]);

  const addTripItem = (item) => {
    setItems([...items, item]);
  }

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  }
  const toggleCheckedBox = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }
      return item;
    }));
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-100 via-blue-50 to-teal-100 flex items-start justify-center pt-[10vh]">
      <div className="w-full max-w-xl p-4 space-y-6 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <Header />
        {/* Form */}
        <Form addTripItem={addTripItem} />
        {/* Trip List Items */}
        <TripListItems tripItems={items} deleteItem={deleteItem} toggleCheckedBox={toggleCheckedBox} />
        {/* Summary */}
        <Summary tripItems={items} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="text-center">
      <h1 className="text-3xl font-bold text-teal-600">🌴 TRIP AWAY 🧳</h1>
      <p className="text-gray-700 mt-2">What do you want for your 😘 trip?</p>
    </header>
  )
}

function Form({ addTripItem }) {
  const [itemName, setItemName] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName === "") return;
    const id = Date.now().toLocaleString();
    addTripItem({ id, quantity, itemName: itemName, packed: false });
    setItemName("");
    setQuantity(1);
  };
  return (<form className="flex flex-col sm:flex-row items-center gap-3" onSubmit={handleSubmit}>
    <select className="w-full sm:w-20 px-3 py-2 border rounded-md text-gray-700" value={quantity} onChange={e => setQuantity(e.target.value)}>
      {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (<option key={num} value={num}>{num}</option>))}
    </select>
    <input
      type="text"
      placeholder="Item..."
      value={itemName}
      onChange={e => setItemName(e.target.value)}
      className="flex px-3 py-2 border rounded-md text-gray-700"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
    >
      Add
    </button>
  </form>)
}

function TripListItems({ tripItems, deleteItem, toggleCheckedBox }) {
  return (
    <>
      <div className="overflow-x-auto" >
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-teal-600 text-white text-left">
              <th className="p-3">Packed</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Item</th>
              <th className="p-3 text-right">Remove</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {tripItems.length > 0 ? tripItems.map(item => (
              <tr key={item.id}>
                <td className="p-3">
                  <input type="checkbox" defaultChecked={item.packed} onClick={() => toggleCheckedBox(item.id)} className="accent-teal-600 w-5 h-5" />
                </td>
                <td className="p-3 font-medium text-gray-700">{item.quantity}</td>
                <td className={`p-3 text-gray-800 ${item.packed ? 'line-through text-gray-500' : ''}`}>{item.itemName}</td>
                <td className="p-3 text-right">
                  <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700 text-xl font-bold">×</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">No items added yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Otherway in list format: */}
      {/* {tripItems.length === 0 && (
        <p className="text-gray-500 mx-10">No items added yet</p>
      )}
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tripItems.map(item => (
          <li key={item.id} class="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow">
            <div class="flex items-center gap-2">
              <input type="checkbox" checked={item.packed} onClick={() => toggleCheckedBox(item.id)} class="accent-teal-500" />
              <span class={`text-gray-800 ${item.packed ? 'line-through text-gray-500' : ''}`}>{item.quantity} {item.itemName}</span>
            </div>
            <button onClick={() => deleteItem(item.id)} class="text-red-500 hover:text-red-700 text-xl font-bold">×</button>
          </li>
        ))}
      </ul> */}
    </>
  )
}

function Summary({ tripItems }) {
  const totalItems = tripItems.length;
  const packedItems = tripItems.filter(item => item.packed).length;
  const percentPacked = totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="text-center text-md font-semibold text-gray-600">
      You have already packed <span className="font-semibold text-teal-600">{packedItems} items ({percentPacked}%)</span> out of total <span className="font-semibold">{totalItems} items</span> on your list.
    </footer>
  )
}

export default TripItem


