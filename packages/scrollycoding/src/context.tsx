import * as React from "react"
import {
  Classes,
  classNamesWithPrefix,
} from "@code-hike/utils"
import { MiniBrowserProps } from "@code-hike/mini-browser"
import { CodeProps } from "./editor"

export const classPrefixer = classNamesWithPrefix("ch-hike")

export interface CodeFiles {
  [path: string]: { lang: string; code: string }
}

export interface HikeStep {
  content: React.ReactNode[]
  demo: Demo
  previewProps?: MiniBrowserProps
  codeProps?: CodeProps
}

export interface Demo {
  files: CodeFiles
  activeFile: string
  focus: string | undefined
}

export const HikeContext = React.createContext<{
  currentFocus: string | undefined
  setFocus: (demo: Demo) => void
  resetFocus: () => void
  classes: Classes
} | null>(null)

export const StepContext = React.createContext<HikeStep | null>(
  null
)