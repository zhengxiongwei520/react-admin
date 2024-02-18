import Cookies from 'js-cookie'

interface HaschildrenType<T> {
  children: Array<T>
}

function treeToList<T extends HaschildrenType<T>>(tree: Array<T>): T[] {
  const list: T[] = []
  const queue = [...tree]
  while (queue.length) {
    const node = queue.shift()
    if (node?.children?.length) {
      queue.push(...node?.children)
    }
    if (node) list.push(node)
  }
  return list
}

interface ListHasSomekeys<T> {
  id: string | undefined
  children: T[]
}

function listToTree<T extends ListHasSomekeys<T>>(list: Array<T>, pid: keyof T): T[] {
  const map: Map<string, T> = new Map()
  list.forEach(e => {
    if (e.id) {
      e.children = []
      map.set(e.id, e)
    }
  })
  const tree: T[] = []
  list.forEach(e => {
    const id = e[pid] as string
    if (map.has(id)) {
      const obj = map.get(id)
      obj?.children.push(e)
    } else {
      tree.push(e)
    }
  });
  return tree
}

function getToken() {
  Cookies.get('token')
}


export { treeToList, listToTree, getToken }