import { MapDefinition } from '@/components/mapspace/types'
import { LevelPlayWindow } from '../../../components/player/LevelPlayWindow'

type Props = {
  params: {
    mapname: string
  }
}

export default async function LevelPage(props: Props) {
  try {
    // this parse/stringify nonsense prevents error regarding plainy objects being passable
    // it's a hack, but let's go with it for now...
    const x = JSON.parse(
      JSON.stringify(
        (await import(
          `../../../levels/${props.params.mapname}.json`
        )) as MapDefinition,
      ),
    )

    return (
      <main className='min-h-screen min-w-full'>
        <LevelPlayWindow level={x} />
      </main>
    )
  } catch (err) {
    return <main className='min-h-screen min-w-full'>No such level...</main>
  }
}
