import React from 'react'
import { render } from '@testing-library/react'
import Photo from './Photo'

test('renders an image', () => {
  const photo = {
    src:
      'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/03033/opgs/edr/fcam/FRB_666754019EDR_F0861456FHAZ00341M_.JPG',
    alt: 'Curiosity',
  }

  const { getByAltText } = render(<Photo {...photo} />)
  const image = getByAltText(photo.alt)

  expect(image).toBeInTheDocument()
})
