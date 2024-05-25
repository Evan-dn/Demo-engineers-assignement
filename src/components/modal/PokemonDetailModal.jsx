import React from 'react'
import PropTypes from 'prop-types'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { GrClose } from "react-icons/gr"

import { getPokemonName } from '@/utils/pokemon'
import Button from '@/components/common/Button'

import './PokemonDetailModal.css'

const PokemonDetailModal = React.forwardRef(({ closeModal, fadeIn, selectedLanguage, ...pokemonDetail }, ref) => {
  
  const { base = {}, type: types, imageUrl, name = {} } = pokemonDetail
  const isLastElement = (index, elements) => index === elements?.length - 1
  const pokemonName = getPokemonName({ selectedLanguage, namePath: name })

  return (
    <div data-isfadein={+fadeIn} key={ref} className="modal-overlay">
      <div ref={ref} className="modal-content">

        <Button className='modal-close-button' onClick={closeModal}> <GrClose /></Button>

        <div className='pokemon-detail-content-info'>
          <h3>{pokemonName}</h3>
          <div className='pokemon-detail-content-info-types'>
            Type :
            {types.map((type, index) => (
              <div key={index}>{type} {!isLastElement(index, types) && '/ '}</div>
            ))}
          </div>
        </div>

        <div className='pokemon-detail-content'>
          <div className='pokemon-detail-content-left'>
            <h4>Stats</h4>
            <h4>Hp : {base.HP}</h4>
            <h4>Attack :  {base.Attack}
            </h4>
            <h4>Defense : {base.Defense}</h4>
            <h4>Speed : {base.Speed}</h4>
          </div>
          <LazyLoadImage
            wrapperClassName='wrapper-modal-img'
            effect='blur'
            src={imageUrl}
          />
        </div>
      </div>
    </div>
  )
})

PokemonDetailModal.propTypes = {
  closeModal: PropTypes.func,
  fadeIn: PropTypes.bool,
  selectedLanguage: PropTypes.object
}

PokemonDetailModal.displayName = 'PokemonDetailModal'

export default PokemonDetailModal
