import React, { useEffect, useState } from "react";
import { Button } from "antd";
import Tag from "./tag";
import { useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import { useSelector, useDispatch } from 'react-redux'
import { removeTag, addTag } from '@/store/modules/tagSlice'
import { debug } from "console";


const Tags: React.FC = () => {

  const storeTags = useSelector(state => state.tag.value) // 获取初始值
  const dispatch = useDispatch() // 调用方法的时候要用dispatch包裹
  // console.log(storeTags, 'storetags')

  // const [storeTags, setTags] = useState([
  //   {
  //     title: '用户中心',
  //     url: '/system/userCenter'
  //   },
  //   {
  //     title: '菜单管理',
  //     url: '/system/menu'
  //   },
  //   {
  //     title: '按钮',
  //     url: '/comp/button'
  //   },
  // ])
  // setTags(storeTags)
  const navTo = useNavigate()
  const location = useLocation()

  const tagClose = (
    event: React.MouseEvent<HTMLButtonElement>,
    tag: {
      title: string;
      url: string;
    }) => {
    event.stopPropagation()

    const index = storeTags.findIndex(_ => _.title === tag.title && _.url === tag.url)
    if (tag.url == location.pathname) {
      // 如果删除的是当前页 
      // 那就跳转到前一个 前一个没有就后一个
      if (index - 1 >= 0) {
        // 是否有前一个
        navTo(storeTags[index - 1].url)
      } else {
        // 是否有后一个
        if (storeTags[index + 1] && storeTags[index + 1].url) {
          navTo(storeTags[index + 1].url)
        } else {
          navTo('/dashboard')
        }
      }
    }
    if (index !== -1) {
      dispatch(removeTag(tag))
    }
  }

  const tagClick = (
    e: {
      title: string;
      url: string;
    }) => {
    navTo(e.url)
  }

  const Tags = storeTags.map(e => {
    return (
      <Tag
        url={e.url}
        tagClick={() => { tagClick(e) }}
        canClose={e.url === 'dashboard' || e.title === '首页' ? false : true}
        onClose={event => { tagClose(event, e) }}>

        {e.title}{e.url}
      </Tag>
    )
  })

  return (
    <div className="tags">
      {...Tags}
    </div>
  )
}
export default Tags