import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { screen, render } from '@testing-library/react'
import App from './App'
import testPhotos from './test/testPhotos.json'

const server = setupServer(
  rest.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', (req, res, ctx) =>
    res(ctx.json(testPhotos))
  )
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('photos are rendered', async () => {
  render(<App width="md" />)

  await screen.findAllByAltText(/curiosity/i)
  expect(screen.getAllByRole('img')).toHaveLength(6)
})
