import React from 'react'
import {
  Card,
  CardContent
} from "@dropbox/ui/components/card"
import {
  Separator
} from "@dropbox/ui/components/separator"

import FileExplorerHeading from '../components/FileExplorerHeading'
import { FileExplorerBody } from '../components/FileExplorerBody'

export default function FileExplorer() {
  return (
    <Card className="w-9/12">
      <FileExplorerHeading/>
    <CardContent>
     <Separator/>
   <FileExplorerBody/>
    </CardContent>

  </Card>
  )
}
