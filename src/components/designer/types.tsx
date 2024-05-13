'use client'

export const CursorModes = ['Drag', 'Paint', 'Place', 'Select'] as const
export type CursorMode = (typeof CursorModes)[number]
