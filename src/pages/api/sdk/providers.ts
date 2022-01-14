import Fonoster from '@fonoster/sdk'
import { NextApiRequest } from 'next'

import { getCurrentProject } from '@/lib/getUserLogged'
import { requestHandler } from '@/lib/sdk/requestHandler'
import { Response } from '@/lib/sdk/Response'

/**
 * Resource kind
 *
 * @description Get an instance of the Providers resource with the credentials of the user who logged in.
 * @author Fonoster
 */
const resource = async (req: NextApiRequest) =>
  new Fonoster.Providers(getCurrentProject(req))

async function post(req: NextApiRequest) {
  const provider = await (await resource(req)).createProvider(req.body)

  return Response.created(provider)
}

async function get(req: NextApiRequest) {
  const providers = await (
    await resource(req)
  ).listProviders({ pageSize: 24, pageToken: '1', view: 2 })

  return Response.ok(providers)
}

async function destroy(req: NextApiRequest) {
  const provider = await (await resource(req)).deleteProvider(req.body.ref)

  return Response.ok(provider)
}

async function put(req: NextApiRequest) {
  const provider = await (await resource(req)).updateProvider(req.body)

  return Response.ok(provider)
}

export default requestHandler({ get, post, put, delete: destroy })
