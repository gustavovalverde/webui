import Fonoster from '@fonoster/sdk'
import { NextApiRequest } from 'next'

import { getUserLogged } from '@/lib/getUserLogged'
import { requestHandler } from '@/lib/sdk/requestHandler'
import { Response } from '@/lib/sdk/Response'

/**
 * Resource kind
 *
 * @description Get an instance of the Projects resource with the credentials of the user who logged in.
 * @author Fonoster
 */
const resource = async (req: NextApiRequest) =>
  new Fonoster.Projects(await getUserLogged(req))

async function post(req: NextApiRequest) {
  const { name, allowExperiments } = req.body

  const project = await (
    await resource(req)
  ).createProject({
    name,
    allowExperiments,
  })

  return Response.created(project)
}

async function get(req: NextApiRequest) {
  const projects = await (await resource(req)).listProjects()

  return Response.ok(projects)
}

export default requestHandler({ get, post })
