import { useEffect, useState } from 'react'
import { useRange } from 'react-instantsearch'
import PropTypes from 'prop-types'

import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'

import './RangeSlider.css'

const CustomRangeSlider = ({ attribute }) => {
  const { start, range, canRefine, refine } = useRange({ attribute: attribute.key })
  const { min, max } = range
  const [value, setValue] = useState({ start: min, end: max })

  const from = Math.max(min, Number.isFinite(start[0]) ? start[0] : min)
  const to = Math.min(max, Number.isFinite(start[1]) ? start[1] : max)

  useEffect(() => {
    setValue({ start: from, end: to })
  }, [from, to])

  const onInput = (value) => {
    const [start, end] = value
    return setValue({ start, end })
  }
  const handleDragEnd = () => {
    refine([value.start, value.end])
  }

  return (
    <div className='custom-range-slider-container'>

      <div className='custom-range-slider-info'>
        <h3>{attribute.name}</h3>
        <span>{value?.start} - {value?.end}</span>
      </div>

      <RangeSlider
        className='custom-range-slider'
        min={min}
        max={max}
        onInput={onInput}
        onThumbDragEnd={handleDragEnd}
        value={[value.start, value.end]}
        disabled={!canRefine}
      />
    </div>
  )
}

CustomRangeSlider.propTypes = {
  attribute: PropTypes?.object
}

export default CustomRangeSlider
