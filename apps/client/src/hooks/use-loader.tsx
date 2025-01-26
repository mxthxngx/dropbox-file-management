import { LoaderContext } from "../context/loader-context"
import { useContext } from "react"

export const useLoader = () => {
  const loaderContext = useContext(LoaderContext)

  if (!loaderContext) {
    throw new Error('Please use useLoader inside the context of LoaderProvider')
  }

  return {
    start: loaderContext.start,
    stop: loaderContext.stop
  }
}