export const entities = ['films', 'people', 'planets', 'species', 'starships', 'vehicles']

export interface IEntitiesInfo {
  name: string
  title: string
  attributes: string[]
}

export const entitiesInfo: Array<IEntitiesInfo> = [
  {
    name: 'films',
    title: 'Films',
    attributes: ['title', 'episode_id', 'release_date', 'director', 'actions']
  },
  {
    name: 'people',
    title: 'Characters',
    attributes: ['name', 'birth_year', 'gender', 'height', 'skin_color', 'actions']
  },
  {
    name: 'planets',
    title: 'Planets',
    attributes: ['name', 'gravity', 'population', 'climate', 'terrain', 'actions']
  },
  {
    name: 'species',
    title: 'Species',
    attributes: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'actions']
  },
  {
    name: 'starships',
    title: 'Starships',
    attributes: ['name', 'model', 'starship_class', 'hyperdrive_rating', 'actions']
  },
  {
    name: 'vehicles',
    title: 'Vehicles',
    attributes: ['name', 'model', 'vehicle_class', 'cargo_capacity', 'length', 'actions']
  }
]
