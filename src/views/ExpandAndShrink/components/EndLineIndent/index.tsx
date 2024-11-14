import { useEffect, useRef } from "react"
import './index.scss'
const EndLineIndent = () => {
  const elref = useRef<any>()

  useEffect(() => {

    const rects = elref.current.getClientRects()
    console.log(rects, 'effect')
  }, [])

  return (
    <div className="end-line-box">
      <span className="content" ref={elref}>
        asdasdsasdasdsasdsadasdasdsasdasdsasdsadd11111111asadd11111111asaddd
        asdasdsasdasdsasdsadasdasdsasdasdsasdsadd11111111asadd11111111asaddd
        asdasdsasdasdsasdsadasdasdsasdasdsasdsadd11111111asadd11111111asaddd
        asdasdsasdasdsasdsadasdasdsasdasdsasdsadd11111111asadd11111111asaddd
      </span>
      <div className="operate">
        展开
      </div>
    </div>
  )
}

export default EndLineIndent