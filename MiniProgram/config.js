/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

const IP = `https://www.cphiic.com/ddsmp/3.6.0`//修改IP

var ApiConfig = {
  Http: `${IP}/Service`,//api接口地址

  ImgUrl: `${IP}/MiniProgramResource`,//图片地址
  
  Token: {
    SetToken: `/api/Token/SetToken?token={token}`,// GET 设置会话Token
  },
  Search: {
    GetSearchInfo_Drug: `/api/Search/GetSearchInfo_Drug`,
    GetSearchInfo_Company: `/api/Search/GetSearchInfo_Company`,
    GetSearchInfo_ATC: `/api/Search/GetSearchInfo_ATC`,
    GetSearchInfo_CPHIIC: `/api/Search/GetSearchInfo_CPHIIC`,
  },
  Sales: {
    GetRank: `/api/Sales/GetRank`,//GET 中国销售排名前50
    GetKeywords: `/api/Sales/GetKeywords`,//GET 热门搜索词
    GetTotalInfo: `/api/Sales/GetTotalInfo`,//POST 统计页-关键字查询字典信息
    GetChart1_Drug: `/api/Sales/GetChart1_Drug`,//POST 一级图表—药品
    GetChart1_Company: `/api/Sales/GetChart1_Company`,//POST 一级图表—企业
    GetChart1_ATC: `/api/Sales/GetChart1_ATC`,//POST 一级图表—ATC领域
    GetChart1_CPHIIC: `/api/Sales/GetChart1_CPHIIC`,//POST 一级图表—CPHIIC领域
    GetChart2_Drug: `/api/Sales/GetChart2_Drug`,//POST 二级图表—药品
    GetChart2_Company: `/api/Sales/GetChart2_Company`,//POST 二级图表—企业
    GetChart2_ATC: `/api/Sales/GetChart2_ATC`,//POST 二级图表—ATC领域
    GetChart2_CPHIIC: `/api/Sales/GetChart2_CPHIIC`,//POST 二级图表—CPHIIC领域
    GetATCInfo: `/api/Sales/GetATCInfo`,
    GetCPHIICInfo: `/api/Sales/GetCPHIICInfo`,
    GetChart:`/api/Sales/GetChart`,
    GetInfo:`/api/Sales/GetInfo`,
    GetUpdateTime:`/api/Sales/GetUpdateTime`,
  },
  Subscription: {
    GetPushList_Zgsb: `/api/Subscription/GetPushList_Zgsb`,
  },
  Yzxpj: {
    GetList: `/api/Yzxpj/GetList`,//POST 一致性评价列表
    GetInfo: `/api/Yzxpj/GetInfo`,//POST 一致性评价 - 药品信息
  },
  Zgsb: {
    GetList: `/api/DrugApproval/GetList`,//POST 中国申报列表
    GetInfo: `/api/DrugApproval/GetInfo`,//POST 一致性评价 - 药品信息
    GetRank: `/api/DrugApproval/GetRank`,//GET CFDA最新批文
  },
  Index: {
    GetSalesRank: `/api/Index/GetSalesRank`,//GET 中国销售排名前20
    GetDataCount: `/api/Index/GetDataCount`,//POST 数据库数据量
    GetKeywords_Drug: `/api/Index/GetKeywords_Drug`,//GET 热门搜索词-药品
    GetKeywords_Company: `/api/Index/GetKeywords_Company`,//GET 热门搜索词-公司
    GetATCInfo: `/api/Index/GetATCInfo`,//GET ATC分类取得
    GetCPHIICInfo: `/api/Index/GetCPHIICInfo`,//GET ATC分类取得
    getWechatJsInfo: `/api/Index/getWechatJsInfo`,//GET ATC分类取得
  },
  Member: {
    GetInfo: `/api/Member/GetInfo`,//取得用户信息
    GetSubscriptionInfo: `/api/Member/GetSubscriptionInfo`,//取得用户订阅信息
    OpenSubscription: `/api/Member/OpenSubscription`,//用户订阅
    CloseSubscription: `/api/Member/CloseSubscription`,//用户取消订阅
    GetSubscriptionHistory: `/api/Member/GetSubscriptionHistory`,//用户历史订阅信息
    CheckWechatAuth: `/api/Member/CheckWechatAuth`,
    doWechatAuth: `/api/Member/doWechatAuth`,
    LoginMiniProgram: `/api/Member/LoginMiniProgram`,
    SaveUserInfo: `/api/Member/SaveUserInfo`,
    SendVerifyCode: `/api/Member/SendVerifyCode`,
    ClearVerifyCode: `/api/Member/ClearVerifyCode`,
    DoBind: `/api/Member/DoBind`,
    DoUnbind: `/api/Member/DoUnbind`,
    GetBindStatus: `/api/Member/GetBindStatus`,
    WarningCodeConfirm: `/api/Member/WarningCodeConfirm`,
    WarningCodeReset: `/api/Member/WarningCodeReset`,
  },
  CommCategory:{
    GetSelectInfo: `/api/CommCategory/GetSelectInfo`,//治疗领域信息取得
  },
  Zgss: {
    GetList: `/api/Zgss/GetList`,//POST 中国上市列表-国产+进口
    GetGcypInfo: `/api/Zgss/GetGcypInfo`,//POST 中国上市-国产药品信息
    GetJkypInfo: `/api/Zgss/GetJkypInfo`,//POST 中国上市-进口药品信息
    GetRank: `/api/Zgss/GetRank`,//GET CDE最新受理
  },
  ListedDrugs:{
    GetDrugNameTip: `/api/ListedDrugs/GetDrugNameTip`,//GET 药品名称枚举字典
    GetGenericNameTip: `/api/ListedDrugs/GetGenericNameTip`,//GET 药品通用名枚举字典
    GetSelectInfo: `/api/ListedDrugs/GetSelectInfo`,//GET 取得下拉框选项
    GetCond2Info: `/api/ListedDrugs/GetCond2Info`,//POST 取得二次筛选项
    GetList: `/api/ListedDrugs/GetList`,//POST 列表
  },
  ClinicalRegistration:{
    GetDrugNameTip: `/api/ClinicalRegistration/GetDrugNameTip`,//GET 药品名称枚举字典
    GetApplicantNameTip: `/api/ClinicalRegistration/GetApplicantNameTip`,//GET 申办者名称枚举字典
    GetSelectInfo: `/api/ClinicalRegistration/GetSelectInfo`,//GET 取得下拉框选项
    GetCond2Info: `/api/ClinicalRegistration/GetCond2Info`,//POST 取得二次筛选项
    GetList: `/api/ClinicalRegistration/GetList`,//POST 列表
    GetInfo: `/api/ClinicalRegistration/GetInfo`,//POST 详情
    GetTestingOrganizationCnList: `/api/ClinicalRegistration/GetTestingOrganizationCnList`,//POST 试验开展机构（中国）
    GetTestingOrganizationOtherList: `/api/ClinicalRegistration/GetTestingOrganizationOtherList`,//POST 试验开展机构（境外）
    GetTestDrugList: `/api/ClinicalRegistration/GetTestDrugList`,//POST 试验药
    GetCompareDrugList: `/api/ClinicalRegistration/GetCompareDrugList`,//POST 对照药
    GetInclusionCriteriaList: `/api/ClinicalRegistration/GetInclusionCriteriaList`,//POST 入选标准
    GetExclusionCriteriaList: `/api/ClinicalRegistration/GetExclusionCriteriaList`,//POST 排除标准
    GetMainIndicatorsList: `/api/ClinicalRegistration/GetMainIndicatorsList`,//POST 主要终点指标
    GetSecondaryIndicatorsList: `/api/ClinicalRegistration/GetSecondaryIndicatorsList`,//POST 次要终点指标
  },
  ChineseReferencePreparation:{
    GetDrugNameTip: `/api/ChineseReferencePreparation/GetDrugNameTip`,//GET 药品名称枚举字典
    GetSelectInfo: `/api/ChineseReferencePreparation/GetSelectInfo`,
    GetCond2Info: `/api/ChineseReferencePreparation/GetCond2Info`,
    GetList: `/api/ChineseReferencePreparation/GetList`,
  },
  Cron: {
    doCronGcyp: `/api/Cron/doCronGcyp`,//GET 中国上市-国产药品数据同步
    doCronJkyp: `/api/Cron/doCronJkyp`,//GET 中国上市-进口药品数据同步
    doCronZgsb: `/api/Cron/doCronZgsb`,//GET 中国申报数据同步
    doCronYzxpj: `/api/Cron/doCronYzxpj`,//GET 一致性评价数据同步
    doCronSaleChina: `/api/Cron/doCronSaleChina`,//GET 中国销售数据同步
    GetList: `/api/Cron/GetList?iDisplayStart={iDisplayStart}&iDisplayLength={iDisplayLength}`,//GET 同步数据列表显示
  },
  drugapproval:{
    GetCond2Info: `/api/DrugApproval/GetCond2Info`,//POST 中国申报-获取下拉框选项
    GetList: `/api/DrugApproval/GetList`,//POST 中国申报-获取获取列表
    GetDrugNameTip: `/api/DrugApproval/GetDrugNameTip`,// 药品名称枚举字典
  },
  ConsistencyProgress:{
    GetKeywords: `/api/ConsistencyProgress/GetKeywords`,//GET 一致性评价-热门关键字
    GetCategoryTotal: `/api/ConsistencyProgress/GetCategoryTotal`,//GET  一致性评价-取得分类统计信息
    GetNews: `/api/ConsistencyProgress/GetNews`, //GET 一致性评价-最新动态
    GetDrugProgress: `/api/ConsistencyProgress/GetDrugProgress`,//GET 一致性评价-品种进度
    GetCompanyProgress: `/api/ConsistencyProgress/GetCompanyProgress`,//GET 一致性评价-企业进度
    GetGenericNameTip: `/api/ConsistencyProgress/GetGenericNameTip`,//GET 一致性评价-药品通用名枚举字典
    GetSelectInfo_Drug: `/api/ConsistencyProgress/GetSelectInfo_Drug`,//GET 一致性评价-取得查品种下拉框选项
    GetCompanyNameTip: `/api/ConsistencyProgress/GetCompanyNameTip`,//GET 一致性评价-企业名称枚举字典
    GetSelectInfo_Company: `/api/ConsistencyProgress/GetSelectInfo_Company`,//GET 一致性评价-取得查企业下拉框选项
    GetList_Drug: `/api/ConsistencyProgress/GetList_Drug`,//POST 一致性评价-品种列表
    GetCond2Info_Drug: `/api/ConsistencyProgress/GetCond2Info_Drug`,//POST 一致性评价-品种列表二次筛选项
    GetList_Company: `/api/ConsistencyProgress/GetList_Company`,//POST 一致性评价-企业列表
    GetCond2Info_Company: `/api/ConsistencyProgress/GetCond2Info_Company`,//POST 一致性评价-企业列表二次筛选项
    GetList_Drug_NeedEvaluate: `/api/ConsistencyProgress/GetList_Drug_NeedEvaluate`,//POST 品种详情—待评价-列表
    GetCond2Info_Drug_NeedEvaluate: `/api/ConsistencyProgress/GetCond2Info_Drug_NeedEvaluate`,//POST 品种详情—待评价-二次筛选项
    GetList_Drug_BE: `/api/ConsistencyProgress/GetList_Drug_BE`,//POST 品种详情—BE备案-列表
    GetCond2Info_Drug_BE: `/api/ConsistencyProgress/GetCond2Info_Drug_BE`,//POST 品种详情—BE备案-二次筛选项
    GetList_Drug_Approval: `/api/ConsistencyProgress/GetList_Drug_Approval`,//POST 品种详情—申报-列表
    GetCond2Info_Drug_Approval: `/api/ConsistencyProgress/GetCond2Info_Drug_Approval`,//POST 品种详情—申报-二次筛选项
    GetList_Drug_Pass: `/api/ConsistencyProgress/GetList_Drug_Pass`,//POST 品种详情—通过一致性评价-列表
    GetCond2Info_Drug_Pass: `/api/ConsistencyProgress/GetCond2Info_Drug_Pass`,//POST 品种详情—通过一致性评价-二次筛选项
    GetList_Company_NeedEvaluate: `/api/ConsistencyProgress/GetList_Company_NeedEvaluate`,//POST 企业详情—待评价-列表
    GetCond2Info_Company_NeedEvaluate: `/api/ConsistencyProgress/GetCond2Info_Company_NeedEvaluate`,//POST 企业详情—待评价-二次筛选项
    GetList_Company_BE: `/api/ConsistencyProgress/GetList_Company_BE`,//POST 企业详情—BE备案-列表
    GetCond2Info_Company_BE: `/api/ConsistencyProgress/GetCond2Info_Company_BE`,//POST 企业详情—BE备案-二次筛选项
    GetList_Company_Approval: `/api/ConsistencyProgress/GetList_Company_Approval`,//POST 企业详情—申报-列表
    GetCond2Info_Company_Approval: `/api/ConsistencyProgress/GetCond2Info_Company_Approval`,//POST 企业详情—申报-二次筛选项
    GetList_Company_Pass: `/api/ConsistencyProgress/GetList_Company_Pass`,//POST 企业详情—通过一致性评价-列表
    GetCond2Info_Company_Pass: `/api/ConsistencyProgress/GetCond2Info_Company_Pass`,//POST 企业详情—通过一致性评价-二次筛选项
    GetKeywordsTotal_Drug: `/api/ConsistencyProgress/GetKeywordsTotal_Drug`,//GET 品种-取得关键字品种记录数
    GetKeywordsTotal_Company: `/api/ConsistencyProgress/GetKeywordsTotal_Company`,//GET 企业-取得关键字企业记录数
  },
}

module.exports = ApiConfig
