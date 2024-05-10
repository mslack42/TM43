import { MapDefinition } from "@/components/designer/types"

type Props = {
    params: {
        mapname: string
    }
}

export default async function LevelPage(props: Props) {
    try {
        const x = await import (`../../../levels/${props.params.mapname}.json`) as MapDefinition
  
        return (
          <main className='min-h-screen min-w-full'>
            {JSON.stringify(x)}
          </main>
        )
    } catch (err) {
        return           <main className='min-h-screen min-w-full'>
            No such level...
        </main>
    }
  }