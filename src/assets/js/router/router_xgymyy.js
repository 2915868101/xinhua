const xgymyy_index = () => import('@/components/xgymyy/xgymyy_index') 
const xgymyy_qryy = () => import('@/components/xgymyy/xgymyy_qryy') 
const xgymyy_yyjl = () => import('@/components/xgymyy/xgymyy_yyjl') 
const xgymyy_yycg = () => import('@/components/xgymyy/xgymyy_yycg') 
var routes = [{
  path: '/xgymyy_index', 
  name: 'xgymyy_index',
  component: xgymyy_index
},{
  path: '/xgymyy_yycg', 
  name: 'xgymyy_yycg',
  component: xgymyy_yycg
},{
  path: '/xgymyy_qryy', 
  name: 'xgymyy_qryy',
  component: xgymyy_qryy
},{
  path: '/xgymyy_yyjl', 
  name: 'xgymyy_yyjl',
  component: xgymyy_yyjl
}]
export default routes

