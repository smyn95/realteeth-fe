import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  capitalizeDescription,
  formatHumidity,
  formatTime,
  formatWindSpeed,
  getUviLevel,
  getWeatherIconUrl,
} from '@/entities/open-weather';
import type { Forecast, HourlyForecast } from '@/entities/open-weather/model/types';
import { CalendarDays, Clock, CloudRain, Droplets, Info, Sun, Sunrise, Sunset, Thermometer, Wind } from 'lucide-react';

type Props = {
  forecast: Forecast[];
  hourly: HourlyForecast[];
};

export function WeatherForecastDetail({ forecast, hourly }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-none bg-[#292d47] text-white shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Clock className="size-5 text-blue-400" />
            시간별 예보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="w-full rounded-md whitespace-nowrap">
            <div className="flex w-max gap-4 pb-4">
              {hourly.map((item) => (
                <div
                  key={item.dt}
                  className="flex w-20 flex-col items-center gap-2 rounded-xl bg-white/5 py-4 transition-colors hover:bg-white/10"
                >
                  <span className="text-[11px] font-medium text-white/60">{item.time}</span>
                  <img src={getWeatherIconUrl(item.icon)} alt={item.description} className="size-10 drop-shadow-md" />
                  <span className="text-sm font-bold">{item.temp}°</span>
                  {item.pop > 0 ? (
                    <Badge variant="secondary" className="bg-blue-500/20 text-[9px] text-blue-300 hover:bg-blue-500/20">
                      {item.pop}%
                    </Badge>
                  ) : (
                    <div className="h-[18px]" />
                  )}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" className="bg-white/10" />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border-none bg-[#292d47] text-white shadow-xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <CalendarDays className="size-5 text-blue-400" />
            향후 7일 상세 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {forecast.map((item) => (
              <AccordionItem key={item.date} value={item.date} className="overflow-hidden rounded-2xl border-none bg-white/5 px-4">
                <AccordionTrigger className="items-center py-4 hover:no-underline">
                  <div className="flex w-full items-center justify-between pr-4">
                    <div className="flex items-center gap-4">
                      <div className="text-left">
                        <p className="text-[10px] font-bold tracking-tighter text-white/40 uppercase">
                          {item.date.slice(5).replace('-', '/')}
                        </p>
                        <p className="text-sm font-bold">{item.dayName}요일</p>
                      </div>
                      <img src={getWeatherIconUrl(item.icon)} alt="" className="size-12" />
                      <div className="hidden text-left sm:block">
                        <p className="text-sm font-medium">{capitalizeDescription(item.description)}</p>
                        {item.pop > 0 && <p className="text-[11px] text-blue-300">강수확률 {item.pop}%</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-lg font-bold">
                      <span className="text-blue-300">{item.minTemp}°</span>
                      <span className="text-red-300">{item.maxTemp}°</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid gap-6">
                    {item.summary && (
                      <div className="flex items-start gap-2 rounded-lg bg-blue-500/10 p-3 text-[12px] leading-relaxed text-blue-100/80">
                        <Info className="mt-0.5 size-4 shrink-0" />
                        {item.summary}
                      </div>
                    )}

                    <div className="grid grid-cols-4 gap-2">
                      <TimeTempCard label="아침" temp={item.temp.morn} feels={item.feelsLike.morn} />
                      <TimeTempCard label="낮" temp={item.temp.day} feels={item.feelsLike.day} />
                      <TimeTempCard label="저녁" temp={item.temp.eve} feels={item.feelsLike.eve} />
                      <TimeTempCard label="밤" temp={item.temp.night} feels={item.feelsLike.night} />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <DetailGridItem icon={<Sunrise />} label="일출" value={formatTime(item.sunrise)} />
                      <DetailGridItem icon={<Sunset />} label="일몰" value={formatTime(item.sunset)} />
                      <DetailGridItem icon={<Droplets />} label="습도" value={formatHumidity(item.humidity)} />
                      <DetailGridItem icon={<Wind />} label="풍속" value={formatWindSpeed(item.windSpeed)} />
                      <DetailGridItem icon={<Sun />} label="UV 지수" value={`${Math.round(item.uvi)} (${getUviLevel(item.uvi)})`} />
                      <DetailGridItem icon={<CloudRain />} label="강수량" value={item.rain ? `${item.rain}mm` : '0mm'} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}

function TimeTempCard({ label, temp, feels }: { label: string; temp: number; feels: number }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-black/20 py-3">
      <span className="mb-1 text-[10px] text-white/40">{label}</span>
      <span className="text-sm font-bold">{temp}°</span>
      <div className="mt-1 flex items-center gap-0.5 text-[9px] text-white/30">
        <Thermometer className="size-2.5" />
        {feels}°
      </div>
    </div>
  );
}

function DetailGridItem({ icon, label, value }: { icon: React.ReactElement; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-black/20 p-3">
      <div className="text-blue-400 [&>svg]:size-4">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[10px] text-white/40">{label}</span>
        <span className="text-xs font-semibold">{value}</span>
      </div>
    </div>
  );
}
