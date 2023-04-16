export const entities = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']

export interface IEntitiesInfo {
  name: string
  title: string
  attributes: string[]
}

export const entitiesInfoGender = ['male', 'female', 'unknown']
export const entitiesInfoSkinColor = ['fair', 'golf', 'white', 'blue', 'light', 'red']
export const entitiesInfoHairColor = ['blond', 'none', 'n/a', 'brown', 'grey', 'black', 'white', 'auburn']
export const entitiesInfoEyeColor = ['blue', 'yellow', 'red', 'brown', 'blue-grey']

export const entitiesInfo: Array<IEntitiesInfo> = [
  {
    name: 'films',
    title: 'Films',
    attributes: ['title', 'episode_id', 'release_date', 'director']
  },
  {
    name: 'people',
    title: 'Characters',
    attributes: ['name', 'birth_year', 'gender', 'height', 'skin_color']
  },
  {
    name: 'planets',
    title: 'Planets',
    attributes: ['name', 'gravity', 'population', 'climate', 'terrain']
  },
  {
    name: 'species',
    title: 'Species',
    attributes: ['name', 'classification', 'designation', 'average_height', 'average_lifespan']
  },
  {
    name: 'starships',
    title: 'Starships',
    attributes: ['name', 'model', 'starship_class', 'hyperdrive_rating']
  },
  {
    name: 'vehicles',
    title: 'Vehicles',
    attributes: ['name', 'model', 'vehicle_class', 'cargo_capacity', 'length']
  }
]
