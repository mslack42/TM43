import { useDesignerSelector } from '@/stores/designer/hooks'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../common/Dialog'
import { useDesignerDialogs } from '../context/dialog/DesignerDialogContext'

export function ExportDialog() {
  const { setOpenDialog, openDialog } = useDesignerDialogs()
  const mapDefinition = useDesignerSelector(state => state.map.mapDefinition)
  return (
    <Dialog open={openDialog === 'Export'}>
      <DialogContent>
        <DialogHeader>Map Export</DialogHeader>
        <textarea
          className='min-h-96'
          value={JSON.stringify(mapDefinition, null, 2)}
        ></textarea>
        <DialogFooter>
          <button onClick={() => setOpenDialog(null)}>Close</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
