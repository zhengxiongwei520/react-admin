import React, { useState, useRef } from "react"
import { Tag } from 'antd';
import './index.scss'

/*
  用到的类型区域
*/

interface tag {
  tagName: string
  key: number
}

interface FCProps {
  height?: number
  tagList?: tag[]
  tagClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {}
}

/*
  函数组件主体
*/

const ExpandAndShrink: React.FC<FCProps> = function (props) { 

  const elref = useRef<any>()
  const initHeight = props.height + 'px'
  const [height, setHeight] = useState<string>(initHeight)
  const [expandIndex, setExpandIndex] = useState(0)
  const [autoHeight, setAutoHeight] = useState(' ')
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      // console.log(entries);
      let flag = false // true为第二行最后一个的index
      entries.forEach((item, i) => {
        if (!item.intersectionRatio && !flag) {
          flag = true
          setExpandIndex(i)
        }
        io.unobserve(item.target)
      })
    }, elref.current as any)
    const children = elref.current!.children
    Array.from(children).forEach(item => {
      io.observe(item as Element)
    })
    // 取超出视图的index-1 渲染为展开
    // debugger
    // console.log(elref.current!.offsetHeight, 'elref');
    handleAutoHeight()
  }, [])

  const handleAutoHeight = () => {
    const el = document.querySelector('.tags-expand-main')
    const cloneEl: any = el?.cloneNode(true)
    document.body.appendChild(cloneEl)
    cloneEl.style.height = 'auto'
    setAutoHeight(`${cloneEl.offsetHeight}px`)
    document.body.removeChild(cloneEl)
  }

  const toggleClick = function () {
    setHeight(height === initHeight ? autoHeight : initHeight)
  }


  return (
    <div className="tags-expand">
      <div className="tags-expand-main" ref={elref} style={{ height: height }}>
        {props.tagList!.map((item, i) => {
          if (i === expandIndex - 1 && height !== autoHeight) {
            return (
              <Tag key={item.key} style={{ marginBottom: '20px', marginRight: '100px', cursor: 'pointer' }} onClick={toggleClick}>
                展开
              </Tag>
            )
          } else {
            return (
              <Tag key={item.key} style={{ marginBottom: '20px' }} onClick={props.tagClick}>
                {item.tagName}
              </Tag>
            )
          }
        })}
        {height === autoHeight && <Tag style={{ marginBottom: '20px', cursor: 'pointer' }} onClick={toggleClick}>
          收缩
        </Tag>}
      </div>
    </div>
  )
}

/*
  props的默认值区域
*/
const defaultTagList = [
  {
    tagName: '标签1',
    key: 1
  },
  {
    tagName: '标签222222222',
    key: 2
  },
  {
    tagName: '标签3',
    key: 3
  },
  {
    tagName: '标签4545454',
    key: 4
  },
  {
    tagName: '标签5555555',
    key: 5
  },
  {
    tagName: '标签666666',
    key: 6
  },
  {
    tagName: '777',
    key: 7
  },
  {
    tagName: '88888888',
    key: 8
  },
  {
    tagName: '101010',
    key: 9
  },
]

ExpandAndShrink.defaultProps = {
  height: 100,
  tagList: defaultTagList
}

export default ExpandAndShrink