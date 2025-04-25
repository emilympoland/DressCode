export default function WeatherHeader({ username, weather, temperature }) {
  return (
    <div className="w-9/10 max-w-md bg-[#96A8FD] rounded-2xl p-4 mt-6 mb-6 flex items-center">
      <div>
        <h2 className="text-lg text-indigo-500 font-semibold font-alexandria">Hello, {username}</h2>
        <p className="font-bricolage font-extralight">Today's Weather: {weather}</p>
      </div>
      <div className="ml-auto flex items-center">
        <h1 className="text-3xl font-alexandria">{temperature}°F</h1>
      </div>
    </div>
  );
}