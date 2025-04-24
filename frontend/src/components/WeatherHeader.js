export default function WeatherHeader({ username, weather, temperature }) {
    return (
      <div className="flex justify-between items-center mb-4 px-4">
        <div>
          <h2 className="text-lg text-indigo-500 font-semibold">Hello, {username}</h2>
          <p>Today's Weather: {weather}</p>
        </div>
        <h1 className="text-3xl font-bold">{temperature}°F</h1>
      </div>
    );
  }
  