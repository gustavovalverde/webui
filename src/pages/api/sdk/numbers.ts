import Fonoster from '@fonoster/sdk'
import { NextApiRequest } from 'next'

import { getServerCurrentProject } from '@/mods/auth/lib/getUserLogged'
import { requestHandler, Response } from '@/mods/shared/lib/api'

/**
 * Resource kind
 *
 * @description Get an instance of the Numbers resource with the credentials of the user who logged in.
 * @author Fonoster
 */
const resource = (req: NextApiRequest) =>
  new Fonoster.Numbers(getServerCurrentProject(req))

async function post(req: NextApiRequest) {
  const number = await resource(req).createNumber(req.body)

  return Response.created(number)
}

async function get(req: NextApiRequest) {
  const numbers = await resource(req).listNumbers({
    pageSize: 24,
    pageToken: '1',
    view: 2,
  })

  return Response.ok(numbers)
}

async function destroy(req: NextApiRequest) {
  const number = await resource(req).deleteNumber(req.body.ref)

  return Response.ok(number)
}

async function put(req: NextApiRequest) {
  const number = await resource(req).updateNumber(req.body)

  return Response.ok(number)
}

export default requestHandler({ get, post, put, delete: destroy })
