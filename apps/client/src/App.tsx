import { useEffect, useState } from 'react'

import React from 'react';
import {Button} from '@dropbox/ui/components/button';
import ImageUpload from './components/ImageUpload';
function App() {
 const [greeting,setGreeting] = useState('');
 useEffect(() => {
   fetch('/api').then((res)=>res.text()).then(
     setGreeting
   )},[])
   

  return (
    <>
   {greeting}
   <ImageUpload/>
   <Button>
    retere </Button>
    </>
  )
}

export default App
