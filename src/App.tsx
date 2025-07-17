import { useState, useEffect } from 'react';
import CarModal from './components/CarModal';

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
  const [showModal, setShowModal] = useState(false);
  const [targetCar, setTargetCar] = useState<Car>();
  const [sortConfig, setSortConfig] = useState<{ key: keyof Car | null; direction: 'ascending' | 'descending' }>({
    key: null,
    direction: 'ascending',
  });

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
        console.log(err);
      }
    };

    fetchData();
  }, []);

  function updateCar(targetCar: Car) {
    setCars(cars.map(car => car.id === targetCar.id ? targetCar : car));
  }

  function deleteCar(targetCar: Car) {
    setCars(cars.filter((car) => car.id !== targetCar.id));
  }

  const handleSort = (key: keyof Car) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedCars = [...cars].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  return (
    <div className="container">
      {showModal && targetCar && (
        <CarModal
          targetCar={targetCar}
          onClose={() => setShowModal(false)}
          onSave={updateCar}
          onDelete={deleteCar}
        />
      )}
      <h1 className="title">Панель управления</h1>

      <div className="table-container">
        <table className="car-table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Модель</th>
              <th scope="col" className='cursor-pointer' onClick={() => handleSort('year')}>
                Год {sortConfig.key === 'year' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th scope="col">Цвет</th>
              <th scope="col" className='cursor-pointer' onClick={() => handleSort('price')}>
                Цена {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th scope="col">Широта</th>
              <th scope="col">Долгота</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {sortedCars.map((car) => (
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
                <td
                  className="cursor-pointer"
                  onClick={() => {
                    setShowModal(true);
                    setTargetCar(car);
                  }}
                >
                  Изменить
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;