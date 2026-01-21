import { capitalizeDescription, formatPop, getWeatherIconUrl, type Forecast } from '@/entities/open-weather';
import { CloudRain } from 'lucide-react';

export function WeatherForecast({ forecast }: { forecast: Forecast[] }) {
  return (
    <section className="rounded-xl bg-[#292d47] p-4 text-white md:rounded-2xl md:p-6" aria-labelledby="forecast-heading">
      <h2 id="forecast-heading" className="mb-3 text-base font-semibold md:mb-4 md:text-lg">
        향후 7일 예보
      </h2>

      <ul className="flex flex-col gap-2 md:gap-4">
        {forecast.map((item) => (
          <ForecastItem key={item.date.toString()} forecast={item} />
        ))}
      </ul>
    </section>
  );
}

function ForecastItem({ forecast }: { forecast: Forecast }) {
  const { date, minTemp, maxTemp, description, icon, dayName, pop } = forecast;

  const formatDate = (date: Date | string) => {
    // YYYYMMDD 형식인 경우
    if (typeof date === 'string' && date.length === 8) {
      const year = parseInt(date.substring(0, 4));
      const month = parseInt(date.substring(4, 6)) - 1;
      const day = parseInt(date.substring(6, 8));
      const dateObj = new Date(year, month, day);
      return dateObj.toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
      });
    }
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <li className="list-none">
      <div
        className="group flex flex-row items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/10 px-4 py-2 backdrop-blur-md transition-all hover:bg-white/15 md:gap-6 md:p-5"
        role="group"
        aria-label={`${dayName} 예보`}
      >
        <div className="flex items-center gap-3">
          <div className="relative" aria-hidden="true">
            <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-lg" />
            <img src={getWeatherIconUrl(icon)} alt="" className="relative size-12 drop-shadow-lg md:size-16" />
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-medium tracking-wider text-blue-200/80 uppercase md:text-xs">
              {formatDate(date)} ({dayName.charAt(0)})
            </span>
            <span className="mt-0.5 text-xs font-light text-white/90 md:text-sm">{capitalizeDescription(description)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          {pop > 0 && (
            <div className="flex items-center gap-1 text-blue-300" aria-label={`강수 확률 ${formatPop(pop)}`}>
              <CloudRain className="size-4" aria-hidden="true" />
              <span className="text-xs font-medium md:text-sm">{formatPop(pop)}</span>
            </div>
          )}

          <div className="flex items-center gap-4 md:gap-6" aria-label={`최저 기온 ${minTemp}도, 최고 기온 ${maxTemp}도`}>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-medium text-blue-300" aria-hidden="true">
                최저
              </span>
              <span className="text-base font-bold text-blue-100 md:text-xl">{minTemp}°</span>
            </div>

            <div className="h-8 w-[1px] bg-white/10" aria-hidden="true" />

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-medium text-red-300" aria-hidden="true">
                최고
              </span>
              <span className="text-base font-bold text-red-100 md:text-xl">{maxTemp}°</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
