import { useInfiniteHits } from 'react-instantsearch'
import { useInView } from "react-intersection-observer"
import { FaArrowUp } from "react-icons/fa"

import CustomHit from '@/components/customhits/CustomHit'
import NoResult from '@/components/common/NoResult'
import Button from '@/components/common/Button'

import './index.css'

const CustomHits = () => {

  const { hits, showMore, results } = useInfiniteHits()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const { ref: inViewRef, inView } = useInView({ threshold: 0.2 })


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
            </div>
            {inView && <div className='scroll-to-top-container'>
              <Button className='scroll-to-top-button' onClick={() => scrollToTop()}>
                <FaArrowUp size='2em' />
              </Button>
            </div>}
            <div ref={inViewRef} />
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
