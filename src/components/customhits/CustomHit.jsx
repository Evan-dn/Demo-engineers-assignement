import { useState } from 'react'
import PropTypes from 'prop-types'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import useLanguage from '@/hooks/useLanguage'
import { getPokemonName } from '@/utils/pokemon'

import './CustomHit.css'

const CustomHit = ({ hit }) => {
  const [style, setStyle] = useState({})
  const [isHovered, setIsHovered] = useState(false)

  // not my code for handleMouseMove ^^ but pretty cool effect inspired by https://codepen.io/simeydotme/pen/PrQKgo
  const handleMouseMove = (e) => {
    let pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
    if (e.type === "touchmove") {
      console.log('vldjfnv ldfv ndlfkv ndlfnv:::::')
      pos = [e.touches[0].clientX, e.touches[0].clientY]
    }
    const l = pos[0]
    const t = pos[1]
    const h = e.currentTarget.offsetHeight
    const w = e.currentTarget.offsetWidth
    const px = Math.abs(Math.floor((100 / w) * l) - 100)
    const py = Math.abs(Math.floor((100 / h) * t) - 100)
    const pa = (50 - px) + (50 - py)

    const lp = 50 + (px - 50) / 1.5
    const tp = 50 + (py - 50) / 1.5
    const px_spark = 50 + (px - 50) / 7
    const py_spark = 50 + (py - 50) / 7
    const p_opc = 20 + Math.abs(pa) * 1.5
    const ty = ((tp - 50) / 1.5) * -1 // Increased rotation
    const tx = ((lp - 50) / 1.5) * 1 // Increased rotation

    setStyle({
      "--grad-pos": `${lp}% ${tp}%`,
      "--sprk-pos": `${px_spark}% ${py_spark}%`,
      "--opc": p_opc / 100,
      transform: `rotateX(${ty}deg) rotateY(${tx}deg) translateZ(10px)`,
    })
  }

  const handleMouseOut = () => {
    setIsHovered(false)
    setStyle({})
  }

  const { selectedLanguage } = useLanguage()

  // no need to use useMemo, no complex computing and return a primitive type
  const pokemonName = getPokemonName({ selectedLanguage, namePath: hit?._highlightResult?.name })

  return (
    <div
      className={`custom-hit-container ${isHovered ? 'animated' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseOut}
      onTouchCancel={handleMouseOut}
    >
      <div className='custom-hit-content' style={style}>
        <div className='custom-hit-content-info'>
          <span dangerouslySetInnerHTML={{ __html: pokemonName }} />
          <span>Hp: {hit?.base?.HP}</span>
        </div>
        <LazyLoadImage
          wrapperClassName='custom-hit-img-wrapper'
          src={hit?.imageUrl}
          effect="blur"
        />
      </div>
    </div>
  )
}

CustomHit.propTypes = {
  hit: PropTypes.object
}

export default CustomHit
