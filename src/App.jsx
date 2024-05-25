import { InstantSearch, Configure } from 'react-instantsearch'

import algoliaClient from '@/services/algolia'
import { ALGOLIA_INDEX } from '@/constant'

import TopBar from '@/components/topbar'
import CustomRefinementLists from '@/components/customRefinementLists'
import CustomHits from '@/components/customhits'

import './App.css'

function App() {

  return (
    <>
      <InstantSearch searchClient={algoliaClient} indexName={ALGOLIA_INDEX}>
        <Configure hitsPerPage={12} />
        <TopBar />
        <div className='app-container'>
          <div className='app-content'>
            <CustomRefinementLists/>
            <CustomHits />
          </div>
        </div>
      </InstantSearch>
    </>
  )
}

export default App
