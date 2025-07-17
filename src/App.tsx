import { useState, useEffect } from 'react'

export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

function App() {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ofc-test-01.tspb.su/test-task/vehicles');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Car[] = await response.json();
        setCars(data);
      } catch (err) {
        console.log(err)
      }
    }

  fetchData()
  }, []);

return (
    <div className="container">
      <h1 className="title">Панель управления</h1>
      
      <div className="table-container">
        <table className="car-table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Модель</th>
              <th scope="col">Год</th>
              <th scope="col">Цвет</th>
              <th scope="col">Цена</th>
              <th scope="col">Широта</th>
              <th scope="col">Долгота</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>
                  <div className="color-display">
                    <div 
                      className="color-box" 
                      style={{ backgroundColor: car.color }}
                    ></div>
                    {car.color}
                  </div>
                </td>
                <td>${car.price.toLocaleString()}</td>
                <td>{car.latitude.toFixed(4)}</td>
                <td>{car.longitude.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App
