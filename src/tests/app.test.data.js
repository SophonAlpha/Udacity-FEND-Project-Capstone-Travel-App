// Test data

export const testLocation = {
  data: {
    geonames:
      [
        {
          adminCode1: '15',
          lng: '11.03283',
          geonameId: 2929670,
          toponymName: 'Erfurt',
          countryId: '2921044',
          fcl: 'P',
          population: 203254,
          countryCode: 'DE',
          name: 'Erfurt',
          fclName: 'city, village,...',
          adminCodes1: { ISO3166_2: 'TH' },
          countryName: 'Germany',
          fcodeName: 'seat of a first-order administrative division',
          adminName1: 'Thuringia',
          lat: '50.9787',
          fcode: 'PPLA'
        }
      ]
  }
}

export const expectedLocation = {
  lng: '11.03283',
  lat: '50.9787',
  name: 'Erfurt',
  adminName1: 'Thuringia',
  countryName: 'Germany',
  countryCode: 'DE',
}

export const testCurrentWeather = {
  data: [
    {
      rh: 67.7126,
      pod: 'n',
      lon: 11.03,
      pres: 996.234,
      timezone: 'Europe/Berlin',
      ob_time: '2021-09-28 17:30',
      country_code: 'DE',
      clouds: 100,
      ts: 1632850245,
      solar_rad: 0,
      state_code: '15',
      city_name: 'Erfurt',
      wind_spd: 0.876755,
      wind_cdir_full: 'east-southeast',
      wind_cdir: 'ESE',
      slp: 1021.37,
      vis: 5,
      h_angle: 90,
      sunset: '17:00',
      dni: 0,
      dewpt: 8.3,
      snow: 0,
      uv: 0,
      precip: 0,
      wind_dir: 102,
      sunrise: '05:13',
      ghi: 0,
      dhi: 0,
      aqi: 9,
      lat: 50.98,
      datetime: '2021-09-28:17',
      temp: 14,
      station: 'EDDE',
      elev_angle: -0.82,
      app_temp: 14
    }
  ],
  count: 1
}

export const expectedCurrentWeather = {
  rh: 67.7126,
  pod: 'n',
  lon: 11.03,
  pres: 996.234,
  timezone: 'Europe/Berlin',
  ob_time: '2021-09-28 17:30',
  country_code: 'DE',
  clouds: 100,
  ts: 1632850245,
  solar_rad: 0,
  state_code: '15',
  city_name: 'Erfurt',
  wind_spd: 0.876755,
  wind_cdir_full: 'east-southeast',
  wind_cdir: 'ESE',
  slp: 1021.37,
  vis: 5,
  h_angle: 90,
  sunset: '17:00',
  dni: 0,
  dewpt: 8.3,
  snow: 0,
  uv: 0,
  precip: 0,
  wind_dir: 102,
  sunrise: '05:13',
  ghi: 0,
  dhi: 0,
  aqi: 9,
  lat: 50.98,
  datetime: '2021-09-28:17',
  temp: 14,
  station: 'EDDE',
  elev_angle: -0.82,
  app_temp: 14
}

