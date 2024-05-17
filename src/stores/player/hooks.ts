import { useDispatch, useSelector } from 'react-redux'
import { PlayerDispatch, PlayerState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const usePlayerDispatch = useDispatch.withTypes<PlayerDispatch>()
export const usePlayerSelector = useSelector.withTypes<PlayerState>()
