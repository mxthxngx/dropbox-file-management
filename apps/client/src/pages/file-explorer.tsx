import React from 'react'
import {
  Card,
  CardContent
} from "@dropbox/ui/components/card"
import {
  Separator
} from "@dropbox/ui/components/separator"

import FileExplorerHeading from '../components/file-explorer-heading'
import { FileExplorerBody } from '../components/file-explorer-body'
import Layout from '../layout'

export default function FileExplorer() {
  return (
    <Layout>
    <Card className="w-9/12">
      <FileExplorerHeading/>
    <CardContent>
     <Separator/>
   <FileExplorerBody/>
    </CardContent>

  </Card>
  </Layout>
  )
}