export const testWeatherForecast = {
  data: [
    {
      moonrise_ts: 1632857561,
      wind_cdir: 'SSW',
      rh: 77,
      pres: 1017.65,
      high_temp: 16.9,
      sunset_ts: 1632847820,
      ozone: 278.683,
      moon_phase: 0.552211,
      wind_gust_spd: 6.99756,
      snow_depth: 0,
      clouds: 99,
      ts: 1632780060,
      sunrise_ts: 1632805207,
      app_min_temp: 15,
      wind_spd: 1.71297,
      pop: 20,
      wind_cdir_full: 'south-southwest',
      slp: 1022.24,
      moon_phase_lunation: 0.71,
      valid_date: '2021-09-28',
      app_max_temp: 17.2,
      vis: 0,
      dewpt: 12.3,
      snow: 0,
      uv: 1.26933,
      wind_dir: 199,
      max_dhi: null,
      clouds_hi: 65,
      precip: 0.0078125,
      low_temp: 14.2,
      max_temp: 17.2,
      moonset_ts: 1632834607,
      datetime: '2021-09-28',
      temp: 16.3,
      min_temp: 15,
      clouds_mid: 86,
      clouds_low: 71
    },
    {
      moonrise_ts: 1632946338,
      wind_cdir: 'SE',
      rh: 89,
      pres: 1012.92,
      high_temp: 15.5,
      sunset_ts: 1632934079,
      ozone: 285.052,
      moon_phase: 0.453383,
      wind_gust_spd: 8.86319,
      snow_depth: 0,
      clouds: 96,
      ts: 1632866460,
      sunrise_ts: 1632891709,
      app_min_temp: 13.4,
      wind_spd: 2.477,
      pop: 85,
      wind_cdir_full: 'southeast',
      slp: 1017.52,
      moon_phase_lunation: 0.75,
      valid_date: '2021-09-29',
      app_max_temp: 15.5,
      vis: 0,
      dewpt: 12.8,
      snow: 0,
      uv: 1.68986,
      wind_dir: 137,
      max_dhi: null,
      clouds_hi: 71,
      precip: 6.0957,
      low_temp: 8.3,
      max_temp: 15.5,
      moonset_ts: 1632924256,
      datetime: '2021-09-29',
      temp: 14.7,
      min_temp: 13.4,
      clouds_mid: 89,
      clouds_low: 72
    },
    {
      moonrise_ts: 1633035831,
      wind_cdir: 'SW',
      rh: 67,
      pres: 1016.7,
      high_temp: 15.2,
      sunset_ts: 1633020338,
      ozone: 307.719,
      moon_phase: 0.355092,
      wind_gust_spd: 14.728,
      snow_depth: 0,
      clouds: 60,
      ts: 1632952860,
      sunrise_ts: 1632978210,
      app_min_temp: 8.2,
      wind_spd: 3.8244,
      pop: 55,
      wind_cdir_full: 'southwest',
      slp: 1021.35,
      moon_phase_lunation: 0.78,
      valid_date: '2021-09-30',
      app_max_temp: 15.2,
      vis: 0,
      dewpt: 5.2,
      snow: 0,
      uv: 2.00476,
      wind_dir: 217,
      max_dhi: null,
      clouds_hi: 31,
      precip: 1.10938,
      low_temp: 8.2,
      max_temp: 15.2,
      moonset_ts: 1633013268,
      datetime: '2021-09-30',
      temp: 11.4,
      min_temp: 8.2,
      clouds_mid: 48,
      clouds_low: 24
    },
    {
      moonrise_ts: 1633039635,
      wind_cdir: 'S',
      rh: 53,
      pres: 1017.31,
      high_temp: 16.8,
      sunset_ts: 1633106597,
      ozone: 299.115,
      moon_phase: 0.260765,
      wind_gust_spd: 9.8125,
      snow_depth: 0,
      clouds: 96,
      ts: 1633039260,
      sunrise_ts: 1633064712,
      app_min_temp: 9.2,
      wind_spd: 3.69429,
      pop: 0,
      wind_cdir_full: 'south',
      slp: 1023.04,
      moon_phase_lunation: 0.81,
      valid_date: '2021-10-01',
      app_max_temp: 16.8,
      vis: 24.128,
      dewpt: 2.8,
      snow: 0,
      uv: 1.09997,
      wind_dir: 170,
      max_dhi: null,
      clouds_hi: 94,
      precip: 0,
      low_temp: 9.2,
      max_temp: 16.8,
      moonset_ts: 1633101679,
      datetime: '2021-10-01',
      temp: 12.6,
      min_temp: 9,
      clouds_mid: 40,
      clouds_low: 11
    },
    {
      moonrise_ts: 1633130399,
      wind_cdir: 'S',
      rh: 63,
      pres: 1007.96,
      high_temp: 17.7,
      sunset_ts: 1633192856,
      ozone: 300.344,
      moon_phase: 0.174352,
      wind_gust_spd: 10,
      snow_depth: 0,
      clouds: 93,
      ts: 1633125660,
      sunrise_ts: 1633151215,
      app_min_temp: 10.4,
      wind_spd: 3.7745,
      pop: 0,
      wind_cdir_full: 'south',
      slp: 1013.65,
      moon_phase_lunation: 0.85,
      valid_date: '2021-10-02',
      app_max_temp: 17.7,
      vis: 24.128,
      dewpt: 6.7,
      snow: 0,
      uv: 1.72324,
      wind_dir: 183,
      max_dhi: null,
      clouds_hi: 84,
      precip: 0,
      low_temp: 10.4,
      max_temp: 17.8,
      moonset_ts: 1633189620,
      datetime: '2021-10-02',
      temp: 13.9,
      min_temp: 10.4,
      clouds_mid: 79,
      clouds_low: 20
    },
    {
      moonrise_ts: 1633216799,
      wind_cdir: 'S',
      rh: 65,
      pres: 999.143,
      high_temp: 18.9,
      sunset_ts: 1633279116,
      ozone: 304.5,
      moon_phase: 0.100423,
      wind_gust_spd: 15.9062,
      snow_depth: 0,
      clouds: 100,
      ts: 1633212060,
      sunrise_ts: 1633237717,
      app_min_temp: 13,
      wind_spd: 4.66224,
      pop: 0,
      wind_cdir_full: 'south',
      slp: 1004.71,
      moon_phase_lunation: 0.88,
      valid_date: '2021-10-03',
      app_max_temp: 18.1,
      vis: 24.128,
      dewpt: 7.6,
      snow: 0,
      uv: 0.985269,
      wind_dir: 169,
      max_dhi: null,
      clouds_hi: 98,
      precip: 0,
      low_temp: 10.5,
      max_temp: 18.9,
      moonset_ts: 1633277234,
      datetime: '2021-10-03',
      temp: 14.3,
      min_temp: 11.9,
      clouds_mid: 99,
      clouds_low: 30
    },
    {
      moonrise_ts: 1633307913,
      wind_cdir: 'SSW',
      rh: 69,
      pres: 1004.06,
      high_temp: 11,
      sunset_ts: 1633365377,
      ozone: 303.656,
      moon_phase: 0.0439529,
      wind_gust_spd: 7.79688,
      snow_depth: 0,
      clouds: 100,
      ts: 1633298460,
      sunrise_ts: 1633324220,
      app_min_temp: 10.5,
      wind_spd: 3.54405,
      pop: 35,
      wind_cdir_full: 'south-southwest',
      slp: 1009.88,
      moon_phase_lunation: 0.92,
      valid_date: '2021-10-04',
      app_max_temp: 14.3,
      vis: 24.086,
      dewpt: 6.6,
      snow: 0,
      uv: 0.969764,
      wind_dir: 195,
      max_dhi: null,
      clouds_hi: 99,
      precip: 0.5625,
      low_temp: 9.8,
      max_temp: 14.6,
      moonset_ts: 1633364648,
      datetime: '2021-10-04',
      temp: 12.3,
      min_temp: 10.4,
      clouds_mid: 84,
      clouds_low: 29
    },
    {
      moonrise_ts: 1633399212,
      wind_cdir: 'SSW',
      rh: 87,
      pres: 1002.94,
      high_temp: 14.6,
      sunset_ts: 1633451638,
      ozone: 300.906,
      moon_phase: 0.00977479,
      wind_gust_spd: 9.59375,
      snow_depth: 0,
      clouds: 100,
      ts: 1633384860,
      sunrise_ts: 1633410723,
      app_min_temp: 9.8,
      wind_spd: 2.93136,
      pop: 95,
      wind_cdir_full: 'south-southwest',
      slp: 1008.81,
      moon_phase_lunation: 0.95,
      valid_date: '2021-10-05',
      app_max_temp: 10.9,
      vis: 18.1385,
      dewpt: 8.3,
      snow: 0,
      uv: 0.957295,
      wind_dir: 193,
      max_dhi: null,
      clouds_hi: 100,
      precip: 15.1875,
      low_temp: 10.6,
      max_temp: 11.1,
      moonset_ts: 1633451958,
      datetime: '2021-10-05',
      temp: 10.4,
      min_temp: 9.8,
      clouds_mid: 95,
      clouds_low: 77
    },
    {
      moonrise_ts: 1633490612,
      wind_cdir: 'E',
      rh: 88,
      pres: 1010.31,
      high_temp: 17.2,
      sunset_ts: 1633537899,
      ozone: 298.5,
      moon_phase: 0.00181118,
      wind_gust_spd: 5.30859,
      snow_depth: 0,
      clouds: 74,
      ts: 1633471260,
      sunrise_ts: 1633497227,
      app_min_temp: 10,
      wind_spd: 2.16928,
      pop: 70,
      wind_cdir_full: 'east',
      slp: 1015.94,
      moon_phase_lunation: 0.98,
      valid_date: '2021-10-06',
      app_max_temp: 14.6,
      vis: 22.024,
      dewpt: 9.8,
      snow: 0,
      uv: 1.55754,
      wind_dir: 88,
      max_dhi: null,
      clouds_hi: 0,
      precip: 2.5625,
      low_temp: 8.7,
      max_temp: 14.7,
      moonset_ts: 1633539248,
      datetime: '2021-10-06',
      temp: 11.9,
      min_temp: 9.2,
      clouds_mid: 7,
      clouds_low: 74
    },
    {
      moonrise_ts: 1633582105,
      wind_cdir: 'E',
      rh: 78,
      pres: 1023.62,
      high_temp: 12.9,
      sunset_ts: 1633624161,
      ozone: 281.031,
      moon_phase: 0.0222646,
      wind_gust_spd: 9.50781,
      snow_depth: 0,
      clouds: 15,
      ts: 1633557660,
      sunrise_ts: 1633583730,
      app_min_temp: 8.7,
      wind_spd: 2.39861,
      pop: 20,
      wind_cdir_full: 'east',
      slp: 1029.5,
      moon_phase_lunation: 0.02,
      valid_date: '2021-10-07',
      app_max_temp: 17.2,
      vis: 24.128,
      dewpt: 8.4,
      snow: 0,
      uv: 2.57428,
      wind_dir: 98,
      max_dhi: null,
      clouds_hi: 0,
      precip: 0.0625,
      low_temp: 7.3,
      max_temp: 17.6,
      moonset_ts: 1633626604,
      datetime: '2021-10-07',
      temp: 12.4,
      min_temp: 8.5,
      clouds_mid: 0,
      clouds_low: 15
    },
    {
      moonrise_ts: 1633673717,
      wind_cdir: 'E',
      rh: 71,
      pres: 1025.5,
      high_temp: 11.5,
      sunset_ts: 1633710424,
      ozone: 279.5,
      moon_phase: 0.0710161,
      wind_gust_spd: 10.0078,
      snow_depth: 0,
      clouds: 45,
      ts: 1633644060,
      sunrise_ts: 1633670234,
      app_min_temp: 9.5,
      wind_spd: 2.99707,
      pop: 0,
      wind_cdir_full: 'east',
      slp: 1031.5,
      moon_phase_lunation: 0.05,
      valid_date: '2021-10-08',
      app_max_temp: 12.9,
      vis: 24.128,
      dewpt: 5.5,
      snow: 0,
      uv: 0.9198,
      wind_dir: 93,
      max_dhi: null,
      clouds_hi: 25,
      precip: 0,
      low_temp: 9.4,
      max_temp: 17,
      moonset_ts: 1633714129,
      datetime: '2021-10-08',
      temp: 10.7,
      min_temp: 7.7,
      clouds_mid: 20,
      clouds_low: 2
    },
    {
      moonrise_ts: 1633765472,
      wind_cdir: 'ENE',
      rh: 64,
      pres: 1020.5,
      high_temp: 10.6,
      sunset_ts: 1633796687,
      ozone: 296.75,
      moon_phase: 0.14545,
      wind_gust_spd: 10.7969,
      snow_depth: 0,
      clouds: 5,
      ts: 1633730460,
      sunrise_ts: 1633756739,
      app_min_temp: 7.8,
      wind_spd: 4.10197,
      pop: 0,
      wind_cdir_full: 'east-northeast',
      slp: 1026.5,
      moon_phase_lunation: 0.09,
      valid_date: '2021-10-09',
      app_max_temp: 11.7,
      vis: 24.128,
      dewpt: 3.2,
      snow: 0,
      uv: 1.52237,
      wind_dir: 78,
      max_dhi: null,
      clouds_hi: 0,
      precip: 0,
      low_temp: 7.5,
      max_temp: 15.3,
      moonset_ts: 1633801967,
      datetime: '2021-10-09',
      temp: 9.8,
      min_temp: 7.2,
      clouds_mid: 5,
      clouds_low: 2
    },
    {
      moonrise_ts: 1633857323,
      wind_cdir: 'E',
      rh: 70,
      pres: 1016,
      high_temp: 10.9,
      sunset_ts: 1633882950,
      ozone: 297.25,
      moon_phase: 0.240777,
      wind_gust_spd: 8.59375,
      snow_depth: 0,
      clouds: 100,
      ts: 1633816860,
      sunrise_ts: 1633843243,
      app_min_temp: 7.3,
      wind_spd: 3.69054,
      pop: 0,
      wind_cdir_full: 'east',
      slp: 1021.75,
      moon_phase_lunation: 0.12,
      valid_date: '2021-10-10',
      app_max_temp: 11.5,
      vis: 24.128,
      dewpt: 4.4,
      snow: 0,
      uv: 0.466222,
      wind_dir: 80,
      max_dhi: null,
      clouds_hi: 61,
      precip: 0,
      low_temp: 7.2,
      max_temp: 13.7,
      moonset_ts: 1633890323,
      datetime: '2021-10-10',
      temp: 9.4,
      min_temp: 7.3,
      clouds_mid: 96,
      clouds_low: 52
    },
    {
      moonrise_ts: 1633949080,
      wind_cdir: 'WNW',
      rh: 90,
      pres: 1013.75,
      high_temp: 10.8,
      sunset_ts: 1633969215,
      ozone: 284.5,
      moon_phase: 0.350707,
      wind_gust_spd: 4.03125,
      snow_depth: 0,
      clouds: 100,
      ts: 1633903260,
      sunrise_ts: 1633929748,
      app_min_temp: 9.4,
      wind_spd: 1.72454,
      pop: 65,
      wind_cdir_full: 'west-northwest',
      slp: 1019.75,
      moon_phase_lunation: 0.15,
      valid_date: '2021-10-11',
      app_max_temp: 10.2,
      vis: 24.048,
      dewpt: 8.2,
      snow: 0,
      uv: 0.476731,
      wind_dir: 294,
      max_dhi: null,
      clouds_hi: 2,
      precip: 1.9375,
      low_temp: 9.9,
      max_temp: 10.8,
      moonset_ts: 1633979440,
      datetime: '2021-10-11',
      temp: 9.8,
      min_temp: 9.4,
      clouds_mid: 80,
      clouds_low: 100
    },
    {
      moonrise_ts: 1634040375,
      wind_cdir: 'SW',
      rh: 90,
      pres: 1014.25,
      high_temp: 12.2,
      sunset_ts: 1634055480,
      ozone: 288.375,
      moon_phase: 0.468087,
      wind_gust_spd: 1.40625,
      snow_depth: 0,
      clouds: 86,
      ts: 1633989660,
      sunrise_ts: 1634016253,
      app_min_temp: 10.1,
      wind_spd: 0.786742,
      pop: 30,
      wind_cdir_full: 'southwest',
      slp: 1020.25,
      moon_phase_lunation: 0.19,
      valid_date: '2021-10-12',
      app_max_temp: 10.6,
      vis: 24.128,
      dewpt: 8.8,
      snow: 0,
      uv: 0.506949,
      wind_dir: 231,
      max_dhi: null,
      clouds_hi: 0,
      precip: 0.4375,
      low_temp: 7.2,
      max_temp: 12.2,
      moonset_ts: 1634069466,
      datetime: '2021-10-12',
      temp: 10.4,
      min_temp: 7.2,
      clouds_mid: 49,
      clouds_low: 84
    },
    {
      moonrise_ts: 1634130801,
      wind_cdir: 'ESE',
      rh: 78,
      pres: 1014.25,
      high_temp: 14.9,
      sunset_ts: 1634141745,
      ozone: 292.875,
      moon_phase: 0.585456,
      wind_gust_spd: 5.41406,
      snow_depth: 0,
      clouds: 27,
      ts: 1634076060,
      sunrise_ts: 1634102758,
      app_min_temp: 7.5,
      wind_spd: 2.29584,
      pop: 0,
      wind_cdir_full: 'east-southeast',
      slp: 1020,
      moon_phase_lunation: 0.22,
      valid_date: '2021-10-13',
      app_max_temp: 10.9,
      vis: 24.128,
      dewpt: 5.4,
      snow: 0,
      uv: 0.956062,
      wind_dir: 114,
      max_dhi: null,
      clouds_hi: 0,
      precip: 0,
      low_temp: 7.1,
      max_temp: 14.9,
      moonset_ts: 1634160262,
      datetime: '2021-10-13',
      temp: 9.2,
      min_temp: 7.1,
      clouds_mid: 0,
      clouds_low: 27
    }
  ],
  city_name: 'Berlin',
  lon: 13.41,
  timezone: 'Europe/Berlin',
  lat: 52.52,
  country_code: 'DE',
  state_code: '16'
}

