const index = () => import('@/components/index/index')
const index_more = () => import('@/components/index/index_more')
const index_search = () => import('@/components/index/index_search')
const gnzy_index = () => import('@/components/index/gnzy_index')
const jkzx_index = () => import('@/components/index/jkzx_index')
var routes = [{
  path: '/index',
  name: 'index',
  component: index
}, {
  path: '/index_more',
  name: 'index_more',
  component: index_more
}, {
  path: '/index_search',
  name: 'index_search',
  component: index_search
}, {
  path: '/gnzy_index',
  name: 'gnzy_index',
  component: gnzy_index
}, {
  path: '/jkzx_index',
  name: 'jkzx_index',
  component: jkzx_index
}]
export default routes