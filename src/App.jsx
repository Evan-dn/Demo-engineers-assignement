import { InstantSearch, Configure } from 'react-instantsearch'

import algoliaClient from '@/services/algolia'
import { ALGOLIA_INDEX } from '@/constant'

import TopBar from '@/components/topbar'

import './App.css'

function App() {

  return (
    <>
      <InstantSearch searchClient={algoliaClient} indexName={ALGOLIA_INDEX}>
        <Configure hitsPerPage={12} />
        <TopBar />

      </InstantSearch>

    </>
  )
}

export default App
