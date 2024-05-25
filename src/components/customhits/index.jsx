import { useInfiniteHits } from 'react-instantsearch'

import CustomHit from '@/components/customhits/CustomHit'
import NoResult from '@/components/common/NoResult'
import Button from '@/components/common/Button'

import './index.css'

const CustomHits = () => {

  const { hits, showMore, results } = useInfiniteHits()

  return (
    <>
      {hits?.length === 0 ?
        (
          <div className='custom-hits-no-result'>
            <NoResult />
          </div>
        ) : (
          <div className='custom-hits-layout'>
            <div className='custom-hits-container'>
              {hits.map((hit) => <CustomHit key={hit?.objectID} hit={hit} />)}
            </div >
            <Button onClick={showMore} disabled={results.nbHits === hits.length}>
              Show more results
            </Button>
          </div>
        )
      }
    </>
  )
}

export default CustomHits
