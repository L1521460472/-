const area2 = [
    // {
    //   "code": "01",
    //   "parentCode": "0",
    //   "name": "华北",
    //   "id": 394,
    //   "child": [{
    //       "code": "100",
    //       "parentCode": "01",
    //       "name": "北京",
    //       "id": 1,
    //       "child": [{
    //         "code": "1000",
    //         "parentCode": "100",
    //         "name": "北京",
    //         "id": 32
    //       }]
    //     },
    //     {
    //       "code": "220",
    //       "parentCode": "01",
    //       "name": "天津",
    //       "id": 4,
    //       "child": [{
    //         "code": "2200",
    //         "parentCode": "220",
    //         "name": "天津",
    //         "id": 55
    //       }]
    //     },
    //     {
    //       "code": "311",
    //       "parentCode": "01",
    //       "name": "河北",
    //       "id": 11,
    //       "child": [{
    //           "code": "3140",
    //           "parentCode": "311",
    //           "name": "承德",
    //           "id": 132
    //         },
    //         {
    //           "code": "3150",
    //           "parentCode": "311",
    //           "name": "唐山",
    //           "id": 133
    //         },
    //         {
    //           "code": "3110",
    //           "parentCode": "311",
    //           "name": "石家庄",
    //           "id": 134
    //         },
    //         {
    //           "code": "3350",
    //           "parentCode": "311",
    //           "name": "秦皇岛",
    //           "id": 135
    //         },
    //         {
    //           "code": "3170",
    //           "parentCode": "311",
    //           "name": "沧州",
    //           "id": 136
    //         },
    //         {
    //           "code": "3190",
    //           "parentCode": "311",
    //           "name": "邢台",
    //           "id": 137
    //         },
    //         {
    //           "code": "3130",
    //           "parentCode": "311",
    //           "name": "张家口",
    //           "id": 138
    //         },
    //         {
    //           "code": "3160",
    //           "parentCode": "311",
    //           "name": "廊坊",
    //           "id": 139
    //         },
    //         {
    //           "code": "3100",
    //           "parentCode": "311",
    //           "name": "邯郸",
    //           "id": 140
    //         },
    //         {
    //           "code": "3180",
    //           "parentCode": "311",
    //           "name": "衡水",
    //           "id": 141
    //         },
    //         {
    //           "code": "3120",
    //           "parentCode": "311",
    //           "name": "保定",
    //           "id": 142
    //         },
    //         {
    //           "code": "3360",
    //           "parentCode": "311",
    //           "name": "雄安新区",
    //           "id": 143
    //         }
    //       ]
    //     },
    //     {
    //       "code": "351",
    //       "parentCode": "01",
    //       "name": "山西",
    //       "id": 12,
    //       "child": [{
    //           "code": "3500",
    //           "parentCode": "351",
    //           "name": "忻州",
    //           "id": 144
    //         },
    //         {
    //           "code": "3560",
    //           "parentCode": "351",
    //           "name": "晋城",
    //           "id": 145
    //         },
    //         {
    //           "code": "3590",
    //           "parentCode": "351",
    //           "name": "运城",
    //           "id": 146
    //         },
    //         {
    //           "code": "3490",
    //           "parentCode": "351",
    //           "name": "朔州",
    //           "id": 147
    //         },
    //         {
    //           "code": "3510",
    //           "parentCode": "351",
    //           "name": "太原",
    //           "id": 148
    //         },
    //         {
    //           "code": "3550",
    //           "parentCode": "351",
    //           "name": "长治",
    //           "id": 149
    //         },
    //         {
    //           "code": "3570",
    //           "parentCode": "351",
    //           "name": "临汾",
    //           "id": 150
    //         },
    //         {
    //           "code": "3540",
    //           "parentCode": "351",
    //           "name": "晋中",
    //           "id": 151
    //         },
    //         {
    //           "code": "3530",
    //           "parentCode": "351",
    //           "name": "阳泉",
    //           "id": 152
    //         },
    //         {
    //           "code": "3580",
    //           "parentCode": "351",
    //           "name": "吕梁",
    //           "id": 153
    //         },
    //         {
    //           "code": "3520",
    //           "parentCode": "351",
    //           "name": "大同",
    //           "id": 154
    //         }
    //       ]
    //     },
    //     {
    //       "code": "471",
    //       "parentCode": "01",
    //       "name": "内蒙古",
    //       "id": 16,
    //       "child": [{
    //           "code": "4830",
    //           "parentCode": "471",
    //           "name": "阿拉善盟",
    //           "id": 195
    //         },
    //         {
    //           "code": "4790",
    //           "parentCode": "471",
    //           "name": "锡林郭勒",
    //           "id": 196
    //         },
    //         {
    //           "code": "4770",
    //           "parentCode": "471",
    //           "name": "鄂尔多斯",
    //           "id": 197
    //         },
    //         {
    //           "code": "4740",
    //           "parentCode": "471",
    //           "name": "乌兰察布",
    //           "id": 198
    //         },
    //         {
    //           "code": "4710",
    //           "parentCode": "471",
    //           "name": "呼和浩特",
    //           "id": 199
    //         },
    //         {
    //           "code": "4760",
    //           "parentCode": "471",
    //           "name": "赤峰",
    //           "id": 200
    //         },
    //         {
    //           "code": "4780",
    //           "parentCode": "471",
    //           "name": "临河巴彦淖尔",
    //           "id": 201
    //         },
    //         {
    //           "code": "4750",
    //           "parentCode": "471",
    //           "name": "通辽",
    //           "id": 202
    //         },
    //         {
    //           "code": "4720",
    //           "parentCode": "471",
    //           "name": "包头",
    //           "id": 203
    //         },
    //         {
    //           "code": "4700",
    //           "parentCode": "471",
    //           "name": "呼伦贝尔",
    //           "id": 204
    //         },
    //         {
    //           "code": "4730",
    //           "parentCode": "471",
    //           "name": "乌海",
    //           "id": 205
    //         },
    //         {
    //           "code": "4820",
    //           "parentCode": "471",
    //           "name": "兴安盟",
    //           "id": 206
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "code": "02",
    //   "parentCode": "0",
    //   "name": "东北",
    //   "id": 395,
    //   "child": [{
    //       "code": "240",
    //       "parentCode": "02",
    //       "name": "辽宁",
    //       "id": 6,
    //       "child": [{
    //           "code": "4170",
    //           "parentCode": "240",
    //           "name": "营口",
    //           "id": 57
    //         },
    //         {
    //           "code": "4210",
    //           "parentCode": "240",
    //           "name": "朝阳",
    //           "id": 58
    //         },
    //         {
    //           "code": "4110",
    //           "parentCode": "240",
    //           "name": "大连",
    //           "id": 59
    //         },
    //         {
    //           "code": "4160",
    //           "parentCode": "240",
    //           "name": "锦州",
    //           "id": 60
    //         },
    //         {
    //           "code": "4180",
    //           "parentCode": "240",
    //           "name": "阜新",
    //           "id": 61
    //         },
    //         {
    //           "code": "4190",
    //           "parentCode": "240",
    //           "name": "辽阳",
    //           "id": 62
    //         },
    //         {
    //           "code": "4270",
    //           "parentCode": "240",
    //           "name": "盘锦",
    //           "id": 63
    //         },
    //         {
    //           "code": "4130",
    //           "parentCode": "240",
    //           "name": "抚顺",
    //           "id": 64
    //         },
    //         {
    //           "code": "4100",
    //           "parentCode": "240",
    //           "name": "铁岭",
    //           "id": 65
    //         },
    //         {
    //           "code": "2400",
    //           "parentCode": "240",
    //           "name": "沈阳",
    //           "id": 66
    //         },
    //         {
    //           "code": "4120",
    //           "parentCode": "240",
    //           "name": "鞍山",
    //           "id": 67
    //         },
    //         {
    //           "code": "4150",
    //           "parentCode": "240",
    //           "name": "丹东",
    //           "id": 68
    //         },
    //         {
    //           "code": "4290",
    //           "parentCode": "240",
    //           "name": "葫芦岛",
    //           "id": 69
    //         },
    //         {
    //           "code": "4140",
    //           "parentCode": "240",
    //           "name": "本溪",
    //           "id": 70
    //         }
    //       ]
    //     },
    //     {
    //       "code": "431",
    //       "parentCode": "02",
    //       "name": "吉林",
    //       "id": 14,
    //       "child": [{
    //           "code": "4310",
    //           "parentCode": "431",
    //           "name": "长春",
    //           "id": 173
    //         },
    //         {
    //           "code": "4340",
    //           "parentCode": "431",
    //           "name": "四平",
    //           "id": 174
    //         },
    //         {
    //           "code": "4380",
    //           "parentCode": "431",
    //           "name": "松原",
    //           "id": 175
    //         },
    //         {
    //           "code": "4320",
    //           "parentCode": "431",
    //           "name": "吉林",
    //           "id": 176
    //         },
    //         {
    //           "code": "4390",
    //           "parentCode": "431",
    //           "name": "白山",
    //           "id": 177
    //         },
    //         {
    //           "code": "4350",
    //           "parentCode": "431",
    //           "name": "通化",
    //           "id": 178
    //         },
    //         {
    //           "code": "4330",
    //           "parentCode": "431",
    //           "name": "延边",
    //           "id": 179
    //         },
    //         {
    //           "code": "4360",
    //           "parentCode": "431",
    //           "name": "白城",
    //           "id": 180
    //         },
    //         {
    //           "code": "4370",
    //           "parentCode": "431",
    //           "name": "辽源",
    //           "id": 181
    //         }
    //       ]
    //     },
    //     {
    //       "code": "451",
    //       "parentCode": "02",
    //       "name": "黑龙江",
    //       "id": 15,
    //       "child": [{
    //           "code": "4510",
    //           "parentCode": "451",
    //           "name": "哈尔滨",
    //           "id": 182
    //         },
    //         {
    //           "code": "4520",
    //           "parentCode": "451",
    //           "name": "齐齐哈尔",
    //           "id": 183
    //         },
    //         {
    //           "code": "4560",
    //           "parentCode": "451",
    //           "name": "黑河",
    //           "id": 184
    //         },
    //         {
    //           "code": "4690",
    //           "parentCode": "451",
    //           "name": "双鸭山",
    //           "id": 185
    //         },
    //         {
    //           "code": "4580",
    //           "parentCode": "451",
    //           "name": "伊春",
    //           "id": 186
    //         },
    //         {
    //           "code": "4680",
    //           "parentCode": "451",
    //           "name": "鹤岗",
    //           "id": 187
    //         },
    //         {
    //           "code": "4540",
    //           "parentCode": "451",
    //           "name": "佳木斯",
    //           "id": 188
    //         },
    //         {
    //           "code": "4530",
    //           "parentCode": "451",
    //           "name": "牡丹江",
    //           "id": 189
    //         },
    //         {
    //           "code": "4590",
    //           "parentCode": "451",
    //           "name": "大庆",
    //           "id": 190
    //         },
    //         {
    //           "code": "4640",
    //           "parentCode": "451",
    //           "name": "七台河",
    //           "id": 191
    //         },
    //         {
    //           "code": "4550",
    //           "parentCode": "451",
    //           "name": "绥化",
    //           "id": 192
    //         },
    //         {
    //           "code": "4670",
    //           "parentCode": "451",
    //           "name": "鸡西",
    //           "id": 193
    //         },
    //         {
    //           "code": "4570",
    //           "parentCode": "451",
    //           "name": "大兴安岭",
    //           "id": 194
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "code": "03",
    //   "parentCode": "0",
    //   "name": "华东北",
    //   "id": 396,
    //   "child": [{
    //       "code": "250",
    //       "parentCode": "03",
    //       "name": "江苏",
    //       "id": 7,
    //       "child": [{
    //           "code": "5150",
    //           "parentCode": "250",
    //           "name": "盐城",
    //           "id": 71
    //         },
    //         {
    //           "code": "5190",
    //           "parentCode": "250",
    //           "name": "常州",
    //           "id": 72
    //         },
    //         {
    //           "code": "5160",
    //           "parentCode": "250",
    //           "name": "徐州",
    //           "id": 73
    //         },
    //         {
    //           "code": "5120",
    //           "parentCode": "250",
    //           "name": "苏州",
    //           "id": 74
    //         },
    //         {
    //           "code": "5110",
    //           "parentCode": "250",
    //           "name": "镇江",
    //           "id": 75
    //         },
    //         {
    //           "code": "2500",
    //           "parentCode": "250",
    //           "name": "南京",
    //           "id": 76
    //         },
    //         {
    //           "code": "5270",
    //           "parentCode": "250",
    //           "name": "宿迁",
    //           "id": 77
    //         },
    //         {
    //           "code": "5140",
    //           "parentCode": "250",
    //           "name": "扬州",
    //           "id": 78
    //         },
    //         {
    //           "code": "5170",
    //           "parentCode": "250",
    //           "name": "淮安",
    //           "id": 79
    //         },
    //         {
    //           "code": "5230",
    //           "parentCode": "250",
    //           "name": "泰州",
    //           "id": 80
    //         },
    //         {
    //           "code": "5180",
    //           "parentCode": "250",
    //           "name": "连云港",
    //           "id": 81
    //         },
    //         {
    //           "code": "5130",
    //           "parentCode": "250",
    //           "name": "南通",
    //           "id": 82
    //         },
    //         {
    //           "code": "5100",
    //           "parentCode": "250",
    //           "name": "无锡",
    //           "id": 83
    //         }
    //       ]
    //     },
    //     {
    //       "code": "531",
    //       "parentCode": "03",
    //       "name": "山东",
    //       "id": 17,
    //       "child": [{
    //           "code": "5330",
    //           "parentCode": "531",
    //           "name": "淄博",
    //           "id": 207
    //         },
    //         {
    //           "code": "5380",
    //           "parentCode": "531",
    //           "name": "泰安",
    //           "id": 208
    //         },
    //         {
    //           "code": "5370",
    //           "parentCode": "531",
    //           "name": "济宁",
    //           "id": 209
    //         },
    //         {
    //           "code": "6350",
    //           "parentCode": "531",
    //           "name": "聊城",
    //           "id": 210
    //         },
    //         {
    //           "code": "6330",
    //           "parentCode": "531",
    //           "name": "日照",
    //           "id": 211
    //         },
    //         {
    //           "code": "6320",
    //           "parentCode": "531",
    //           "name": "枣庄",
    //           "id": 212
    //         },
    //         {
    //           "code": "6310",
    //           "parentCode": "531",
    //           "name": "威海",
    //           "id": 213
    //         },
    //         {
    //           "code": "5430",
    //           "parentCode": "531",
    //           "name": "滨州",
    //           "id": 214
    //         },
    //         {
    //           "code": "5390",
    //           "parentCode": "531",
    //           "name": "临沂",
    //           "id": 215
    //         },
    //         {
    //           "code": "5360",
    //           "parentCode": "531",
    //           "name": "潍坊",
    //           "id": 216
    //         },
    //         {
    //           "code": "5350",
    //           "parentCode": "531",
    //           "name": "烟台",
    //           "id": 217
    //         },
    //         {
    //           "code": "5340",
    //           "parentCode": "531",
    //           "name": "德州",
    //           "id": 218
    //         },
    //         {
    //           "code": "5320",
    //           "parentCode": "531",
    //           "name": "青岛",
    //           "id": 219
    //         },
    //         {
    //           "code": "5310",
    //           "parentCode": "531",
    //           "name": "济南",
    //           "id": 220
    //         },
    //         {
    //           "code": "5460",
    //           "parentCode": "531",
    //           "name": "东营",
    //           "id": 221
    //         },
    //         {
    //           "code": "5300",
    //           "parentCode": "531",
    //           "name": "菏泽",
    //           "id": 222
    //         }
    //       ]
    //     },
    //     {
    //       "code": "551",
    //       "parentCode": "03",
    //       "name": "安徽",
    //       "id": 18,
    //       "child": [{
    //           "code": "5590",
    //           "parentCode": "551",
    //           "name": "黄山",
    //           "id": 223
    //         },
    //         {
    //           "code": "5560",
    //           "parentCode": "551",
    //           "name": "安庆",
    //           "id": 224
    //         },
    //         {
    //           "code": "5540",
    //           "parentCode": "551",
    //           "name": "淮南",
    //           "id": 225
    //         },
    //         {
    //           "code": "5530",
    //           "parentCode": "551",
    //           "name": "芜湖",
    //           "id": 226
    //         },
    //         {
    //           "code": "5500",
    //           "parentCode": "551",
    //           "name": "滁州",
    //           "id": 227
    //         },
    //         {
    //           "code": "5660",
    //           "parentCode": "551",
    //           "name": "池州",
    //           "id": 228
    //         },
    //         {
    //           "code": "5630",
    //           "parentCode": "551",
    //           "name": "宣城",
    //           "id": 229
    //         },
    //         {
    //           "code": "5550",
    //           "parentCode": "551",
    //           "name": "马鞍山",
    //           "id": 230
    //         },
    //         {
    //           "code": "5581",
    //           "parentCode": "551",
    //           "name": "亳州",
    //           "id": 231
    //         },
    //         {
    //           "code": "5580",
    //           "parentCode": "551",
    //           "name": "阜阳",
    //           "id": 232
    //         },
    //         {
    //           "code": "5610",
    //           "parentCode": "551",
    //           "name": "淮北",
    //           "id": 233
    //         },
    //         {
    //           "code": "5520",
    //           "parentCode": "551",
    //           "name": "蚌埠",
    //           "id": 234
    //         },
    //         {
    //           "code": "5510",
    //           "parentCode": "551",
    //           "name": "合肥",
    //           "id": 235
    //         },
    //         {
    //           "code": "5640",
    //           "parentCode": "551",
    //           "name": "六安",
    //           "id": 236
    //         },
    //         {
    //           "code": "5620",
    //           "parentCode": "551",
    //           "name": "铜陵",
    //           "id": 237
    //         },
    //         {
    //           "code": "5570",
    //           "parentCode": "551",
    //           "name": "宿州",
    //           "id": 238
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "code": "04",
    //   "parentCode": "0",
    //   "name": "华东南",
    //   "id": 397,
    //   "child": [{
    //       "code": "210",
    //       "parentCode": "04",
    //       "name": "上海",
    //       "id": 3,
    //       "child": [{
    //         "code": "2100",
    //         "parentCode": "210",
    //         "name": "上海",
    //         "id": 54
    //       }]
    //     },
    //     {
    //       "code": "571",
    //       "parentCode": "04",
    //       "name": "浙江",
    //       "id": 19,
    //       "child": [{
    //           "code": "5790",
    //           "parentCode": "571",
    //           "name": "金华",
    //           "id": 239
    //         },
    //         {
    //           "code": "5750",
    //           "parentCode": "571",
    //           "name": "绍兴",
    //           "id": 240
    //         },
    //         {
    //           "code": "5800",
    //           "parentCode": "571",
    //           "name": "舟山",
    //           "id": 241
    //         },
    //         {
    //           "code": "5700",
    //           "parentCode": "571",
    //           "name": "衢州",
    //           "id": 242
    //         },
    //         {
    //           "code": "5760",
    //           "parentCode": "571",
    //           "name": "台州",
    //           "id": 243
    //         },
    //         {
    //           "code": "5740",
    //           "parentCode": "571",
    //           "name": "宁波",
    //           "id": 244
    //         },
    //         {
    //           "code": "5710",
    //           "parentCode": "571",
    //           "name": "杭州",
    //           "id": 245
    //         },
    //         {
    //           "code": "5730",
    //           "parentCode": "571",
    //           "name": "嘉兴",
    //           "id": 246
    //         },
    //         {
    //           "code": "5770",
    //           "parentCode": "571",
    //           "name": "温州",
    //           "id": 247
    //         },
    //         {
    //           "code": "5780",
    //           "parentCode": "571",
    //           "name": "丽水",
    //           "id": 248
    //         },
    //         {
    //           "code": "5720",
    //           "parentCode": "571",
    //           "name": "湖州",
    //           "id": 249
    //         }
    //       ]
    //     },
    //     {
    //       "code": "591",
    //       "parentCode": "04",
    //       "name": "福建",
    //       "id": 20,
    //       "child": [{
    //           "code": "5920",
    //           "parentCode": "591",
    //           "name": "厦门",
    //           "id": 250
    //         },
    //         {
    //           "code": "5970",
    //           "parentCode": "591",
    //           "name": "龙岩",
    //           "id": 251
    //         },
    //         {
    //           "code": "5990",
    //           "parentCode": "591",
    //           "name": "南平",
    //           "id": 252
    //         },
    //         {
    //           "code": "5930",
    //           "parentCode": "591",
    //           "name": "宁德",
    //           "id": 253
    //         },
    //         {
    //           "code": "5910",
    //           "parentCode": "591",
    //           "name": "福州",
    //           "id": 254
    //         },
    //         {
    //           "code": "5980",
    //           "parentCode": "591",
    //           "name": "三明",
    //           "id": 255
    //         },
    //         {
    //           "code": "5940",
    //           "parentCode": "591",
    //           "name": "莆田",
    //           "id": 256
    //         },
    //         {
    //           "code": "5950",
    //           "parentCode": "591",
    //           "name": "泉州",
    //           "id": 257
    //         },
    //         {
    //           "code": "5960",
    //           "parentCode": "591",
    //           "name": "漳州",
    //           "id": 258
    //         }
    //       ]
    //     },
    //     {
    //       "code": "791",
    //       "parentCode": "04",
    //       "name": "江西",
    //       "id": 23,
    //       "child": [{
    //           "code": "7950",
    //           "parentCode": "791",
    //           "name": "宜春",
    //           "id": 287
    //         },
    //         {
    //           "code": "7910",
    //           "parentCode": "791",
    //           "name": "南昌",
    //           "id": 288
    //         },
    //         {
    //           "code": "7980",
    //           "parentCode": "791",
    //           "name": "景德镇",
    //           "id": 289
    //         },
    //         {
    //           "code": "7990",
    //           "parentCode": "791",
    //           "name": "萍乡",
    //           "id": 290
    //         },
    //         {
    //           "code": "7010",
    //           "parentCode": "791",
    //           "name": "鹰潭",
    //           "id": 291
    //         },
    //         {
    //           "code": "7940",
    //           "parentCode": "791",
    //           "name": "抚州",
    //           "id": 292
    //         },
    //         {
    //           "code": "7970",
    //           "parentCode": "791",
    //           "name": "赣州",
    //           "id": 293
    //         },
    //         {
    //           "code": "7960",
    //           "parentCode": "791",
    //           "name": "吉安",
    //           "id": 294
    //         },
    //         {
    //           "code": "7930",
    //           "parentCode": "791",
    //           "name": "上饶",
    //           "id": 295
    //         },
    //         {
    //           "code": "7900",
    //           "parentCode": "791",
    //           "name": "新余",
    //           "id": 296
    //         },
    //         {
    //           "code": "7920",
    //           "parentCode": "791",
    //           "name": "九江",
    //           "id": 297
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      "code": "05",
      "parentCode": "0",
      "name": "华南",
      "id": 398,
      "child": [{
          "code": "200",
          "parentCode": "05",
          "name": "广东",
          "id": 2,
          "child": [{
              "code": "7530",
              "parentCode": "200",
              "name": "梅州",
              "id": 33
            },
            {
              "code": "7600",
              "parentCode": "200",
              "name": "中山",
              "id": 34
            },
            {
              "code": "7620",
              "parentCode": "200",
              "name": "河源",
              "id": 35
            },
            {
              "code": "7520",
              "parentCode": "200",
              "name": "惠州",
              "id": 36
            },
            {
              "code": "6600",
              "parentCode": "200",
              "name": "汕尾",
              "id": 37
            },
            {
              "code": "7540",
              "parentCode": "200",
              "name": "汕头",
              "id": 38
            },
            {
              "code": "7510",
              "parentCode": "200",
              "name": "韶关",
              "id": 39
            },
            {
              "code": "7500",
              "parentCode": "200",
              "name": "江门",
              "id": 40
            },
            {
              "code": "6680",
              "parentCode": "200",
              "name": "茂名",
              "id": 41
            },
            {
              "code": "7680",
              "parentCode": "200",
              "name": "潮州",
              "id": 42
            },
            {
              "code": "2000",
              "parentCode": "200",
              "name": "广州",
              "id": 43
            },
            {
              "code": "7630",
              "parentCode": "200",
              "name": "清远",
              "id": 44
            },
            {
              "code": "7660",
              "parentCode": "200",
              "name": "云浮",
              "id": 45
            },
            {
              "code": "6620",
              "parentCode": "200",
              "name": "阳江",
              "id": 46
            },
            {
              "code": "7560",
              "parentCode": "200",
              "name": "珠海",
              "id": 47
            },
            {
              "code": "7590",
              "parentCode": "200",
              "name": "湛江",
              "id": 48
            },
            {
              "code": "7570",
              "parentCode": "200",
              "name": "佛山",
              "id": 49
            },
            {
              "code": "7690",
              "parentCode": "200",
              "name": "东莞",
              "id": 50
            },
            {
              "code": "7550",
              "parentCode": "200",
              "name": "深圳",
              "id": 51
            },
            {
              "code": "7580",
              "parentCode": "200",
              "name": "肇庆",
              "id": 52
            },
            {
              "code": "6630",
              "parentCode": "200",
              "name": "揭阳",
              "id": 53
            }
          ]
        },
        // {
        //   "code": "771",
        //   "parentCode": "05",
        //   "name": "广西",
        //   "id": 22,
        //   "child": [{
        //       "code": "7760",
        //       "parentCode": "771",
        //       "name": "百色",
        //       "id": 273
        //     },
        //     {
        //       "code": "7780",
        //       "parentCode": "771",
        //       "name": "河池",
        //       "id": 274
        //     },
        //     {
        //       "code": "7700",
        //       "parentCode": "771",
        //       "name": "防城港",
        //       "id": 275
        //     },
        //     {
        //       "code": "7730",
        //       "parentCode": "771",
        //       "name": "桂林",
        //       "id": 276
        //     },
        //     {
        //       "code": "7711",
        //       "parentCode": "771",
        //       "name": "崇左",
        //       "id": 277
        //     },
        //     {
        //       "code": "7710",
        //       "parentCode": "771",
        //       "name": "南宁",
        //       "id": 278
        //     },
        //     {
        //       "code": "7721",
        //       "parentCode": "771",
        //       "name": "来宾",
        //       "id": 279
        //     },
        //     {
        //       "code": "7720",
        //       "parentCode": "771",
        //       "name": "柳州",
        //       "id": 280
        //     },
        //     {
        //       "code": "7741",
        //       "parentCode": "771",
        //       "name": "贺州",
        //       "id": 281
        //     },
        //     {
        //       "code": "7740",
        //       "parentCode": "771",
        //       "name": "梧州",
        //       "id": 282
        //     },
        //     {
        //       "code": "7770",
        //       "parentCode": "771",
        //       "name": "钦州",
        //       "id": 283
        //     },
        //     {
        //       "code": "7751",
        //       "parentCode": "771",
        //       "name": "贵港",
        //       "id": 284
        //     },
        //     {
        //       "code": "7750",
        //       "parentCode": "771",
        //       "name": "玉林",
        //       "id": 285
        //     },
        //     {
        //       "code": "7790",
        //       "parentCode": "771",
        //       "name": "北海",
        //       "id": 286
        //     }
        //   ]
        // },
        // {
        //   "code": "898",
        //   "parentCode": "05",
        //   "name": "海南",
        //   "id": 27,
        //   "child": [{
        //       "code": "8981",
        //       "parentCode": "898",
        //       "name": "保亭",
        //       "id": 331
        //     },
        //     {
        //       "code": "8982",
        //       "parentCode": "898",
        //       "name": "昌江",
        //       "id": 332
        //     },
        //     {
        //       "code": "8983",
        //       "parentCode": "898",
        //       "name": "澄迈",
        //       "id": 333
        //     },
        //     {
        //       "code": "8984",
        //       "parentCode": "898",
        //       "name": "儋州",
        //       "id": 334
        //     },
        //     {
        //       "code": "8985",
        //       "parentCode": "898",
        //       "name": "定安",
        //       "id": 335
        //     },
        //     {
        //       "code": "8986",
        //       "parentCode": "898",
        //       "name": "东方",
        //       "id": 336
        //     },
        //     {
        //       "code": "8987",
        //       "parentCode": "898",
        //       "name": "乐东",
        //       "id": 337
        //     },
        //     {
        //       "code": "8988",
        //       "parentCode": "898",
        //       "name": "临高",
        //       "id": 338
        //     },
        //     {
        //       "code": "8989",
        //       "parentCode": "898",
        //       "name": "陵水",
        //       "id": 339
        //     },
        //     {
        //       "code": "8990",
        //       "parentCode": "898",
        //       "name": "三亚",
        //       "id": 340
        //     },
        //     {
        //       "code": "8991",
        //       "parentCode": "898",
        //       "name": "琼海",
        //       "id": 341
        //     },
        //     {
        //       "code": "8992",
        //       "parentCode": "898",
        //       "name": "三沙",
        //       "id": 342
        //     },
        //     {
        //       "code": "8993",
        //       "parentCode": "898",
        //       "name": "琼中",
        //       "id": 343
        //     },
        //     {
        //       "code": "8994",
        //       "parentCode": "898",
        //       "name": "屯昌",
        //       "id": 344
        //     },
        //     {
        //       "code": "8995",
        //       "parentCode": "898",
        //       "name": "万宁",
        //       "id": 345
        //     },
        //     {
        //       "code": "8996",
        //       "parentCode": "898",
        //       "name": "文昌",
        //       "id": 346
        //     },
        //     {
        //       "code": "8997",
        //       "parentCode": "898",
        //       "name": "五指山",
        //       "id": 347
        //     },
        //     {
        //       "code": "8998",
        //       "parentCode": "898",
        //       "name": "白沙",
        //       "id": 348
        //     },
        //     {
        //       "code": "8980",
        //       "parentCode": "898",
        //       "name": "海口",
        //       "id": 349
        //     }
        //   ]
        // }
      ]
    },
    // {
    //   "code": "06",
    //   "parentCode": "0",
    //   "name": "华中",
    //   "id": 399,
    //   "child": [{
    //       "code": "270",
    //       "parentCode": "06",
    //       "name": "湖北",
    //       "id": 8,
    //       "child": [{
    //           "code": "7160",
    //           "parentCode": "270",
    //           "name": "荆州",
    //           "id": 84
    //         },
    //         {
    //           "code": "7190",
    //           "parentCode": "270",
    //           "name": "十堰",
    //           "id": 85
    //         },
    //         {
    //           "code": "7170",
    //           "parentCode": "270",
    //           "name": "宜昌",
    //           "id": 86
    //         },
    //         {
    //           "code": "7240",
    //           "parentCode": "270",
    //           "name": "荆门",
    //           "id": 87
    //         },
    //         {
    //           "code": "7150",
    //           "parentCode": "270",
    //           "name": "咸宁",
    //           "id": 88
    //         },
    //         {
    //           "code": "7130",
    //           "parentCode": "270",
    //           "name": "黄冈",
    //           "id": 89
    //         },
    //         {
    //           "code": "7120",
    //           "parentCode": "270",
    //           "name": "孝感",
    //           "id": 90
    //         },
    //         {
    //           "code": "7110",
    //           "parentCode": "270",
    //           "name": "鄂州",
    //           "id": 91
    //         },
    //         {
    //           "code": "7100",
    //           "parentCode": "270",
    //           "name": "襄阳",
    //           "id": 92
    //         },
    //         {
    //           "code": "2700",
    //           "parentCode": "270",
    //           "name": "武汉",
    //           "id": 93
    //         },
    //         {
    //           "code": "7220",
    //           "parentCode": "270",
    //           "name": "随州",
    //           "id": 94
    //         },
    //         {
    //           "code": "7140",
    //           "parentCode": "270",
    //           "name": "黄石",
    //           "id": 95
    //         },
    //         {
    //           "code": "7180",
    //           "parentCode": "270",
    //           "name": "恩施",
    //           "id": 96
    //         },
    //         {
    //           "code": "7281",
    //           "parentCode": "270",
    //           "name": "潜江",
    //           "id": 97
    //         },
    //         {
    //           "code": "7282",
    //           "parentCode": "270",
    //           "name": "天门",
    //           "id": 98
    //         },
    //         {
    //           "code": "7280",
    //           "parentCode": "270",
    //           "name": "江汉",
    //           "id": 99
    //         }
    //       ]
    //     },
    //     {
    //       "code": "371",
    //       "parentCode": "06",
    //       "name": "河南",
    //       "id": 13,
    //       "child": [{
    //           "code": "3950",
    //           "parentCode": "371",
    //           "name": "漯河",
    //           "id": 155
    //         },
    //         {
    //           "code": "3940",
    //           "parentCode": "371",
    //           "name": "周口",
    //           "id": 156
    //         },
    //         {
    //           "code": "3980",
    //           "parentCode": "371",
    //           "name": "三门峡",
    //           "id": 157
    //         },
    //         {
    //           "code": "3700",
    //           "parentCode": "371",
    //           "name": "商丘",
    //           "id": 158
    //         },
    //         {
    //           "code": "3720",
    //           "parentCode": "371",
    //           "name": "安阳",
    //           "id": 159
    //         },
    //         {
    //           "code": "3750",
    //           "parentCode": "371",
    //           "name": "平顶山",
    //           "id": 160
    //         },
    //         {
    //           "code": "3780",
    //           "parentCode": "371",
    //           "name": "开封",
    //           "id": 161
    //         },
    //         {
    //           "code": "3920",
    //           "parentCode": "371",
    //           "name": "鹤壁",
    //           "id": 162
    //         },
    //         {
    //           "code": "3930",
    //           "parentCode": "371",
    //           "name": "濮阳",
    //           "id": 163
    //         },
    //         {
    //           "code": "3960",
    //           "parentCode": "371",
    //           "name": "驻马店",
    //           "id": 164
    //         },
    //         {
    //           "code": "3790",
    //           "parentCode": "371",
    //           "name": "洛阳",
    //           "id": 165
    //         },
    //         {
    //           "code": "3770",
    //           "parentCode": "371",
    //           "name": "南阳",
    //           "id": 166
    //         },
    //         {
    //           "code": "3740",
    //           "parentCode": "371",
    //           "name": "许昌",
    //           "id": 167
    //         },
    //         {
    //           "code": "3710",
    //           "parentCode": "371",
    //           "name": "郑州",
    //           "id": 168
    //         },
    //         {
    //           "code": "3760",
    //           "parentCode": "371",
    //           "name": "信阳",
    //           "id": 169
    //         },
    //         {
    //           "code": "3730",
    //           "parentCode": "371",
    //           "name": "新乡",
    //           "id": 170
    //         },
    //         {
    //           "code": "3911",
    //           "parentCode": "371",
    //           "name": "济源",
    //           "id": 171
    //         },
    //         {
    //           "code": "3910",
    //           "parentCode": "371",
    //           "name": "焦作",
    //           "id": 172
    //         }
    //       ]
    //     },
    //     {
    //       "code": "731",
    //       "parentCode": "06",
    //       "name": "湖南",
    //       "id": 21,
    //       "child": [{
    //           "code": "7440",
    //           "parentCode": "731",
    //           "name": "张家界",
    //           "id": 259
    //         },
    //         {
    //           "code": "7390",
    //           "parentCode": "731",
    //           "name": "邵阳",
    //           "id": 260
    //         },
    //         {
    //           "code": "7330",
    //           "parentCode": "731",
    //           "name": "株洲",
    //           "id": 261
    //         },
    //         {
    //           "code": "7310",
    //           "parentCode": "731",
    //           "name": "长沙",
    //           "id": 262
    //         },
    //         {
    //           "code": "7320",
    //           "parentCode": "731",
    //           "name": "湘潭",
    //           "id": 263
    //         },
    //         {
    //           "code": "7350",
    //           "parentCode": "731",
    //           "name": "郴州",
    //           "id": 264
    //         },
    //         {
    //           "code": "7430",
    //           "parentCode": "731",
    //           "name": "湘西州",
    //           "id": 265
    //         },
    //         {
    //           "code": "7380",
    //           "parentCode": "731",
    //           "name": "娄底",
    //           "id": 266
    //         },
    //         {
    //           "code": "7360",
    //           "parentCode": "731",
    //           "name": "常德",
    //           "id": 267
    //         },
    //         {
    //           "code": "7460",
    //           "parentCode": "731",
    //           "name": "永州",
    //           "id": 268
    //         },
    //         {
    //           "code": "7340",
    //           "parentCode": "731",
    //           "name": "衡阳",
    //           "id": 269
    //         },
    //         {
    //           "code": "7370",
    //           "parentCode": "731",
    //           "name": "益阳",
    //           "id": 270
    //         },
    //         {
    //           "code": "7300",
    //           "parentCode": "731",
    //           "name": "岳阳",
    //           "id": 271
    //         },
    //         {
    //           "code": "7450",
    //           "parentCode": "731",
    //           "name": "怀化",
    //           "id": 272
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "code": "07",
    //   "parentCode": "0",
    //   "name": "西南",
    //   "id": 400,
    //   "child": [{
    //       "code": "230",
    //       "parentCode": "07",
    //       "name": "重庆",
    //       "id": 5,
    //       "child": [{
    //         "code": "2300",
    //         "parentCode": "230",
    //         "name": "重庆",
    //         "id": 56
    //       }]
    //     },
    //     {
    //       "code": "280",
    //       "parentCode": "07",
    //       "name": "四川",
    //       "id": 9,
    //       "child": [{
    //           "code": "8390",
    //           "parentCode": "280",
    //           "name": "广元",
    //           "id": 100
    //         },
    //         {
    //           "code": "8370",
    //           "parentCode": "280",
    //           "name": "阿坝",
    //           "id": 101
    //         },
    //         {
    //           "code": "8160",
    //           "parentCode": "280",
    //           "name": "绵阳",
    //           "id": 102
    //         },
    //         {
    //           "code": "8270",
    //           "parentCode": "280",
    //           "name": "巴中",
    //           "id": 103
    //         },
    //         {
    //           "code": "2801",
    //           "parentCode": "280",
    //           "name": "眉山",
    //           "id": 104
    //         },
    //         {
    //           "code": "2802",
    //           "parentCode": "280",
    //           "name": "资阳",
    //           "id": 105
    //         },
    //         {
    //           "code": "2800",
    //           "parentCode": "280",
    //           "name": "成都",
    //           "id": 106
    //         },
    //         {
    //           "code": "2803",
    //           "parentCode": "280",
    //           "name": "天府新区",
    //           "id": 107
    //         },
    //         {
    //           "code": "8360",
    //           "parentCode": "280",
    //           "name": "甘孜",
    //           "id": 108
    //         },
    //         {
    //           "code": "8340",
    //           "parentCode": "280",
    //           "name": "凉山",
    //           "id": 109
    //         },
    //         {
    //           "code": "8320",
    //           "parentCode": "280",
    //           "name": "内江",
    //           "id": 110
    //         },
    //         {
    //           "code": "8260",
    //           "parentCode": "280",
    //           "name": "广安",
    //           "id": 111
    //         },
    //         {
    //           "code": "8180",
    //           "parentCode": "280",
    //           "name": "达州",
    //           "id": 112
    //         },
    //         {
    //           "code": "8170",
    //           "parentCode": "280",
    //           "name": "南充",
    //           "id": 113
    //         },
    //         {
    //           "code": "8130",
    //           "parentCode": "280",
    //           "name": "自贡",
    //           "id": 114
    //         },
    //         {
    //           "code": "8120",
    //           "parentCode": "280",
    //           "name": "攀枝花",
    //           "id": 115
    //         },
    //         {
    //           "code": "8250",
    //           "parentCode": "280",
    //           "name": "遂宁",
    //           "id": 116
    //         },
    //         {
    //           "code": "8350",
    //           "parentCode": "280",
    //           "name": "雅安",
    //           "id": 117
    //         },
    //         {
    //           "code": "8380",
    //           "parentCode": "280",
    //           "name": "德阳",
    //           "id": 118
    //         },
    //         {
    //           "code": "8300",
    //           "parentCode": "280",
    //           "name": "泸州",
    //           "id": 119
    //         },
    //         {
    //           "code": "8330",
    //           "parentCode": "280",
    //           "name": "乐山",
    //           "id": 120
    //         },
    //         {
    //           "code": "8310",
    //           "parentCode": "280",
    //           "name": "宜宾",
    //           "id": 121
    //         }
    //       ]
    //     },
    //     {
    //       "code": "851",
    //       "parentCode": "07",
    //       "name": "贵州",
    //       "id": 24,
    //       "child": [{
    //           "code": "8590",
    //           "parentCode": "851",
    //           "name": "兴义",
    //           "id": 298
    //         },
    //         {
    //           "code": "8560",
    //           "parentCode": "851",
    //           "name": "铜仁",
    //           "id": 299
    //         },
    //         {
    //           "code": "8570",
    //           "parentCode": "851",
    //           "name": "毕节",
    //           "id": 300
    //         },
    //         {
    //           "code": "8580",
    //           "parentCode": "851",
    //           "name": "六盘水",
    //           "id": 301
    //         },
    //         {
    //           "code": "8550",
    //           "parentCode": "851",
    //           "name": "凯里",
    //           "id": 302
    //         },
    //         {
    //           "code": "8510",
    //           "parentCode": "851",
    //           "name": "贵阳",
    //           "id": 303
    //         },
    //         {
    //           "code": "8520",
    //           "parentCode": "851",
    //           "name": "遵义",
    //           "id": 304
    //         },
    //         {
    //           "code": "8530",
    //           "parentCode": "851",
    //           "name": "安顺",
    //           "id": 305
    //         },
    //         {
    //           "code": "8540",
    //           "parentCode": "851",
    //           "name": "都匀",
    //           "id": 306
    //         },
    //         {
    //           "code": "8600",
    //           "parentCode": "851",
    //           "name": "贵安",
    //           "id": 307
    //         }
    //       ]
    //     },
    //     {
    //       "code": "871",
    //       "parentCode": "07",
    //       "name": "云南",
    //       "id": 25,
    //       "child": [{
    //           "code": "8830",
    //           "parentCode": "871",
    //           "name": "临沧",
    //           "id": 308
    //         },
    //         {
    //           "code": "8720",
    //           "parentCode": "871",
    //           "name": "大理",
    //           "id": 309
    //         },
    //         {
    //           "code": "8730",
    //           "parentCode": "871",
    //           "name": "红河",
    //           "id": 310
    //         },
    //         {
    //           "code": "8760",
    //           "parentCode": "871",
    //           "name": "文山",
    //           "id": 311
    //         },
    //         {
    //           "code": "8780",
    //           "parentCode": "871",
    //           "name": "楚雄",
    //           "id": 312
    //         },
    //         {
    //           "code": "8860",
    //           "parentCode": "871",
    //           "name": "怒江",
    //           "id": 313
    //         },
    //         {
    //           "code": "8740",
    //           "parentCode": "871",
    //           "name": "曲靖",
    //           "id": 314
    //         },
    //         {
    //           "code": "8700",
    //           "parentCode": "871",
    //           "name": "昭通",
    //           "id": 315
    //         },
    //         {
    //           "code": "8870",
    //           "parentCode": "871",
    //           "name": "迪庆",
    //           "id": 316
    //         },
    //         {
    //           "code": "8790",
    //           "parentCode": "871",
    //           "name": "普洱",
    //           "id": 317
    //         },
    //         {
    //           "code": "8750",
    //           "parentCode": "871",
    //           "name": "保山",
    //           "id": 318
    //         },
    //         {
    //           "code": "8880",
    //           "parentCode": "871",
    //           "name": "丽江",
    //           "id": 319
    //         },
    //         {
    //           "code": "8710",
    //           "parentCode": "871",
    //           "name": "昆明",
    //           "id": 320
    //         },
    //         {
    //           "code": "6920",
    //           "parentCode": "871",
    //           "name": "德宏",
    //           "id": 321
    //         },
    //         {
    //           "code": "8770",
    //           "parentCode": "871",
    //           "name": "玉溪",
    //           "id": 322
    //         },
    //         {
    //           "code": "6910",
    //           "parentCode": "871",
    //           "name": "版纳",
    //           "id": 323
    //         }
    //       ]
    //     },
    //     {
    //       "code": "891",
    //       "parentCode": "07",
    //       "name": "西藏",
    //       "id": 26,
    //       "child": [{
    //           "code": "8930",
    //           "parentCode": "891",
    //           "name": "山南",
    //           "id": 324
    //         },
    //         {
    //           "code": "8910",
    //           "parentCode": "891",
    //           "name": "拉萨",
    //           "id": 325
    //         },
    //         {
    //           "code": "8950",
    //           "parentCode": "891",
    //           "name": "昌都",
    //           "id": 326
    //         },
    //         {
    //           "code": "8970",
    //           "parentCode": "891",
    //           "name": "阿里",
    //           "id": 327
    //         },
    //         {
    //           "code": "8940",
    //           "parentCode": "891",
    //           "name": "林芝",
    //           "id": 328
    //         },
    //         {
    //           "code": "8920",
    //           "parentCode": "891",
    //           "name": "日喀则",
    //           "id": 329
    //         },
    //         {
    //           "code": "8960",
    //           "parentCode": "891",
    //           "name": "那曲",
    //           "id": 330
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   "code": "08",
    //   "parentCode": "0",
    //   "name": "西北",
    //   "id": 401,
    //   "child": [{
    //       "code": "290",
    //       "parentCode": "08",
    //       "name": "陕西",
    //       "id": 10,
    //       "child": [{
    //           "code": "9170",
    //           "parentCode": "290",
    //           "name": "宝鸡",
    //           "id": 122
    //         },
    //         {
    //           "code": "9130",
    //           "parentCode": "290",
    //           "name": "渭南",
    //           "id": 123
    //         },
    //         {
    //           "code": "9150",
    //           "parentCode": "290",
    //           "name": "安康",
    //           "id": 124
    //         },
    //         {
    //           "code": "9120",
    //           "parentCode": "290",
    //           "name": "榆林",
    //           "id": 125
    //         },
    //         {
    //           "code": "9110",
    //           "parentCode": "290",
    //           "name": "延安",
    //           "id": 126
    //         },
    //         {
    //           "code": "9140",
    //           "parentCode": "290",
    //           "name": "商洛",
    //           "id": 127
    //         },
    //         {
    //           "code": "9160",
    //           "parentCode": "290",
    //           "name": "汉中",
    //           "id": 128
    //         },
    //         {
    //           "code": "9100",
    //           "parentCode": "290",
    //           "name": "咸阳",
    //           "id": 129
    //         },
    //         {
    //           "code": "2900",
    //           "parentCode": "290",
    //           "name": "西安",
    //           "id": 130
    //         },
    //         {
    //           "code": "9190",
    //           "parentCode": "290",
    //           "name": "铜川",
    //           "id": 131
    //         }
    //       ]
    //     },
    //     {
    //       "code": "931",
    //       "parentCode": "08",
    //       "name": "甘肃",
    //       "id": 28,
    //       "child": [{
    //           "code": "9410",
    //           "parentCode": "931",
    //           "name": "甘南",
    //           "id": 350
    //         },
    //         {
    //           "code": "9340",
    //           "parentCode": "931",
    //           "name": "庆阳",
    //           "id": 351
    //         },
    //         {
    //           "code": "9310",
    //           "parentCode": "931",
    //           "name": "兰州",
    //           "id": 352
    //         },
    //         {
    //           "code": "9360",
    //           "parentCode": "931",
    //           "name": "张掖",
    //           "id": 353
    //         },
    //         {
    //           "code": "9330",
    //           "parentCode": "931",
    //           "name": "平凉",
    //           "id": 354
    //         },
    //         {
    //           "code": "9430",
    //           "parentCode": "931",
    //           "name": "白银",
    //           "id": 355
    //         },
    //         {
    //           "code": "9371",
    //           "parentCode": "931",
    //           "name": "嘉峪关",
    //           "id": 356
    //         },
    //         {
    //           "code": "9370",
    //           "parentCode": "931",
    //           "name": "酒泉",
    //           "id": 357
    //         },
    //         {
    //           "code": "9300",
    //           "parentCode": "931",
    //           "name": "临夏",
    //           "id": 358
    //         },
    //         {
    //           "code": "9390",
    //           "parentCode": "931",
    //           "name": "陇南",
    //           "id": 359
    //         },
    //         {
    //           "code": "9320",
    //           "parentCode": "931",
    //           "name": "定西",
    //           "id": 360
    //         },
    //         {
    //           "code": "9351",
    //           "parentCode": "931",
    //           "name": "武威",
    //           "id": 361
    //         },
    //         {
    //           "code": "9350",
    //           "parentCode": "931",
    //           "name": "金昌",
    //           "id": 362
    //         },
    //         {
    //           "code": "9380",
    //           "parentCode": "931",
    //           "name": "天水",
    //           "id": 363
    //         }
    //       ]
    //     },
    //     {
    //       "code": "951",
    //       "parentCode": "08",
    //       "name": "宁夏",
    //       "id": 29,
    //       "child": [{
    //           "code": "9530",
    //           "parentCode": "951",
    //           "name": "吴忠",
    //           "id": 364
    //         },
    //         {
    //           "code": "9520",
    //           "parentCode": "951",
    //           "name": "石嘴山",
    //           "id": 365
    //         },
    //         {
    //           "code": "9540",
    //           "parentCode": "951",
    //           "name": "固原",
    //           "id": 366
    //         },
    //         {
    //           "code": "9550",
    //           "parentCode": "951",
    //           "name": "中卫",
    //           "id": 367
    //         },
    //         {
    //           "code": "9510",
    //           "parentCode": "951",
    //           "name": "银川",
    //           "id": 368
    //         }
    //       ]
    //     },
    //     {
    //       "code": "971",
    //       "parentCode": "08",
    //       "name": "青海",
    //       "id": 30,
    //       "child": [{
    //           "code": "9710",
    //           "parentCode": "971",
    //           "name": "西宁",
    //           "id": 369
    //         },
    //         {
    //           "code": "9720",
    //           "parentCode": "971",
    //           "name": "海东",
    //           "id": 370
    //         },
    //         {
    //           "code": "9770",
    //           "parentCode": "971",
    //           "name": "海西",
    //           "id": 371
    //         },
    //         {
    //           "code": "9730",
    //           "parentCode": "971",
    //           "name": "黄南",
    //           "id": 372
    //         },
    //         {
    //           "code": "9700",
    //           "parentCode": "971",
    //           "name": "海北",
    //           "id": 373
    //         },
    //         {
    //           "code": "9790",
    //           "parentCode": "971",
    //           "name": "格尔木",
    //           "id": 374
    //         },
    //         {
    //           "code": "9760",
    //           "parentCode": "971",
    //           "name": "玉树",
    //           "id": 375
    //         },
    //         {
    //           "code": "9750",
    //           "parentCode": "971",
    //           "name": "果洛",
    //           "id": 376
    //         },
    //         {
    //           "code": "9740",
    //           "parentCode": "971",
    //           "name": "海南",
    //           "id": 377
    //         }
    //       ]
    //     },
    //     {
    //       "code": "991",
    //       "parentCode": "08",
    //       "name": "新疆",
    //       "id": 31,
    //       "child": [{
    //           "code": "9980",
    //           "parentCode": "991",
    //           "name": "喀什",
    //           "id": 378
    //         },
    //         {
    //           "code": "9010",
    //           "parentCode": "991",
    //           "name": "塔城",
    //           "id": 379
    //         },
    //         {
    //           "code": "9950",
    //           "parentCode": "991",
    //           "name": "吐鲁番",
    //           "id": 380
    //         },
    //         {
    //           "code": "9970",
    //           "parentCode": "991",
    //           "name": "阿克苏",
    //           "id": 381
    //         },
    //         {
    //           "code": "9940",
    //           "parentCode": "991",
    //           "name": "昌吉",
    //           "id": 382
    //         },
    //         {
    //           "code": "9910",
    //           "parentCode": "991",
    //           "name": "乌鲁木齐",
    //           "id": 383
    //         },
    //         {
    //           "code": "9030",
    //           "parentCode": "991",
    //           "name": "和田",
    //           "id": 384
    //         },
    //         {
    //           "code": "9920",
    //           "parentCode": "991",
    //           "name": "奎屯",
    //           "id": 385
    //         },
    //         {
    //           "code": "9990",
    //           "parentCode": "991",
    //           "name": "伊犁",
    //           "id": 386
    //         },
    //         {
    //           "code": "9020",
    //           "parentCode": "991",
    //           "name": "哈密",
    //           "id": 387
    //         },
    //         {
    //           "code": "9080",
    //           "parentCode": "991",
    //           "name": "克州",
    //           "id": 388
    //         },
    //         {
    //           "code": "9090",
    //           "parentCode": "991",
    //           "name": "博州",
    //           "id": 389
    //         },
    //         {
    //           "code": "9060",
    //           "parentCode": "991",
    //           "name": "阿勒泰",
    //           "id": 390
    //         },
    //         {
    //           "code": "9900",
    //           "parentCode": "991",
    //           "name": "克拉玛依",
    //           "id": 391
    //         },
    //         {
    //           "code": "9930",
    //           "parentCode": "991",
    //           "name": "石河子",
    //           "id": 392
    //         },
    //         {
    //           "code": "9960",
    //           "parentCode": "991",
    //           "name": "巴州",
    //           "id": 393
    //         }
    //       ]
    //     }
      // ]
    // }
  ]
  
  const area = [
    {
      "code": "01",
      "parentCode": "0",
      "name": "华北",
      "id": 394,
      "child": [{
          "code": "100",
          "parentCode": "01",
          "name": "北京",
          "id": 1,
          "child": [{
            "code": "1000",
            "parentCode": "100",
            "name": "北京",
            "id": 32
          }]
        },
        {
          "code": "220",
          "parentCode": "01",
          "name": "天津",
          "id": 4,
          "child": [{
            "code": "2200",
            "parentCode": "220",
            "name": "天津",
            "id": 55
          }]
        },
        {
          "code": "311",
          "parentCode": "01",
          "name": "河北",
          "id": 11,
          "child": [{
              "code": "3140",
              "parentCode": "311",
              "name": "承德",
              "id": 132
            },
            {
              "code": "3150",
              "parentCode": "311",
              "name": "唐山",
              "id": 133
            },
            {
              "code": "3110",
              "parentCode": "311",
              "name": "石家庄",
              "id": 134
            },
            {
              "code": "3350",
              "parentCode": "311",
              "name": "秦皇岛",
              "id": 135
            },
            {
              "code": "3170",
              "parentCode": "311",
              "name": "沧州",
              "id": 136
            },
            {
              "code": "3190",
              "parentCode": "311",
              "name": "邢台",
              "id": 137
            },
            {
              "code": "3130",
              "parentCode": "311",
              "name": "张家口",
              "id": 138
            },
            {
              "code": "3160",
              "parentCode": "311",
              "name": "廊坊",
              "id": 139
            },
            {
              "code": "3100",
              "parentCode": "311",
              "name": "邯郸",
              "id": 140
            },
            {
              "code": "3180",
              "parentCode": "311",
              "name": "衡水",
              "id": 141
            },
            {
              "code": "3120",
              "parentCode": "311",
              "name": "保定",
              "id": 142
            },
            {
              "code": "3360",
              "parentCode": "311",
              "name": "雄安新区",
              "id": 143
            }
          ]
        },
        {
          "code": "351",
          "parentCode": "01",
          "name": "山西",
          "id": 12,
          "child": [{
              "code": "3500",
              "parentCode": "351",
              "name": "忻州",
              "id": 144
            },
            {
              "code": "3560",
              "parentCode": "351",
              "name": "晋城",
              "id": 145
            },
            {
              "code": "3590",
              "parentCode": "351",
              "name": "运城",
              "id": 146
            },
            {
              "code": "3490",
              "parentCode": "351",
              "name": "朔州",
              "id": 147
            },
            {
              "code": "3510",
              "parentCode": "351",
              "name": "太原",
              "id": 148
            },
            {
              "code": "3550",
              "parentCode": "351",
              "name": "长治",
              "id": 149
            },
            {
              "code": "3570",
              "parentCode": "351",
              "name": "临汾",
              "id": 150
            },
            {
              "code": "3540",
              "parentCode": "351",
              "name": "晋中",
              "id": 151
            },
            {
              "code": "3530",
              "parentCode": "351",
              "name": "阳泉",
              "id": 152
            },
            {
              "code": "3580",
              "parentCode": "351",
              "name": "吕梁",
              "id": 153
            },
            {
              "code": "3520",
              "parentCode": "351",
              "name": "大同",
              "id": 154
            }
          ]
        },
        {
          "code": "471",
          "parentCode": "01",
          "name": "内蒙古",
          "id": 16,
          "child": [{
              "code": "4830",
              "parentCode": "471",
              "name": "阿拉善盟",
              "id": 195
            },
            {
              "code": "4790",
              "parentCode": "471",
              "name": "锡林郭勒",
              "id": 196
            },
            {
              "code": "4770",
              "parentCode": "471",
              "name": "鄂尔多斯",
              "id": 197
            },
            {
              "code": "4740",
              "parentCode": "471",
              "name": "乌兰察布",
              "id": 198
            },
            {
              "code": "4710",
              "parentCode": "471",
              "name": "呼和浩特",
              "id": 199
            },
            {
              "code": "4760",
              "parentCode": "471",
              "name": "赤峰",
              "id": 200
            },
            {
              "code": "4780",
              "parentCode": "471",
              "name": "临河巴彦淖尔",
              "id": 201
            },
            {
              "code": "4750",
              "parentCode": "471",
              "name": "通辽",
              "id": 202
            },
            {
              "code": "4720",
              "parentCode": "471",
              "name": "包头",
              "id": 203
            },
            {
              "code": "4700",
              "parentCode": "471",
              "name": "呼伦贝尔",
              "id": 204
            },
            {
              "code": "4730",
              "parentCode": "471",
              "name": "乌海",
              "id": 205
            },
            {
              "code": "4820",
              "parentCode": "471",
              "name": "兴安盟",
              "id": 206
            }
          ]
        }
      ]
    },
    {
      "code": "02",
      "parentCode": "0",
      "name": "东北",
      "id": 395,
      "child": [{
          "code": "240",
          "parentCode": "02",
          "name": "辽宁",
          "id": 6,
          "child": [{
              "code": "4170",
              "parentCode": "240",
              "name": "营口",
              "id": 57
            },
            {
              "code": "4210",
              "parentCode": "240",
              "name": "朝阳",
              "id": 58
            },
            {
              "code": "4110",
              "parentCode": "240",
              "name": "大连",
              "id": 59
            },
            {
              "code": "4160",
              "parentCode": "240",
              "name": "锦州",
              "id": 60
            },
            {
              "code": "4180",
              "parentCode": "240",
              "name": "阜新",
              "id": 61
            },
            {
              "code": "4190",
              "parentCode": "240",
              "name": "辽阳",
              "id": 62
            },
            {
              "code": "4270",
              "parentCode": "240",
              "name": "盘锦",
              "id": 63
            },
            {
              "code": "4130",
              "parentCode": "240",
              "name": "抚顺",
              "id": 64
            },
            {
              "code": "4100",
              "parentCode": "240",
              "name": "铁岭",
              "id": 65
            },
            {
              "code": "2400",
              "parentCode": "240",
              "name": "沈阳",
              "id": 66
            },
            {
              "code": "4120",
              "parentCode": "240",
              "name": "鞍山",
              "id": 67
            },
            {
              "code": "4150",
              "parentCode": "240",
              "name": "丹东",
              "id": 68
            },
            {
              "code": "4290",
              "parentCode": "240",
              "name": "葫芦岛",
              "id": 69
            },
            {
              "code": "4140",
              "parentCode": "240",
              "name": "本溪",
              "id": 70
            }
          ]
        },
        {
          "code": "431",
          "parentCode": "02",
          "name": "吉林",
          "id": 14,
          "child": [{
              "code": "4310",
              "parentCode": "431",
              "name": "长春",
              "id": 173
            },
            {
              "code": "4340",
              "parentCode": "431",
              "name": "四平",
              "id": 174
            },
            {
              "code": "4380",
              "parentCode": "431",
              "name": "松原",
              "id": 175
            },
            {
              "code": "4320",
              "parentCode": "431",
              "name": "吉林",
              "id": 176
            },
            {
              "code": "4390",
              "parentCode": "431",
              "name": "白山",
              "id": 177
            },
            {
              "code": "4350",
              "parentCode": "431",
              "name": "通化",
              "id": 178
            },
            {
              "code": "4330",
              "parentCode": "431",
              "name": "延边",
              "id": 179
            },
            {
              "code": "4360",
              "parentCode": "431",
              "name": "白城",
              "id": 180
            },
            {
              "code": "4370",
              "parentCode": "431",
              "name": "辽源",
              "id": 181
            }
          ]
        },
        {
          "code": "451",
          "parentCode": "02",
          "name": "黑龙江",
          "id": 15,
          "child": [{
              "code": "4510",
              "parentCode": "451",
              "name": "哈尔滨",
              "id": 182
            },
            {
              "code": "4520",
              "parentCode": "451",
              "name": "齐齐哈尔",
              "id": 183
            },
            {
              "code": "4560",
              "parentCode": "451",
              "name": "黑河",
              "id": 184
            },
            {
              "code": "4690",
              "parentCode": "451",
              "name": "双鸭山",
              "id": 185
            },
            {
              "code": "4580",
              "parentCode": "451",
              "name": "伊春",
              "id": 186
            },
            {
              "code": "4680",
              "parentCode": "451",
              "name": "鹤岗",
              "id": 187
            },
            {
              "code": "4540",
              "parentCode": "451",
              "name": "佳木斯",
              "id": 188
            },
            {
              "code": "4530",
              "parentCode": "451",
              "name": "牡丹江",
              "id": 189
            },
            {
              "code": "4590",
              "parentCode": "451",
              "name": "大庆",
              "id": 190
            },
            {
              "code": "4640",
              "parentCode": "451",
              "name": "七台河",
              "id": 191
            },
            {
              "code": "4550",
              "parentCode": "451",
              "name": "绥化",
              "id": 192
            },
            {
              "code": "4670",
              "parentCode": "451",
              "name": "鸡西",
              "id": 193
            },
            {
              "code": "4570",
              "parentCode": "451",
              "name": "大兴安岭",
              "id": 194
            }
          ]
        }
      ]
    },
    {
      "code": "03",
      "parentCode": "0",
      "name": "华东北",
      "id": 396,
      "child": [{
          "code": "250",
          "parentCode": "03",
          "name": "江苏",
          "id": 7,
          "child": [{
              "code": "5150",
              "parentCode": "250",
              "name": "盐城",
              "id": 71
            },
            {
              "code": "5190",
              "parentCode": "250",
              "name": "常州",
              "id": 72
            },
            {
              "code": "5160",
              "parentCode": "250",
              "name": "徐州",
              "id": 73
            },
            {
              "code": "5120",
              "parentCode": "250",
              "name": "苏州",
              "id": 74
            },
            {
              "code": "5110",
              "parentCode": "250",
              "name": "镇江",
              "id": 75
            },
            {
              "code": "2500",
              "parentCode": "250",
              "name": "南京",
              "id": 76
            },
            {
              "code": "5270",
              "parentCode": "250",
              "name": "宿迁",
              "id": 77
            },
            {
              "code": "5140",
              "parentCode": "250",
              "name": "扬州",
              "id": 78
            },
            {
              "code": "5170",
              "parentCode": "250",
              "name": "淮安",
              "id": 79
            },
            {
              "code": "5230",
              "parentCode": "250",
              "name": "泰州",
              "id": 80
            },
            {
              "code": "5180",
              "parentCode": "250",
              "name": "连云港",
              "id": 81
            },
            {
              "code": "5130",
              "parentCode": "250",
              "name": "南通",
              "id": 82
            },
            {
              "code": "5100",
              "parentCode": "250",
              "name": "无锡",
              "id": 83
            }
          ]
        },
        {
          "code": "531",
          "parentCode": "03",
          "name": "山东",
          "id": 17,
          "child": [{
              "code": "5330",
              "parentCode": "531",
              "name": "淄博",
              "id": 207
            },
            {
              "code": "5380",
              "parentCode": "531",
              "name": "泰安",
              "id": 208
            },
            {
              "code": "5370",
              "parentCode": "531",
              "name": "济宁",
              "id": 209
            },
            {
              "code": "6350",
              "parentCode": "531",
              "name": "聊城",
              "id": 210
            },
            {
              "code": "6330",
              "parentCode": "531",
              "name": "日照",
              "id": 211
            },
            {
              "code": "6320",
              "parentCode": "531",
              "name": "枣庄",
              "id": 212
            },
            {
              "code": "6310",
              "parentCode": "531",
              "name": "威海",
              "id": 213
            },
            {
              "code": "5430",
              "parentCode": "531",
              "name": "滨州",
              "id": 214
            },
            {
              "code": "5390",
              "parentCode": "531",
              "name": "临沂",
              "id": 215
            },
            {
              "code": "5360",
              "parentCode": "531",
              "name": "潍坊",
              "id": 216
            },
            {
              "code": "5350",
              "parentCode": "531",
              "name": "烟台",
              "id": 217
            },
            {
              "code": "5340",
              "parentCode": "531",
              "name": "德州",
              "id": 218
            },
            {
              "code": "5320",
              "parentCode": "531",
              "name": "青岛",
              "id": 219
            },
            {
              "code": "5310",
              "parentCode": "531",
              "name": "济南",
              "id": 220
            },
            {
              "code": "5460",
              "parentCode": "531",
              "name": "东营",
              "id": 221
            },
            {
              "code": "5300",
              "parentCode": "531",
              "name": "菏泽",
              "id": 222
            }
          ]
        },
        {
          "code": "551",
          "parentCode": "03",
          "name": "安徽",
          "id": 18,
          "child": [{
              "code": "5590",
              "parentCode": "551",
              "name": "黄山",
              "id": 223
            },
            {
              "code": "5560",
              "parentCode": "551",
              "name": "安庆",
              "id": 224
            },
            {
              "code": "5540",
              "parentCode": "551",
              "name": "淮南",
              "id": 225
            },
            {
              "code": "5530",
              "parentCode": "551",
              "name": "芜湖",
              "id": 226
            },
            {
              "code": "5500",
              "parentCode": "551",
              "name": "滁州",
              "id": 227
            },
            {
              "code": "5660",
              "parentCode": "551",
              "name": "池州",
              "id": 228
            },
            {
              "code": "5630",
              "parentCode": "551",
              "name": "宣城",
              "id": 229
            },
            {
              "code": "5550",
              "parentCode": "551",
              "name": "马鞍山",
              "id": 230
            },
            {
              "code": "5581",
              "parentCode": "551",
              "name": "亳州",
              "id": 231
            },
            {
              "code": "5580",
              "parentCode": "551",
              "name": "阜阳",
              "id": 232
            },
            {
              "code": "5610",
              "parentCode": "551",
              "name": "淮北",
              "id": 233
            },
            {
              "code": "5520",
              "parentCode": "551",
              "name": "蚌埠",
              "id": 234
            },
            {
              "code": "5510",
              "parentCode": "551",
              "name": "合肥",
              "id": 235
            },
            {
              "code": "5640",
              "parentCode": "551",
              "name": "六安",
              "id": 236
            },
            {
              "code": "5620",
              "parentCode": "551",
              "name": "铜陵",
              "id": 237
            },
            {
              "code": "5570",
              "parentCode": "551",
              "name": "宿州",
              "id": 238
            }
          ]
        }
      ]
    },
    {
      "code": "04",
      "parentCode": "0",
      "name": "华东南",
      "id": 397,
      "child": [{
          "code": "210",
          "parentCode": "04",
          "name": "上海",
          "id": 3,
          "child": [{
            "code": "2100",
            "parentCode": "210",
            "name": "上海",
            "id": 54
          }]
        },
        {
          "code": "571",
          "parentCode": "04",
          "name": "浙江",
          "id": 19,
          "child": [{
              "code": "5790",
              "parentCode": "571",
              "name": "金华",
              "id": 239
            },
            {
              "code": "5750",
              "parentCode": "571",
              "name": "绍兴",
              "id": 240
            },
            {
              "code": "5800",
              "parentCode": "571",
              "name": "舟山",
              "id": 241
            },
            {
              "code": "5700",
              "parentCode": "571",
              "name": "衢州",
              "id": 242
            },
            {
              "code": "5760",
              "parentCode": "571",
              "name": "台州",
              "id": 243
            },
            {
              "code": "5740",
              "parentCode": "571",
              "name": "宁波",
              "id": 244
            },
            {
              "code": "5710",
              "parentCode": "571",
              "name": "杭州",
              "id": 245
            },
            {
              "code": "5730",
              "parentCode": "571",
              "name": "嘉兴",
              "id": 246
            },
            {
              "code": "5770",
              "parentCode": "571",
              "name": "温州",
              "id": 247
            },
            {
              "code": "5780",
              "parentCode": "571",
              "name": "丽水",
              "id": 248
            },
            {
              "code": "5720",
              "parentCode": "571",
              "name": "湖州",
              "id": 249
            }
          ]
        },
        {
          "code": "591",
          "parentCode": "04",
          "name": "福建",
          "id": 20,
          "child": [{
              "code": "5920",
              "parentCode": "591",
              "name": "厦门",
              "id": 250
            },
            {
              "code": "5970",
              "parentCode": "591",
              "name": "龙岩",
              "id": 251
            },
            {
              "code": "5990",
              "parentCode": "591",
              "name": "南平",
              "id": 252
            },
            {
              "code": "5930",
              "parentCode": "591",
              "name": "宁德",
              "id": 253
            },
            {
              "code": "5910",
              "parentCode": "591",
              "name": "福州",
              "id": 254
            },
            {
              "code": "5980",
              "parentCode": "591",
              "name": "三明",
              "id": 255
            },
            {
              "code": "5940",
              "parentCode": "591",
              "name": "莆田",
              "id": 256
            },
            {
              "code": "5950",
              "parentCode": "591",
              "name": "泉州",
              "id": 257
            },
            {
              "code": "5960",
              "parentCode": "591",
              "name": "漳州",
              "id": 258
            }
          ]
        },
        {
          "code": "791",
          "parentCode": "04",
          "name": "江西",
          "id": 23,
          "child": [{
              "code": "7950",
              "parentCode": "791",
              "name": "宜春",
              "id": 287
            },
            {
              "code": "7910",
              "parentCode": "791",
              "name": "南昌",
              "id": 288
            },
            {
              "code": "7980",
              "parentCode": "791",
              "name": "景德镇",
              "id": 289
            },
            {
              "code": "7990",
              "parentCode": "791",
              "name": "萍乡",
              "id": 290
            },
            {
              "code": "7010",
              "parentCode": "791",
              "name": "鹰潭",
              "id": 291
            },
            {
              "code": "7940",
              "parentCode": "791",
              "name": "抚州",
              "id": 292
            },
            {
              "code": "7970",
              "parentCode": "791",
              "name": "赣州",
              "id": 293
            },
            {
              "code": "7960",
              "parentCode": "791",
              "name": "吉安",
              "id": 294
            },
            {
              "code": "7930",
              "parentCode": "791",
              "name": "上饶",
              "id": 295
            },
            {
              "code": "7900",
              "parentCode": "791",
              "name": "新余",
              "id": 296
            },
            {
              "code": "7920",
              "parentCode": "791",
              "name": "九江",
              "id": 297
            }
          ]
        }
      ]
    },
    {
      "code": "05",
      "parentCode": "0",
      "name": "华南",
      "id": 398,
      "child": [{
          "code": "200",
          "parentCode": "05",
          "name": "广东",
          "id": 2,
          "child": [{
              "code": "7530",
              "parentCode": "200",
              "name": "梅州",
              "id": 33
            },
            {
              "code": "7600",
              "parentCode": "200",
              "name": "中山",
              "id": 34
            },
            {
              "code": "7620",
              "parentCode": "200",
              "name": "河源",
              "id": 35
            },
            {
              "code": "7520",
              "parentCode": "200",
              "name": "惠州",
              "id": 36
            },
            {
              "code": "6600",
              "parentCode": "200",
              "name": "汕尾",
              "id": 37
            },
            {
              "code": "7540",
              "parentCode": "200",
              "name": "汕头",
              "id": 38
            },
            {
              "code": "7510",
              "parentCode": "200",
              "name": "韶关",
              "id": 39
            },
            {
              "code": "7500",
              "parentCode": "200",
              "name": "江门",
              "id": 40
            },
            {
              "code": "6680",
              "parentCode": "200",
              "name": "茂名",
              "id": 41
            },
            {
              "code": "7680",
              "parentCode": "200",
              "name": "潮州",
              "id": 42
            },
            {
              "code": "2000",
              "parentCode": "200",
              "name": "广州",
              "id": 43
            },
            {
              "code": "7630",
              "parentCode": "200",
              "name": "清远",
              "id": 44
            },
            {
              "code": "7660",
              "parentCode": "200",
              "name": "云浮",
              "id": 45
            },
            {
              "code": "6620",
              "parentCode": "200",
              "name": "阳江",
              "id": 46
            },
            {
              "code": "7560",
              "parentCode": "200",
              "name": "珠海",
              "id": 47
            },
            {
              "code": "7590",
              "parentCode": "200",
              "name": "湛江",
              "id": 48
            },
            {
              "code": "7570",
              "parentCode": "200",
              "name": "佛山",
              "id": 49
            },
            {
              "code": "7690",
              "parentCode": "200",
              "name": "东莞",
              "id": 50
            },
            {
              "code": "7550",
              "parentCode": "200",
              "name": "深圳",
              "id": 51
            },
            {
              "code": "7580",
              "parentCode": "200",
              "name": "肇庆",
              "id": 52
            },
            {
              "code": "6630",
              "parentCode": "200",
              "name": "揭阳",
              "id": 53
            }
          ]
        },
        {
          "code": "771",
          "parentCode": "05",
          "name": "广西",
          "id": 22,
          "child": [{
              "code": "7760",
              "parentCode": "771",
              "name": "百色",
              "id": 273
            },
            {
              "code": "7780",
              "parentCode": "771",
              "name": "河池",
              "id": 274
            },
            {
              "code": "7700",
              "parentCode": "771",
              "name": "防城港",
              "id": 275
            },
            {
              "code": "7730",
              "parentCode": "771",
              "name": "桂林",
              "id": 276
            },
            {
              "code": "7711",
              "parentCode": "771",
              "name": "崇左",
              "id": 277
            },
            {
              "code": "7710",
              "parentCode": "771",
              "name": "南宁",
              "id": 278
            },
            {
              "code": "7721",
              "parentCode": "771",
              "name": "来宾",
              "id": 279
            },
            {
              "code": "7720",
              "parentCode": "771",
              "name": "柳州",
              "id": 280
            },
            {
              "code": "7741",
              "parentCode": "771",
              "name": "贺州",
              "id": 281
            },
            {
              "code": "7740",
              "parentCode": "771",
              "name": "梧州",
              "id": 282
            },
            {
              "code": "7770",
              "parentCode": "771",
              "name": "钦州",
              "id": 283
            },
            {
              "code": "7751",
              "parentCode": "771",
              "name": "贵港",
              "id": 284
            },
            {
              "code": "7750",
              "parentCode": "771",
              "name": "玉林",
              "id": 285
            },
            {
              "code": "7790",
              "parentCode": "771",
              "name": "北海",
              "id": 286
            }
          ]
        },
        {
          "code": "898",
          "parentCode": "05",
          "name": "海南",
          "id": 27,
          "child": [{
              "code": "8981",
              "parentCode": "898",
              "name": "保亭",
              "id": 331
            },
            {
              "code": "8982",
              "parentCode": "898",
              "name": "昌江",
              "id": 332
            },
            {
              "code": "8983",
              "parentCode": "898",
              "name": "澄迈",
              "id": 333
            },
            {
              "code": "8984",
              "parentCode": "898",
              "name": "儋州",
              "id": 334
            },
            {
              "code": "8985",
              "parentCode": "898",
              "name": "定安",
              "id": 335
            },
            {
              "code": "8986",
              "parentCode": "898",
              "name": "东方",
              "id": 336
            },
            {
              "code": "8987",
              "parentCode": "898",
              "name": "乐东",
              "id": 337
            },
            {
              "code": "8988",
              "parentCode": "898",
              "name": "临高",
              "id": 338
            },
            {
              "code": "8989",
              "parentCode": "898",
              "name": "陵水",
              "id": 339
            },
            {
              "code": "8990",
              "parentCode": "898",
              "name": "三亚",
              "id": 340
            },
            {
              "code": "8991",
              "parentCode": "898",
              "name": "琼海",
              "id": 341
            },
            {
              "code": "8992",
              "parentCode": "898",
              "name": "三沙",
              "id": 342
            },
            {
              "code": "8993",
              "parentCode": "898",
              "name": "琼中",
              "id": 343
            },
            {
              "code": "8994",
              "parentCode": "898",
              "name": "屯昌",
              "id": 344
            },
            {
              "code": "8995",
              "parentCode": "898",
              "name": "万宁",
              "id": 345
            },
            {
              "code": "8996",
              "parentCode": "898",
              "name": "文昌",
              "id": 346
            },
            {
              "code": "8997",
              "parentCode": "898",
              "name": "五指山",
              "id": 347
            },
            {
              "code": "8998",
              "parentCode": "898",
              "name": "白沙",
              "id": 348
            },
            {
              "code": "8980",
              "parentCode": "898",
              "name": "海口",
              "id": 349
            }
          ]
        }
      ]
    },
    {
      "code": "06",
      "parentCode": "0",
      "name": "华中",
      "id": 399,
      "child": [{
          "code": "270",
          "parentCode": "06",
          "name": "湖北",
          "id": 8,
          "child": [{
              "code": "7160",
              "parentCode": "270",
              "name": "荆州",
              "id": 84
            },
            {
              "code": "7190",
              "parentCode": "270",
              "name": "十堰",
              "id": 85
            },
            {
              "code": "7170",
              "parentCode": "270",
              "name": "宜昌",
              "id": 86
            },
            {
              "code": "7240",
              "parentCode": "270",
              "name": "荆门",
              "id": 87
            },
            {
              "code": "7150",
              "parentCode": "270",
              "name": "咸宁",
              "id": 88
            },
            {
              "code": "7130",
              "parentCode": "270",
              "name": "黄冈",
              "id": 89
            },
            {
              "code": "7120",
              "parentCode": "270",
              "name": "孝感",
              "id": 90
            },
            {
              "code": "7110",
              "parentCode": "270",
              "name": "鄂州",
              "id": 91
            },
            {
              "code": "7100",
              "parentCode": "270",
              "name": "襄阳",
              "id": 92
            },
            {
              "code": "2700",
              "parentCode": "270",
              "name": "武汉",
              "id": 93
            },
            {
              "code": "7220",
              "parentCode": "270",
              "name": "随州",
              "id": 94
            },
            {
              "code": "7140",
              "parentCode": "270",
              "name": "黄石",
              "id": 95
            },
            {
              "code": "7180",
              "parentCode": "270",
              "name": "恩施",
              "id": 96
            },
            {
              "code": "7281",
              "parentCode": "270",
              "name": "潜江",
              "id": 97
            },
            {
              "code": "7282",
              "parentCode": "270",
              "name": "天门",
              "id": 98
            },
            {
              "code": "7280",
              "parentCode": "270",
              "name": "江汉",
              "id": 99
            }
          ]
        },
        {
          "code": "371",
          "parentCode": "06",
          "name": "河南",
          "id": 13,
          "child": [{
              "code": "3950",
              "parentCode": "371",
              "name": "漯河",
              "id": 155
            },
            {
              "code": "3940",
              "parentCode": "371",
              "name": "周口",
              "id": 156
            },
            {
              "code": "3980",
              "parentCode": "371",
              "name": "三门峡",
              "id": 157
            },
            {
              "code": "3700",
              "parentCode": "371",
              "name": "商丘",
              "id": 158
            },
            {
              "code": "3720",
              "parentCode": "371",
              "name": "安阳",
              "id": 159
            },
            {
              "code": "3750",
              "parentCode": "371",
              "name": "平顶山",
              "id": 160
            },
            {
              "code": "3780",
              "parentCode": "371",
              "name": "开封",
              "id": 161
            },
            {
              "code": "3920",
              "parentCode": "371",
              "name": "鹤壁",
              "id": 162
            },
            {
              "code": "3930",
              "parentCode": "371",
              "name": "濮阳",
              "id": 163
            },
            {
              "code": "3960",
              "parentCode": "371",
              "name": "驻马店",
              "id": 164
            },
            {
              "code": "3790",
              "parentCode": "371",
              "name": "洛阳",
              "id": 165
            },
            {
              "code": "3770",
              "parentCode": "371",
              "name": "南阳",
              "id": 166
            },
            {
              "code": "3740",
              "parentCode": "371",
              "name": "许昌",
              "id": 167
            },
            {
              "code": "3710",
              "parentCode": "371",
              "name": "郑州",
              "id": 168
            },
            {
              "code": "3760",
              "parentCode": "371",
              "name": "信阳",
              "id": 169
            },
            {
              "code": "3730",
              "parentCode": "371",
              "name": "新乡",
              "id": 170
            },
            {
              "code": "3911",
              "parentCode": "371",
              "name": "济源",
              "id": 171
            },
            {
              "code": "3910",
              "parentCode": "371",
              "name": "焦作",
              "id": 172
            }
          ]
        },
        {
          "code": "731",
          "parentCode": "06",
          "name": "湖南",
          "id": 21,
          "child": [{
              "code": "7440",
              "parentCode": "731",
              "name": "张家界",
              "id": 259
            },
            {
              "code": "7390",
              "parentCode": "731",
              "name": "邵阳",
              "id": 260
            },
            {
              "code": "7330",
              "parentCode": "731",
              "name": "株洲",
              "id": 261
            },
            {
              "code": "7310",
              "parentCode": "731",
              "name": "长沙",
              "id": 262
            },
            {
              "code": "7320",
              "parentCode": "731",
              "name": "湘潭",
              "id": 263
            },
            {
              "code": "7350",
              "parentCode": "731",
              "name": "郴州",
              "id": 264
            },
            {
              "code": "7430",
              "parentCode": "731",
              "name": "湘西州",
              "id": 265
            },
            {
              "code": "7380",
              "parentCode": "731",
              "name": "娄底",
              "id": 266
            },
            {
              "code": "7360",
              "parentCode": "731",
              "name": "常德",
              "id": 267
            },
            {
              "code": "7460",
              "parentCode": "731",
              "name": "永州",
              "id": 268
            },
            {
              "code": "7340",
              "parentCode": "731",
              "name": "衡阳",
              "id": 269
            },
            {
              "code": "7370",
              "parentCode": "731",
              "name": "益阳",
              "id": 270
            },
            {
              "code": "7300",
              "parentCode": "731",
              "name": "岳阳",
              "id": 271
            },
            {
              "code": "7450",
              "parentCode": "731",
              "name": "怀化",
              "id": 272
            }
          ]
        }
      ]
    },
    {
      "code": "07",
      "parentCode": "0",
      "name": "西南",
      "id": 400,
      "child": [{
          "code": "230",
          "parentCode": "07",
          "name": "重庆",
          "id": 5,
          "child": [{
            "code": "2300",
            "parentCode": "230",
            "name": "重庆",
            "id": 56
          }]
        },
        {
          "code": "280",
          "parentCode": "07",
          "name": "四川",
          "id": 9,
          "child": [{
              "code": "8390",
              "parentCode": "280",
              "name": "广元",
              "id": 100
            },
            {
              "code": "8370",
              "parentCode": "280",
              "name": "阿坝",
              "id": 101
            },
            {
              "code": "8160",
              "parentCode": "280",
              "name": "绵阳",
              "id": 102
            },
            {
              "code": "8270",
              "parentCode": "280",
              "name": "巴中",
              "id": 103
            },
            {
              "code": "2801",
              "parentCode": "280",
              "name": "眉山",
              "id": 104
            },
            {
              "code": "2802",
              "parentCode": "280",
              "name": "资阳",
              "id": 105
            },
            {
              "code": "2800",
              "parentCode": "280",
              "name": "成都",
              "id": 106
            },
            {
              "code": "2803",
              "parentCode": "280",
              "name": "天府新区",
              "id": 107
            },
            {
              "code": "8360",
              "parentCode": "280",
              "name": "甘孜",
              "id": 108
            },
            {
              "code": "8340",
              "parentCode": "280",
              "name": "凉山",
              "id": 109
            },
            {
              "code": "8320",
              "parentCode": "280",
              "name": "内江",
              "id": 110
            },
            {
              "code": "8260",
              "parentCode": "280",
              "name": "广安",
              "id": 111
            },
            {
              "code": "8180",
              "parentCode": "280",
              "name": "达州",
              "id": 112
            },
            {
              "code": "8170",
              "parentCode": "280",
              "name": "南充",
              "id": 113
            },
            {
              "code": "8130",
              "parentCode": "280",
              "name": "自贡",
              "id": 114
            },
            {
              "code": "8120",
              "parentCode": "280",
              "name": "攀枝花",
              "id": 115
            },
            {
              "code": "8250",
              "parentCode": "280",
              "name": "遂宁",
              "id": 116
            },
            {
              "code": "8350",
              "parentCode": "280",
              "name": "雅安",
              "id": 117
            },
            {
              "code": "8380",
              "parentCode": "280",
              "name": "德阳",
              "id": 118
            },
            {
              "code": "8300",
              "parentCode": "280",
              "name": "泸州",
              "id": 119
            },
            {
              "code": "8330",
              "parentCode": "280",
              "name": "乐山",
              "id": 120
            },
            {
              "code": "8310",
              "parentCode": "280",
              "name": "宜宾",
              "id": 121
            }
          ]
        },
        {
          "code": "851",
          "parentCode": "07",
          "name": "贵州",
          "id": 24,
          "child": [{
              "code": "8590",
              "parentCode": "851",
              "name": "兴义",
              "id": 298
            },
            {
              "code": "8560",
              "parentCode": "851",
              "name": "铜仁",
              "id": 299
            },
            {
              "code": "8570",
              "parentCode": "851",
              "name": "毕节",
              "id": 300
            },
            {
              "code": "8580",
              "parentCode": "851",
              "name": "六盘水",
              "id": 301
            },
            {
              "code": "8550",
              "parentCode": "851",
              "name": "凯里",
              "id": 302
            },
            {
              "code": "8510",
              "parentCode": "851",
              "name": "贵阳",
              "id": 303
            },
            {
              "code": "8520",
              "parentCode": "851",
              "name": "遵义",
              "id": 304
            },
            {
              "code": "8530",
              "parentCode": "851",
              "name": "安顺",
              "id": 305
            },
            {
              "code": "8540",
              "parentCode": "851",
              "name": "都匀",
              "id": 306
            },
            {
              "code": "8600",
              "parentCode": "851",
              "name": "贵安",
              "id": 307
            }
          ]
        },
        {
          "code": "871",
          "parentCode": "07",
          "name": "云南",
          "id": 25,
          "child": [{
              "code": "8830",
              "parentCode": "871",
              "name": "临沧",
              "id": 308
            },
            {
              "code": "8720",
              "parentCode": "871",
              "name": "大理",
              "id": 309
            },
            {
              "code": "8730",
              "parentCode": "871",
              "name": "红河",
              "id": 310
            },
            {
              "code": "8760",
              "parentCode": "871",
              "name": "文山",
              "id": 311
            },
            {
              "code": "8780",
              "parentCode": "871",
              "name": "楚雄",
              "id": 312
            },
            {
              "code": "8860",
              "parentCode": "871",
              "name": "怒江",
              "id": 313
            },
            {
              "code": "8740",
              "parentCode": "871",
              "name": "曲靖",
              "id": 314
            },
            {
              "code": "8700",
              "parentCode": "871",
              "name": "昭通",
              "id": 315
            },
            {
              "code": "8870",
              "parentCode": "871",
              "name": "迪庆",
              "id": 316
            },
            {
              "code": "8790",
              "parentCode": "871",
              "name": "普洱",
              "id": 317
            },
            {
              "code": "8750",
              "parentCode": "871",
              "name": "保山",
              "id": 318
            },
            {
              "code": "8880",
              "parentCode": "871",
              "name": "丽江",
              "id": 319
            },
            {
              "code": "8710",
              "parentCode": "871",
              "name": "昆明",
              "id": 320
            },
            {
              "code": "6920",
              "parentCode": "871",
              "name": "德宏",
              "id": 321
            },
            {
              "code": "8770",
              "parentCode": "871",
              "name": "玉溪",
              "id": 322
            },
            {
              "code": "6910",
              "parentCode": "871",
              "name": "版纳",
              "id": 323
            }
          ]
        },
        {
          "code": "891",
          "parentCode": "07",
          "name": "西藏",
          "id": 26,
          "child": [{
              "code": "8930",
              "parentCode": "891",
              "name": "山南",
              "id": 324
            },
            {
              "code": "8910",
              "parentCode": "891",
              "name": "拉萨",
              "id": 325
            },
            {
              "code": "8950",
              "parentCode": "891",
              "name": "昌都",
              "id": 326
            },
            {
              "code": "8970",
              "parentCode": "891",
              "name": "阿里",
              "id": 327
            },
            {
              "code": "8940",
              "parentCode": "891",
              "name": "林芝",
              "id": 328
            },
            {
              "code": "8920",
              "parentCode": "891",
              "name": "日喀则",
              "id": 329
            },
            {
              "code": "8960",
              "parentCode": "891",
              "name": "那曲",
              "id": 330
            }
          ]
        }
      ]
    },
    {
      "code": "08",
      "parentCode": "0",
      "name": "西北",
      "id": 401,
      "child": [{
          "code": "290",
          "parentCode": "08",
          "name": "陕西",
          "id": 10,
          "child": [{
              "code": "9170",
              "parentCode": "290",
              "name": "宝鸡",
              "id": 122
            },
            {
              "code": "9130",
              "parentCode": "290",
              "name": "渭南",
              "id": 123
            },
            {
              "code": "9150",
              "parentCode": "290",
              "name": "安康",
              "id": 124
            },
            {
              "code": "9120",
              "parentCode": "290",
              "name": "榆林",
              "id": 125
            },
            {
              "code": "9110",
              "parentCode": "290",
              "name": "延安",
              "id": 126
            },
            {
              "code": "9140",
              "parentCode": "290",
              "name": "商洛",
              "id": 127
            },
            {
              "code": "9160",
              "parentCode": "290",
              "name": "汉中",
              "id": 128
            },
            {
              "code": "9100",
              "parentCode": "290",
              "name": "咸阳",
              "id": 129
            },
            {
              "code": "2900",
              "parentCode": "290",
              "name": "西安",
              "id": 130
            },
            {
              "code": "9190",
              "parentCode": "290",
              "name": "铜川",
              "id": 131
            }
          ]
        },
        {
          "code": "931",
          "parentCode": "08",
          "name": "甘肃",
          "id": 28,
          "child": [{
              "code": "9410",
              "parentCode": "931",
              "name": "甘南",
              "id": 350
            },
            {
              "code": "9340",
              "parentCode": "931",
              "name": "庆阳",
              "id": 351
            },
            {
              "code": "9310",
              "parentCode": "931",
              "name": "兰州",
              "id": 352
            },
            {
              "code": "9360",
              "parentCode": "931",
              "name": "张掖",
              "id": 353
            },
            {
              "code": "9330",
              "parentCode": "931",
              "name": "平凉",
              "id": 354
            },
            {
              "code": "9430",
              "parentCode": "931",
              "name": "白银",
              "id": 355
            },
            {
              "code": "9371",
              "parentCode": "931",
              "name": "嘉峪关",
              "id": 356
            },
            {
              "code": "9370",
              "parentCode": "931",
              "name": "酒泉",
              "id": 357
            },
            {
              "code": "9300",
              "parentCode": "931",
              "name": "临夏",
              "id": 358
            },
            {
              "code": "9390",
              "parentCode": "931",
              "name": "陇南",
              "id": 359
            },
            {
              "code": "9320",
              "parentCode": "931",
              "name": "定西",
              "id": 360
            },
            {
              "code": "9351",
              "parentCode": "931",
              "name": "武威",
              "id": 361
            },
            {
              "code": "9350",
              "parentCode": "931",
              "name": "金昌",
              "id": 362
            },
            {
              "code": "9380",
              "parentCode": "931",
              "name": "天水",
              "id": 363
            }
          ]
        },
        {
          "code": "951",
          "parentCode": "08",
          "name": "宁夏",
          "id": 29,
          "child": [{
              "code": "9530",
              "parentCode": "951",
              "name": "吴忠",
              "id": 364
            },
            {
              "code": "9520",
              "parentCode": "951",
              "name": "石嘴山",
              "id": 365
            },
            {
              "code": "9540",
              "parentCode": "951",
              "name": "固原",
              "id": 366
            },
            {
              "code": "9550",
              "parentCode": "951",
              "name": "中卫",
              "id": 367
            },
            {
              "code": "9510",
              "parentCode": "951",
              "name": "银川",
              "id": 368
            }
          ]
        },
        {
          "code": "971",
          "parentCode": "08",
          "name": "青海",
          "id": 30,
          "child": [{
              "code": "9710",
              "parentCode": "971",
              "name": "西宁",
              "id": 369
            },
            {
              "code": "9720",
              "parentCode": "971",
              "name": "海东",
              "id": 370
            },
            {
              "code": "9770",
              "parentCode": "971",
              "name": "海西",
              "id": 371
            },
            {
              "code": "9730",
              "parentCode": "971",
              "name": "黄南",
              "id": 372
            },
            {
              "code": "9700",
              "parentCode": "971",
              "name": "海北",
              "id": 373
            },
            {
              "code": "9790",
              "parentCode": "971",
              "name": "格尔木",
              "id": 374
            },
            {
              "code": "9760",
              "parentCode": "971",
              "name": "玉树",
              "id": 375
            },
            {
              "code": "9750",
              "parentCode": "971",
              "name": "果洛",
              "id": 376
            },
            {
              "code": "9740",
              "parentCode": "971",
              "name": "海南",
              "id": 377
            }
          ]
        },
        {
          "code": "991",
          "parentCode": "08",
          "name": "新疆",
          "id": 31,
          "child": [{
              "code": "9980",
              "parentCode": "991",
              "name": "喀什",
              "id": 378
            },
            {
              "code": "9010",
              "parentCode": "991",
              "name": "塔城",
              "id": 379
            },
            {
              "code": "9950",
              "parentCode": "991",
              "name": "吐鲁番",
              "id": 380
            },
            {
              "code": "9970",
              "parentCode": "991",
              "name": "阿克苏",
              "id": 381
            },
            {
              "code": "9940",
              "parentCode": "991",
              "name": "昌吉",
              "id": 382
            },
            {
              "code": "9910",
              "parentCode": "991",
              "name": "乌鲁木齐",
              "id": 383
            },
            {
              "code": "9030",
              "parentCode": "991",
              "name": "和田",
              "id": 384
            },
            {
              "code": "9920",
              "parentCode": "991",
              "name": "奎屯",
              "id": 385
            },
            {
              "code": "9990",
              "parentCode": "991",
              "name": "伊犁",
              "id": 386
            },
            {
              "code": "9020",
              "parentCode": "991",
              "name": "哈密",
              "id": 387
            },
            {
              "code": "9080",
              "parentCode": "991",
              "name": "克州",
              "id": 388
            },
            {
              "code": "9090",
              "parentCode": "991",
              "name": "博州",
              "id": 389
            },
            {
              "code": "9060",
              "parentCode": "991",
              "name": "阿勒泰",
              "id": 390
            },
            {
              "code": "9900",
              "parentCode": "991",
              "name": "克拉玛依",
              "id": 391
            },
            {
              "code": "9930",
              "parentCode": "991",
              "name": "石河子",
              "id": 392
            },
            {
              "code": "9960",
              "parentCode": "991",
              "name": "巴州",
              "id": 393
            }
          ]
        }
      ]
    }
  ]
  
  
  module.exports ={
    area,
    area2
  }
  