const register_card = () => import('@/components/register/register_card')
const register_index = () => import('@/components/register/register_index')
const oper_people_detils = () => import('@/components/register/oper_people_detils')
const people_lists = () => import('@/components/register/people_lists')
const people_detail = () => import('@/components/register/people_detail')
var face_url = /Android/i.test(navigator.userAgent) ? 'face_verify_jg' : 'face_verify'
const face_verify = () => import('@/components/register' + face_url)
var routes = [{
  path: '/register_card',
  name: 'register_card',
  component: register_card
}, {
  path: '/register_index',
  name: 'register_index',
  component: register_index
}, {
  path: '/oper_people_detils',
  name: 'oper_people_detils',
  component: oper_people_detils
}, {
  path: '/people_lists',
  name: 'people_lists',
  component: people_lists
}, {
  path: '/people_detail',
  name: 'people_detail',
  component: people_detail
}, {
  path: '/face_verify',
  name: 'face_verify',
  component: face_verify
}]
export default routes