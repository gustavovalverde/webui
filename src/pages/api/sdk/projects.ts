import Fonoster from '@fonoster/sdk'
import { NextApiRequest, NextApiResponse } from 'next'

import { getUserLogged } from '@/mods/auth/lib/getUserLogged'
import { requestHandler } from '@/mods/shared/lib/api'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manager = new Fonoster.Projects(await getUserLogged(req))

  const handlers = {
    post: async () => manager.createProject(req.body),
    get: async () => manager.listProjects(),
  }

  return requestHandler({ handlers, req, res })
}
