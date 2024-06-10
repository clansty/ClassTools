export interface QWeather24h {
  code: string;
  updateTime: string;
  fxLink: string;
  hourly: Hourly[];
  refer: Refer;
}

interface Refer {
  sources: string[];
  license: string[];
}

export interface Hourly {
  fxTime: string;
  temp: string;
  // 图标代码
  icon: string;
  text: string;
  wind360: string;
  windDir: string;
  windScale: string;
  windSpeed: string;
  humidity: string;
  pop: string;
  precip: string;
  pressure: string;
  cloud: string;
  dew: string;
}

export interface QWeatherH5 {
  status: string;
  air_now_city: QWeatherH5Air;
  now: QWeatherH5Now;
  daily_forecast: DailyForecast[];
  lifestyle: Lifestyle[];
  yesterday: Yesterday;
  rain: Rain;
  sun: Planet;
  moon: Planet;
}

interface QWeatherH5Air {
  aqi: string;
  qlty: string;
}

export interface QWeatherH5Now {
  cond_code: string;
  cond_txt: string;
  hum: string;
  pcpn: string;
  pres: string;
  tmp: string;
  wind_dir: string;
  wind_sc: string;
}

interface Yesterday {
  code_d: string;
  code_n: string;
  date: string;
  tmp_max: string;
  tmp_min: string;
  txt_d: string;
  txt_n: string;
  wind_sc: string;
  wind_dir: string;
}

interface Rain {
  txt: string;
}

interface Planet {
  rise: string;
  set: string;
}

interface DailyForecast {
  cond_code_d: string;
  cond_code_n: string;
  cond_txt_d: string;
  cond_txt_n: string;
  date: string;
  mr: string;
  ms: string;
  sr: string;
  ss: string;
  tmp_max: string;
  tmp_min: string;
  wind_dir: string;
  wind_sc: string;
}

interface Lifestyle {
  type: string;
  brf: string;
}

export interface Daily {
  fxDate: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moonPhase: string;
  moonPhaseIcon: string;
  tempMax: string;
  tempMin: string;
  iconDay: string;
  textDay: string;
  iconNight: string;
  textNight: string;
  wind360Day: string;
  windDirDay: string;
  windScaleDay: string;
  windSpeedDay: string;
  wind360Night: string;
  windDirNight: string;
  windScaleNight: string;
  windSpeedNight: string;
  humidity: string;
  precip: string;
  pressure: string;
  vis: string;
  cloud: string;
  uvIndex: string;
}

export interface QWeather7d {
  code: string;
  updateTime: string;
  fxLink: string;
  daily: Daily[];
  refer: Refer;
}
