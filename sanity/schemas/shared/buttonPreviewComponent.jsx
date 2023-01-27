import React from 'react'
import {Card, Inline, Button} from '@sanity/ui'

function ButtonPreviewComponent() {
  return (
    <Card padding={4} style={{textAlign: 'center'}}>
      <Inline space={[3, 3, 4]}>
        <Button fontSize={[2, 2, 3]} mode="ghost" padding={[3, 3, 4]} text="Create" />
        <Button fontSize={[2, 2, 3]} padding={[3, 3, 4]} text="Publish" tone="primary" />
      </Inline>
    </Card>
  )
}

export default ButtonPreviewComponent
