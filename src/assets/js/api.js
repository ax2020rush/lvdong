// ##api调用
import { api } from './axios.config'
export const APIcpbuy = e => api.post('PublicUser/Register', e) // 注册接口
export const APIlogin = obj => api.post('public_user/login', obj) // 登录
export const APIlotteryList = e => api.get('lottery/lottery_list') // 首页内容
export const APIDonationHall = e => api.get('lottery/Donation_Hall') // 预约大厅
export const APICpType = e => api.post('lottery/cp_type', e) // 预约大厅cp分类
export const APIVodlist = e => api.get('lottery/Vod_list', e) // 影院分类接口
export const APIVodType = e => api.post('lottery/vod_type', e) // 影院分类详情
export const APIInfo = e => api.post('user/info', e, true) // 个人信息接口
export const APIdonation = e => api.post('lottery/donation', e) // 下注详情
export const APISUB = e => api.post('bet/cpbuy', e, true) // 下注详情
export const APIIntegral = e => api.post('user/Integral_record', e, true) // 积分明细
export const APIdonationrecord = e => api.post('user/donationrecord', e, true) // 任务记录
export const APIaddBank = e => api.post('user/add_bank', e, true) // 添加银行卡
export const APIgetBank = e => api.get('user/add_bank', e, true) // 绑定银行卡列表
export const APIBankInfo = e => api.get('user/bank_info', e, true) // 获取银行卡信息
export const APIwithdraw = e => api.post('user/withdraw', e, true) // 用户提现
export const APIwithdrawalRecord = e => api.post('user/withdrawal_record', e, true) // 提现记录
export const APImodifyinfo = e => api.post('user/modifyinfo', e, true) // 修改手机号和真实姓名
export const APImodifyLpassword = e => api.post('user/modify_Lpassword', e, true) // 修改密码
export const APImodifyTpassword = e => api.post('user/modify_Tpassword', e, true) // 修改资金密码
export const APImail = e => api.post('user/mail', e, true) // 会员消息
export const APIxtNotice = e => api.post('user/xt_Notice', e, true) // 系统公告
export const APImailTo = e => api.post('user/mail_to', e, true) // 系统公告已读
export const APIvodRecord = e => api.post('user/vod_record', e, true) // 我的电影记录
export const APIvodFind = e => api.post('user/vod_find', e, true) // 获取视频链接
export const APIvodDuihuan = e => api.post('user/vod_duihuan', e, true) // 获取视频链接
export const APITg = e => api.post('user/Tg', e, true) // 代理中心
export const APItongdao = e => api.post('user/tongdao', e, true) // 支付通道列表
export const APIpayset = e => api.post('user/payset', e, true) // 调起支付
