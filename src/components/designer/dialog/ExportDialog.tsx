import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../common/Dialog'
import { useDesigner } from '../context/DesignerContext'
import { useDesignerDialogs } from '../context/dialog/DesignerDialogContext'

export function ExportDialog() {
  const { setOpenDialog, openDialog } = useDesignerDialogs()
  const { mapDefinition } = useDesigner()
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