export const expectedWeatherForecast = testWeatherForecast

export const testLocationImage = {
  data: {
    total: 1659,
    totalHits: 500,
    hits: [
      {
        id: 2252020,
        pageURL: 'https://pixabay.com/photos/white-sand-beach-ripples-shallow-2252020/',
        type: 'photo',
        tags: 'white sand beach, ripples, shallow',
        previewURL: 'https://cdn.pixabay.com/photo/2017/04/22/18/42/white-sand-beach-2252020_150.jpg',
        previewWidth: 150,
        previewHeight: 99,
        webformatURL: 'https://pixabay.com/get/g28080414b1102c59cc6f9489e7934338f6dd9ccadb8e80c8912f1e57a1e52f43e064bcad8788527fdddffd207a3821e340aef01e1280db3180fa28adab296dc8_640.jpg',
        webformatWidth: 640,
        webformatHeight: 426,
        largeImageURL: 'https://pixabay.com/get/g1a565ef104ebd7491ed9bc2c1a3d5c6e0c75e0516e3ada7aac4fbae5a24bafa00d79eb122db420bb9310e82b1a70d49d6a21d8a27fefe80816f4175cf7de0817_1280.jpg',
        imageWidth: 5616,
        imageHeight: 3744,
        imageSize: 6854923,
        views: 87263,
        downloads: 46258,
        collections: 860,
        likes: 306,
        comments: 47,
        user_id: 4749850,
        user: 'Kanenori',
        userImageURL: 'https://cdn.pixabay.com/user/2021/07/31/07-04-28-942_250x250.jpg'
      }
    ]
  }
}

export const expectedLocationImage = testLocationImage
