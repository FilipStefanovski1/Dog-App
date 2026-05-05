const BASE_URL = 'https://dog.ceo/api'

export async function getBreeds() {
  const res = await fetch(`${BASE_URL}/breeds/list/all`)
  if (!res.ok) {
    throw new Error('Failed to load breeds')
  }
  const data = await res.json()
  return Object.keys(data.message)
}

export async function getImage(breed) {
  const res = await fetch(`${BASE_URL}/breed/${breed}/images/random`)
  if (!res.ok) {
    throw new Error('Failed to load image')
  }
  const data = await res.json()
  return data.message
}
