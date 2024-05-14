import { MapDefinition } from '@/components/mapspace/types'
import { readdirSync } from 'fs'
import Link from 'next/link'

export default async function LevelSelectPage() {
  try {
    const x = await getLevelSelectionData()
    return (
      <main className='min-h-screen min-w-full'>
        <ul>
          {x?.map(v => (
            <li key={v.name}>
              <Link href={`/level/${v.name}`}>{v.name}</Link>
            </li>
          ))}
        </ul>
      </main>
    )
  } catch (err) {
    return <main className='min-h-screen min-w-full'>No such level...</main>
  }
}

async function getLevelSelectionData() {
  try {
    const levelList: string[] = readdirSync('./src/levels')
    if (levelList.length > 0) {
      const allLevelData = await Promise.all(
        levelList.map(async l => {
          return (await import(`./../../levels/${l}`)) as MapDefinition
        }),
      )
      return allLevelData
    }
  } catch (err) {
    return []
  }
}
