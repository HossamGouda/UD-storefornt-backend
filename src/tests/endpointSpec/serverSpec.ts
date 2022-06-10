import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Test for the main endpoint server', () => {
  it('testing the response of server', async () => {
    const response = await request.get('/')
    expect(response.status).toEqual(200)
  })
})
