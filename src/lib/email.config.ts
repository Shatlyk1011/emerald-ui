import Plunk from '@plunk/node'




export const getPlunkClient = () => {
  return new Plunk(process.env.PLUNK_API_KEY!)
}
