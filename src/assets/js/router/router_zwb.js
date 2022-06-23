const zwb_index = () => import('@/components/zwb/zwb_index') 
const zwb_jkzc = () => import('@/components/zwb/zwb_jkzc') 
const zwb_jkzc_detail = () => import('@/components/zwb/zwb_jkzc_detail') 
const zwb_jkzc_history = () => import('@/components/zwb/zwb_jkzc_history') 
var routes = [{
  path: '/zwb_index', 
  name: 'zwb_index',
  component: zwb_index
},{
  path: '/zwb_jkzc', 
  name: 'zwb_jkzc',
  component: zwb_jkzc
},{
  path: '/zwb_jkzc_detail', 
  name: 'zwb_jkzc_detail',
  component: zwb_jkzc_detail
},{
  path: '/zwb_jkzc_history', 
  name: 'zwb_jkzc_history',
  component: zwb_jkzc_history
}]
export default routes

