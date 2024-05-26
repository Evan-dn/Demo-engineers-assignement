import _ from 'lodash'

import { FACET_ATTRIBUTES } from '@/constant'

import CustomRefinementList from '@/components/customRefinementLists/CustomRefinementList'
import RangeSlider from '@/components/customRefinementLists/RangeSlider'

import './index.css'

const CustomRefinementLists = () => {
  // I could have used pure js for partition but one-liner with lodash
  const [sliderAttribute, otherAttributes] = _.partition(FACET_ATTRIBUTES, { slider: true })

  return (
    <div className='refinement-lists-container'>
      {otherAttributes.map(attribute => <CustomRefinementList key={attribute.key} attribute={attribute}/>)}
      {sliderAttribute.map(attribute => <RangeSlider key={attribute.key} attribute={attribute}/>)}
    </div>
  )
}

export default CustomRefinementLists
