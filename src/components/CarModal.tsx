
function CarModal({ car, onClose }) {
  return (
    <div className="modalBackdrop">
      <div className="carModal">
        <div className="modalHeader">
          <h3>Редактирование автомобиля</h3>
          <button className="closeButton" onClick={onClose}>
            Закрыть
          </button>
        </div>
        
        <div className="modalBody">
          <div className="inputGroup">
            <label>Название:</label>
            <input value={car.name} />
          </div>
          
          <div className="inputGroup">
            <label>Модель:</label>
            <input value={car.model} />
          </div>
          
          <div className="inputGroup">
            <label>Год выпуска:</label>
            <input value={car.year} />
          </div>
          
          <div className="inputGroup">
            <label>Цвет:</label>
            <input value={car.color} />
          </div>
          
          <div className="inputGroup">
            <label>Цена ($):</label>
            <input value={car.price} />
          </div>
          
          <div className="inputGroup">
            <label>Широта:</label>
            <input value={car.latitude} />
          </div>
          
          <div className="inputGroup">
            <label>Долгота:</label>
            <input value={car.longitude} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarModal;