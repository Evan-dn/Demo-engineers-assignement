import  algoliasearch from 'algoliasearch'
import config from '@/config'

const client = algoliasearch(config.appId, config.apiKey)
export default client
