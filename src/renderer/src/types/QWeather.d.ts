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

interface Hourly {
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
  air_now_city: Air_now_city;
  now: Now;
  daily_forecast: Daily_forecast[];
  lifestyle: Lifestyle[];
  yesterday: Yesterday;
  rain: Rain;
  sun: Planet;
  moon: Planet;
}

interface Air_now_city {
  aqi: string;
  qlty: string;
}

interface Now {
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

interface Daily_forecast {
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
