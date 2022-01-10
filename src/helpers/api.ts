import Fonoster from '@fonoster/sdk'

// Will take the credentials and API endpoint from the environment
const users = new Fonoster.Users()
const auth = new Fonoster.Auth()

export const getProjects = async (params: {
  accessKeyId: string
  accessKeySecret: string
}) => {
  const Projects = new Fonoster.Projects(params)

  return await Projects.listProjects()
}

export async function createUser(user) {
  try {
    await users.createUser(user)
  } catch (e) {
    console.log(e)
  }
}

export async function getUser(email) {
  // TODO: Fix not using email as a filter
  const results = await users.listUsers({})

  return results.users.find(user => user.email === email)
}

export async function createToken(accessKeyId) {
  if (!accessKeyId) throw new Error('Missing param - accessKeyId')

  const response = await auth.createToken({
    accessKeyId: accessKeyId,
    roleName: 'USER',
    expiration: '30d',
  })

  return response?.token
}
