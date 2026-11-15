/**
 * 鏡頭語言知識庫資料 (Camera Language Knowledge Base)
 * 來源參考：https://jacksonlin.net/20190417-%E5%9F%BA%E6%9C%AC%E9%8F%A1%E9%A0%AD%E8%AA%9E%E8%A8%80/
 * 擴充資料：經典影視作品案例庫、獨立電影海報與精準時間段影片連結
 */

const CAMERA_DATA = {
  hero: {
    title: "還在往上 Pan？",
    subtitle: "新手該先搞懂的影視基本鏡頭語言",
    quote: "「東西從來都不該只是『拍到就好』。如果不知該怎麼動，不如不要動。」",
    intro: "拿起攝影機看到什麼就拍什麼、想到哪裡就拍哪裡，連基本的運鏡知識都沒有，那往往只剩下隨機的畫面碎片。在動態攝影中，每一顆鏡頭如何運動，決定了觀眾如何感受故事。懂得運用基本運鏡技巧的人，即便只有簡單工具，也能創造出扣人心弦的電影感氛圍。"
  },
  
  history: {
    year: "1903",
    milestone: "動態運鏡的誕生",
    director: "Edwin S. Porter",
    cinematographer: "Blair Smith",
    film: "《火車大劫案》(The Great Train Robbery)",
    description: "在連續影像技術誕生初期，受限於技術，攝影機只能被架設在完全固定的腳架上。直到 1903 年，電影《火車大劫案》首創了影史第一個平移運鏡『Pan』。從那一刻起，攝影機被賦予了『轉動視線』的自由，開啟了百年電影運鏡演變的歷史篇章。",
    videoUrl: "https://www.youtube.com/watch?v=-WYYtN13Vfk&t=210s",
    embedUrl: "https://www.youtube.com/embed/-WYYtN13Vfk?start=210&autoplay=1",
    posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Great_Train_Robbery_Poster.jpeg/800px-Great_Train_Robbery_Poster.jpeg"
  },

  philosophy: {
    goldenRule: "如果不知該怎麼「動」，不如不要動 (If in doubt, hold the shot)",
    points: [
      {
        title: "鏡頭運動必須有敘事動機",
        desc: "運鏡不是為了炫技，而是為了『引導觀眾視覺』與『傳遞角色心理狀態』。"
      },
      {
        title: "旋轉 vs 位移的本質差異",
        desc: "原地轉動頭部（Pan/Tilt）交代的是視線；走入空間（Dolly/Boom）引發的是身歷其境的沉浸感與透視變化。"
      },
      {
        title: "工具門檻降低，美學思考加倍",
        desc: "如今空拍機、三軸穩定器唾手可得，但唯有深諳鏡頭語言的人，才能讓畫面真正加分。"
      }
    ]
  },

  techniques: [
    {
      id: "pan",
      name: "Pan",
      chineseName: "水平運鏡 / 水平搖鏡",
      category: "原地旋轉 (Rotation)",
      axis: "水平軸向 (左右擺動)",
      difficulty: "★☆☆☆☆ (極易入門)",
      gear: "三腳架阻尼雲台、手持穩定",
      humanMetaphor: "就像人類的脖子，每當來到新環境時轉頭「環視四周」",
      coreAction: "攝影機機位完全固定不動，僅改變鏡頭指向的左右水平角度。",
      narrativePurposes: [
        "交代場景環境與宏觀空間感（如風景、房間內部全貌）",
        "展現同一空間中多方角色關係（如談判桌、圓桌會議的人物掃視）",
        "流暢追蹤橫向移動的物體或人物路線"
      ],
      emotionalImpact: "給予觀眾客觀、冷靜的觀察者視角，建立空間地理關係。",
      commonMistakes: "誤以為上下擺動也叫 Pan（嚴格禁忌！上下是 Tilt）。左右擺動速度過快，導致畫面果凍效應或觀眾眩暈。",
      filmCases: [
        {
          title: "《火車大劫案》(The Great Train Robbery, 1903)",
          director: "Edwin S. Porter",
          scene: "劫匪在山林逃跑時，攝影機首次打破固定腳架束縛，水平搖鏡追隨馬匹奔馳。",
          effect: "影史首個被記載的 Pan 鏡頭，宣告電影由被動舞台記錄轉變為引導視覺的藝術。",
          videoUrl: "https://www.youtube.com/watch?v=-WYYtN13Vfk&t=210s",
          embedUrl: "https://www.youtube.com/embed/-WYYtN13Vfk?start=210&autoplay=1",
          posterUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Great_Train_Robbery_Poster.jpeg/800px-Great_Train_Robbery_Poster.jpeg",
          videoLabel: "觀看影史首個 Pan 片段 (210秒處起)"
        },
        {
          title: "《布達佩斯大飯店》(The Grand Budapest Hotel, 2014)",
          director: "Wes Anderson",
          scene: "大堂經理古斯塔夫與門童零對話時，鏡頭進行高速 90° 與 180° 甩鏡 (Whip Pan)。",
          effect: "捨棄正反打剪輯，以超高節奏的機械式橫搖營造強烈的幾何對稱與荒謬喜劇感。",
          videoUrl: "https://www.youtube.com/watch?v=RK4NNe3zHbc&t=15s",
          embedUrl: "https://www.youtube.com/embed/RK4NNe3zHbc?start=15&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
          videoLabel: "觀看安德森經典極速甩鏡片段"
        },
        {
          title: "《羊男的迷宮》(Pan's Labyrinth, 2006)",
          director: "Guillermo del Toro",
          scene: "橫搖鏡頭掠過石柱陰影完成無縫遮擋轉場，瞬間切換現實冷酷磨坊與地下奇幻世界。",
          effect: "抹消剪輯邊界，讓殘酷現實與暗黑童話在同一個平滑視線中無縫流轉。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=112s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=112&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/oDqwyEUd0Q22wjnjRLn4NENiMPu.jpg",
          videoLabel: "觀看無縫橫搖遮擋運鏡解析 (112秒處起)"
        }
      ],
      interactiveState: {
        cameraAction: "rotate-y",
        viewDelta: "horizontal-pan",
        label: "Pan Left / Right"
      }
    },
    {
      id: "tilt",
      name: "Tilt",
      chineseName: "垂直運鏡 / 俯仰運鏡",
      category: "原地旋轉 (Rotation)",
      axis: "垂直軸向 (上下俯仰)",
      difficulty: "★☆☆☆☆ (極易入門)",
      gear: "三腳架阻尼雲台、手持",
      humanMetaphor: "就像人類抬頭仰望天空 (Tilt Up)，或低頭俯視地面 (Tilt Down)",
      coreAction: "攝影機機位保持固定，鏡頭垂直往上仰起或往下俯視。",
      narrativePurposes: [
        "經典開場揭露：從天花板的華麗水晶吊燈，往下 tilt 至擺盤豐盛的長餐桌",
        "經典收尾離別：凝視主角孤獨離去的背影，緩緩往上 tilt 融入遼闊的天空",
        "高低權力象徵：自下而上展現摩天大樓或反派壓迫感，自上而下表現渺小脆弱"
      ],
      emotionalImpact: "引導視覺焦點從局部分析到整體，或注入敬畏、宿命與退場的情緒餘韻。",
      commonMistakes: "口誤說出「往上 Pan」！請在腦中建立反射：上仰永遠是 Tilt Up，下俯永遠是 Tilt Down。",
      filmCases: [
        {
          title: "《刺激1995》(The Shawshank Redemption, 1994)",
          director: "Frank Darabont",
          scene: "安迪爬出下水道後撕開上衣，鏡頭由泥濘雙手緩慢 Tilt Up 仰拍他張開雙臂迎向暴雨夜空。",
          effect: "由地面的禁錮污穢仰升至自由穹頂，將二十年痛苦後的極致救贖與重生具象化。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=158s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=158&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
          videoLabel: "觀看安迪暴雨仰望救贖運鏡 (158秒處起)"
        },
        {
          title: "《星際效應》(Interstellar, 2014)",
          director: "Christopher Nolan",
          scene: "登陸巨浪星球時以為遠方是山峰，鏡頭持續 Tilt Up 仰視，驚見是數千公尺高的滅頂海嘯。",
          effect: "打破水平地平線的安全感，極致放大人類在宇宙自然偉力面前的極度渺小與窒息感。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=188s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=188&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          videoLabel: "觀看萬丈巨浪仰拍尺度示範 (188秒處起)"
        },
        {
          title: "《教父》(The Godfather, 1972)",
          director: "Francis Ford Coppola",
          scene: "宴會開場從上方奢華水晶吊燈穩健 Tilt Down 至坐滿黑幫家族長老與賓客的長桌。",
          effect: "建立富麗堂皇與陰謀暗流的對照，優雅完成宏大環境與權力關係的空間揭露。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=215s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=215&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
          videoLabel: "觀看《教父》開場俯移揭露鏡頭 (215秒處起)"
        }
      ],
      interactiveState: {
        cameraAction: "rotate-x",
        viewDelta: "vertical-tilt",
        label: "Tilt Up / Down"
      }
    },
    {
      id: "boom",
      name: "Boom (Jib / Crane)",
      chineseName: "升降運鏡 / 搖臂運鏡",
      category: "空間位移 (Translation)",
      axis: "垂直高度位移 (Y/Z 軸空間移動)",
      difficulty: "★★★☆☆ (需器材配合)",
      gear: "搖臂 (Jib / Crane)、垂直滑軌、三軸穩定器 (Gimbal)",
      humanMetaphor: "如同乘搭透明觀光電梯，視點在空間中垂直漂浮升降",
      coreAction: "攝影機本身在垂直空間中整體升起或降下，而非原地抬頭低頭。",
      narrativePurposes: [
        "打破地平線視角，由微觀人物細節直接拉升至千軍萬馬的宏大戰場",
        "翻越障礙物：穿過門窗或樹林頂端，呈現柳暗花明的空間轉折",
        "由高處俯瞰入鏡，平穩降落至主角視線高度，強化故事入場感"
      ],
      emotionalImpact: "帶有超脫凡俗的「上帝視角 (God's Eye)」，呈現命運的宏大與宿命感。",
      commonMistakes: "徒手拍攝時垂直抖動明顯。若無搖臂或穩定器，需深蹲以身體平順起伏帶動，否則畫面易碎裂。",
      filmCases: [
        {
          title: "《亂世佳人》(Gone with the Wind, 1939)",
          director: "Victor Fleming",
          scene: "郝思嘉在火車站找醫生，鏡頭從她特寫經由巨型吊臂 (Crane) 緩慢升起至數十米高空。",
          effect: "視野擴展至地面密密麻麻數千名痛苦哀嚎的傷兵，由個人焦慮昇華至整座時代的戰爭悲歌。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=261s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=261&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/lNz2Ow0wGCAvzckW7EOjE03KcYv.jpg",
          videoLabel: "觀看車站吊臂升降運鏡示範 (261秒處起)"
        },
        {
          title: "《樂來越愛你》(La La Land, 2016)",
          director: "Damien Chazelle",
          scene: "開場《Another Day of Sun》塞車公路，伸縮搖臂 (Technocrane) 在車頂舞者與懸崖間上下穿梭。",
          effect: "徹底解放地表束縛，在立體空間中飛揚跳躍，製造出極致澎湃浪漫的現代歌舞奇觀。",
          videoUrl: "https://www.youtube.com/watch?v=xVVqlm8Fq3Y&t=25s",
          embedUrl: "https://www.youtube.com/embed/xVVqlm8Fq3Y?start=25&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
          videoLabel: "觀看開場公路伸縮搖臂長鏡頭 (25秒處起)"
        },
        {
          title: "《大國民》(Citizen Kane, 1941)",
          director: "Orson Welles",
          scene: "歌劇院演出時鏡頭由舞台歌唱的蘇珊一路垂直升起 (Crane Up) 直達頂棚，定格在捏鼻嫌難聽的工人。",
          effect: "以垂直高度拉開物理與心理距離，達成對上流浮誇與自欺欺人的頂級辛辣諷刺。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=320s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=320&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/ruF3Lmd4A8MHbnEBE6lxPMbsHGL.jpg",
          videoLabel: "觀看垂直高度空間層次運鏡解析 (320秒處起)"
        }
      ],
      interactiveState: {
        cameraAction: "translate-y",
        viewDelta: "vertical-boom",
        label: "Boom Up / Down"
      }
    },
    {
      id: "dolly",
      name: "Dolly (Truck)",
      chineseName: "水平軌道運鏡 / 推拉橫移",
      category: "空間位移 (Translation)",
      axis: "水平縱深 (Dolly In/Out) 或 左右橫移 (Truck L/R)",
      difficulty: "★★☆☆☆ (滑軌/穩定器)",
      gear: "軌道推車 (Dolly Cart)、地軌/滑軌 (Slider)、電子穩定器",
      humanMetaphor: "如同觀眾邁開腳步，一步步走進角色的私密心境，或與其並肩奔馳",
      coreAction: "攝影機架設於推車或軌道上，在水平空間中進行實體前後推拉或左右平移。",
      narrativePurposes: [
        "搭配中廣角鏡頭橫移 (Truck)，勾勒豐富的景深視差 (Parallax) 與環境立體動感",
        "快速 Dolly In：瞬間推向角色臉部特寫，精準表現驚聞噩耗、真相爆發的強烈心理衝擊",
        "慢速 Dolly In：緩慢逼近，營造沉著思考、內心掙扎或集中極限專注力的神情氣氛",
        "Dolly Out：漸漸遠離主角，傳達孤寂無援、事過境遷的退場感"
      ],
      emotionalImpact: "產生真實的光學透視改變（前景快、背景慢），極具身歷其境感與心理張力。",
      commonMistakes: "混淆 Dolly 與 Zoom！Dolly 是相機實體走進空間產生透視變化；Zoom 只是鏡頭光學放大，背景毫無視差變化。",
      filmCases: [
        {
          title: "《大白鯊》(Jaws, 1975)",
          director: "Steven Spielberg",
          scene: "警長看見鯊魚吃人瞬間，鏡頭實體向警長 Dolly In，同時鏡頭光學變焦 Zoom Out (Dolly Zoom)。",
          effect: "前景人臉大小不變，但背景被瞬間拉扯撕裂，具象化「世界在一瞬間崩塌瓦解」的驚恐。",
          videoUrl: "https://www.youtube.com/watch?v=9uwp-xksCAc&t=42s",
          embedUrl: "https://www.youtube.com/embed/9uwp-xksCAc?start=42&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/s2VGwxvvsjvJv9v2x48kF84Qp6M.jpg",
          videoLabel: "觀看《大白鯊》推拉變焦深度解析 (42秒處起)"
        },
        {
          title: "《鬼店》(The Shining, 1980)",
          director: "Stanley Kubrick",
          scene: "小男孩丹尼踩三輪車在空曠飯店走廊狂奔，鏡頭貼地以低角度 Dolly/Steadicam 緊緊尾隨。",
          effect: "地毯與木地板聲響交替，無止盡的直線滑移營造幽閉窒息感，如同被惡靈暗中凝視。",
          videoUrl: "https://www.youtube.com/watch?v=cy7ztJ3NUMI&t=10s",
          embedUrl: "https://www.youtube.com/embed/cy7ztJ3NUMI?start=10&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/rMFRgfImmNjIKKZ44zUKd3W0iO6.jpg",
          videoLabel: "觀看三輪車貼地走廊跟拍片段 (10秒處起)"
        },
        {
          title: "《原罪犯》(Oldboy, 2003)",
          director: "朴贊郁",
          scene: "吳大秀持鐵鎚在窄長走廊與數十黑幫搏殺，攝影機在平行單一軌道上一鏡到底橫移 (Truck)。",
          effect: "橫向捲軸般客觀冷靜，剔除特寫剪輯，將肉搏的疲憊、鈍痛與血肉殘酷赤裸還原。",
          videoUrl: "https://www.youtube.com/watch?v=IiyBo-qLDeM&t=405s",
          embedUrl: "https://www.youtube.com/embed/IiyBo-qLDeM?start=405&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQbvvuT4Qmu.jpg",
          videoLabel: "觀看走廊橫向一鏡到底肉搏解析 (405秒處起)"
        },
        {
          title: "《全面啟動》(Inception, 2010)",
          director: "Christopher Nolan",
          scene: "片尾柯伯返回家中看見孩子，餐桌上的金屬陀螺持續旋轉，相機極為緩慢堅定地 Dolly In。",
          effect: "慢速推進隔絕一切外在雜音，將所有心理懸念集中在微小陀螺上，引爆極致緊張感。",
          videoUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0&t=55s",
          embedUrl: "https://www.youtube.com/embed/YoHD9XEInc0?start=55&autoplay=1",
          posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
          videoLabel: "觀看片尾陀螺旋轉慢速推進片段 (55秒處起)"
        }
      ],
      interactiveState: {
        cameraAction: "translate-z",
        viewDelta: "depth-dolly",
        label: "Dolly In / Out"
      }
    }
  ],

  comparisons: [
    {
      title: "Pan vs. Tilt",
      type: "旋轉維度對比",
      summary: "兩者機位皆完全不動。Pan 是水平 Y 軸左右擺頭；Tilt 是垂直 X 軸上下仰俯。記住：沒有『往上 Pan』這種說法！"
    },
    {
      title: "Tilt vs. Boom",
      type: "旋轉 vs 實體位移",
      summary: "Tilt 是相機固定在原地抬頭看天（地面角度改變）；Boom 是相機整台如同搭電梯垂直上升（視角與透視關係產生空間層次改變）。"
    },
    {
      title: "Dolly vs. Zoom",
      type: "真實位移 vs 光學放大",
      summary: "Dolly 產生豐富的物體相互遮蔽與前後景深視差（立體感強）；Zoom 是原地拉近，壓縮背景空間，畫面扁平化。"
    }
  ]
};

// 將資料匯出供全域使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CAMERA_DATA;
}
