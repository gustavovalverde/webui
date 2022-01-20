import Monitor from '@fonoster/monitor'
import { NextApiRequest } from 'next'

import { getServerCurrentProject } from '@/mods/auth/lib/getUserLogged'
import { TIMES, validateTimeFilter } from '@/mods/shared/constants/filters'
import { requestHandler, Response } from '@/mods/shared/lib/api'

async function get(req: NextApiRequest) {
  const monitor = new Monitor(getServerCurrentProject(req))

  const { time = TIMES[0].value } = req.query

  validateTimeFilter(time as string)

  const events = await monitor.searchEvents({
    query: {
      bool: {
        must: {
          match: {
            eventType: 'call',
          },
        },
        filter: {
          range: {
            '@timestamp': {
              gte: time,
            },
          },
        },
      },
    },
  })

  return Response.ok(events)
}

export default requestHandler({ get })
