import { useDispatch, useSelector } from 'react-redux'
import { DesignerDispatch, DesignerState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDesignerDispatch = useDispatch.withTypes<DesignerDispatch>()
export const useDesignerSelector = useSelector.withTypes<DesignerState>()
