import { useState } from "react";

function CarModal({ targetCar, onClose, onSave, onDelete }) {
  const [car, setCar] = useState(targetCar);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSave = () => {
    onSave(car);
    onClose();
  };

  return (
    <div className="modalBackdrop">
      <div className="carModal">
        <div className="modalHeader">
          <button className="closeButton" onClick={handleSave}>
            Сохранить
          </button>
          <button className="closeButton" onClick={() => {onDelete(car), onClose()}}>
             Удалить
          </button>
          <button className="closeButton" onClick={onClose}>
            Закрыть
          </button>
        </div>
        
        <div className="modalBody">
          <div className="inputGroup">
            <label>Название:</label>
            <input 
              name="name" 
              value={car.name} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="inputGroup">
            <label>Модель:</label>
            <input 
              name="model" 
              value={car.model} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="inputGroup">
            <label>Год выпуска:</label>
            <input 
              name="year" 
              value={car.year} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="inputGroup">
            <label>Цвет:</label>
            <input 
              name="color" 
              value={car.color} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="inputGroup">
            <label>Цена ($):</label>
            <input 
              name="price" 
              value={car.price} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="inputGroup">
            <label>Широта:</label>
            <input 
              name="latitude" 
              value={car.latitude} 
              onChange={handleInputChange} 
            />
          </div>
          
          <div className="inputGroup">
            <label>Долгота:</label>
            <input 
              name="longitude" 
              value={car.longitude} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarModal;