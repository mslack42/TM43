import { MapDefinition } from "@/components/designer/types";
import { readdirSync } from "fs"

export default async function LevelSelectPage() {
    try {
        const x = await getLevelSelectionData();
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

  async function getLevelSelectionData() {
    try {
        const levelList: string[] = readdirSync("./src/levels")
        if (levelList.length > 0) {
            const allLevelData = await Promise.all(levelList.map(async (l) => {
                return (await import (`./../../levels/${l}`)) as MapDefinition
            }))
            return allLevelData
        }
    } catch (err) {
        return []
    }
  }