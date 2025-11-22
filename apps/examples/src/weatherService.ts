import axios from "axios";

type WeatherData = Array<{
  location: {
    name: string;
  };
  current: {
    temperature: string;
    skytext: string;
  };
  forecast: Array<{
    low: string;
    high: string;
    skytextday: string;
    shortday: string;
  }>;
}>;

export async function getWeather(place: string): Promise<string> {
  const url = `https://api.popcat.xyz/weather?q=${place}`;

  try {
    const response = await axios.get<WeatherData>(url);

    const weatherData = response.data[0];

    if (!weatherData) {
      throw new Error("Unable to fetch weather data");
    }

    const { location, current, forecast } = weatherData;

    const forecastString = forecast
      .map(
        (day) =>
          `${day.shortday}: ${day.skytextday}, ${day.low}°C - ${day.high}°C`,
      )
      .join("\n");

    return `Weather in ${location.name}: ${current.temperature}°C, ${current.skytext}\n\n${forecastString}`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Unable to fetch weather data");
  }
}
