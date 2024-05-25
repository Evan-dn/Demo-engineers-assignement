import React from 'react'
import PropTypes from 'prop-types'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { GrClose } from "react-icons/gr"

import { getPokemonName } from '@/utils/pokemon'
import Button from '@/components/common/Button'

import './PokemonDetailModal.css'

const PokemonDetailModal = React.forwardRef(({ closeModal, fadeIn, selectedLanguage, ...pokemonDetail }, ref) => {
  const { base = {}, type, imageUrl, name = {} } = pokemonDetail
  const isLastElement = (index, elements) => index === elements?.length - 1
  const pokemonName = getPokemonName({ selectedLanguage, namePath: name })

  return (
    <div data-isfadein={+fadeIn} key={ref} className="modal-overlay">
      <div ref={ref} className="modal-content">
        <Button className='modal-close-button' onClick={closeModal}> <GrClose /></Button>
        <h3>{pokemonName}</h3>

        <div className='pokemonDetailContainer'>

          <div className='pokemon-detail'>
            <h4>base : </h4>
            <div>
              <span>Hp : {base.HP}</span> /
              <span>Attack :  {base.Attack} /
              </span>
              <span>Defense : {base.Defense}</span> /
              <span>Speed : {base.Speed}</span>
            </div>
          </div>


          <div className='pokemon-detail'>
            <h4>type : </h4>
            <div>
              {type.map((type, index) => (
                <span key={index}>{type} {!isLastElement(index, type) && '/ '}</span>
              ))}
            </div>
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
