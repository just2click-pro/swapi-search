import axios, { AxiosResponse } from 'axios'
import { v4 as uuid } from 'uuid'

import { entities } from '@/assets/data/entities'

export type resultsPerEntityType = { [key: string]: unknown }

const url = import.meta.env.VITE_SWAPI_URL

export const search = async (term: string): Promise<resultsPerEntityType> => {
  const responses = await Promise.all(
    entities.map((entity: string) => axios.get<any>(`${url}${entity}?search=${term}`))
  )

  const resultsPerEntity: resultsPerEntityType = {}

  responses.forEach((response: AxiosResponse, index: number) => {
    const entity = entities[index]
    const resultsData: string[] = response.data.results.map((resultValue: any) => {
      return entity === 'films' ? resultValue.title : resultValue.name
    })

    resultsPerEntity[entity] = resultsData
  })

  return resultsPerEntity
}

export const getEntityData = async (entity: string): Promise<any> => {
  const response = await axios.get(`${url}${entity}`)

  const entityData = response.data.results.map((item: any) => ({
    id: uuid(),
    ...item
  }))

  return entityData
}
