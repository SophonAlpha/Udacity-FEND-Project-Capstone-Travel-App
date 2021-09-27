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

export const testAnalyse = {
  model: 'general_en',
  score_tag: 'positive',
  agreement: 'DISAGREEMENT',
  subjectivity: 'SUBJECTIVE',
  confidence: '86',
  irony: 'NONIRONIC'
}
