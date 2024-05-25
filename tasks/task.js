import fs from 'fs'
import { ALGOLIA_INDEX } from '../src/constant/index.js'
import algoliasearch from 'algoliasearch'
import config from '../src/config/index.js'

const client = algoliasearch(config.appId, config.apiKey)
const index = client.initIndex(ALGOLIA_INDEX)

const withChunk = async ({ objects, chunkSize = 20, method, settings = {} }) => {
  try {
    let totalProcessed = 0
    for (let i = 0; i < objects.length; i += chunkSize) {
      const chunk = objects.slice(i, i + chunkSize)
      await method(chunk, settings)
      totalProcessed += chunk?.length
      console.log(`${totalProcessed} objects / ${objects.length} processed successfully.`);
    }
    console.log('All objects processed successfully.')
  } catch (error) {
    console.error('Error processing objects:', error)
  }
}

const handleFetchData = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}


// Algolia api

const getAllObjects = async () => {
  let hits = []
  // only need id and objectId to update objects
  await index.browseObjects({
    query: '',
    attributesToRetrieve: [
      "id",
      "objectID"
    ],
    batch: batch => {
      hits = hits.concat(batch)
    }
  })
  return hits
}

const addObjects = async (objects) => withChunk({ objects, method: index.saveObjects, settings: { autoGenerateObjectIDIfNotExist: true } })
const partialUpdateObjects = async (objects) => withChunk({ objects, method: index.partialUpdateObjects })


const enrichData = async (data) => {
  const enrichedData = data?.map(pokemon => ({
    objectID: pokemon?.objectID,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon?.id}.png`,
    game_versions: pokemon?.game_indices?.map(index => index?.version?.name)
  }))
  await partialUpdateObjects(enrichedData)
}


const getDataFromApi = async (ids) => {
  const objects = []
  await withChunk({
    objects: ids,
    method: async (chunk) => {
      const promises = chunk.map(id => handleFetchData(`https://pokeapi.co/api/v2/pokemon/${id}`))
      const responses = await Promise.all(promises)
      objects.push(responses)
    }
  })
  return objects.flat()
}


const getObjectId = (data, currentObject) => {
  const object = data.find(object => object?.id === currentObject?.id)
  return object?.objectID
}


const main = async () => {

  const jsonBuffer = fs.readFileSync('tasks/pokedex.json')
  const data = JSON.parse(jsonBuffer)

  await addObjects(data)
  console.log(`data added in ${ALGOLIA_INDEX}`)

  console.log('waiting for indexation....')
  await new Promise(resolve => setTimeout(resolve, 5000))

  const dataFromIndex = await getAllObjects()
  console.log(`data retrieve from  ${ALGOLIA_INDEX} ${dataFromIndex?.length} objects`)

  const dataFromApi = await getDataFromApi(dataFromIndex?.map(object => object?.id))
  console.log(`data retrieve from pokemon api for ${dataFromApi?.length} pokemons`)

  const dataToEnrich = dataFromApi?.map(object => ({ ...object, objectID: getObjectId(dataFromIndex, object) }))

  await enrichData(dataToEnrich)
  console.log(`data enrich in ${ALGOLIA_INDEX} for ${dataToEnrich?.length} objects`)
}

main()
