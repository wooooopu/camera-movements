/**
 * CINELANG - 互動式運鏡模擬器與頁面邏輯 (Simulator Engine)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. 執行執行環境偵測 (file:// vs http://localhost)
  checkEnvironment();

  // 1. 初始化資料渲染
  renderContent();

  // 2. 模擬器控制中心
  initSimulator();

  // 3. 虛擬時碼產生器 (Viewfinder HUD Timecode)
  startTimecode();

  // 4. 影音播放彈窗控制器 (Video Modal)
  initVideoModal();

  // 5. 影視案例卡片輪播控制器 (Case Carousel > Next)
  initCaseCarousels();
});

/**
 * 渲染來自 data.js 的卡片與資料
 */
function renderContent() {
  if (typeof CAMERA_DATA === "undefined") return;

  // 渲染四大運鏡卡片
  const techGrid = document.getElementById("tech-cards-grid");
  if (techGrid && CAMERA_DATA.techniques) {
    techGrid.innerHTML = CAMERA_DATA.techniques.map(tech => `
      <article class="tech-card" id="card-${tech.id}">
        <div class="tech-card-header">
          <div class="tech-names">
            <span class="tech-en">${tech.name}</span>
            <span class="tech-zh">${tech.chineseName}</span>
          </div>
          <span class="tech-badge">${tech.category}</span>
        </div>

        <div class="tech-metaphor">
          <strong>比喻：</strong>${tech.humanMetaphor}
        </div>

        <p class="tech-body">
          ${tech.coreAction}
        </p>

        <ul class="tech-purposes">
          ${tech.narrativePurposes.map(p => `<li>${p}</li>`).join("")}
        </ul>

        ${tech.filmCases && tech.filmCases.length > 0 ? `
          <div class="tech-cases-carousel" data-tech="${tech.id}">
            <div class="carousel-top-bar">
              <div class="carousel-title">🎬 經典影視案例</div>
              <div class="carousel-controls">
                <span class="carousel-counter" id="counter-${tech.id}">1 / ${tech.filmCases.length}</span>
                <button type="button" class="carousel-nav-btn prev" data-tech="${tech.id}" data-dir="-1" title="上一個案例" aria-label="上一個案例">‹</button>
                <button type="button" class="carousel-nav-btn next" data-tech="${tech.id}" data-dir="1" title="下一個案例" aria-label="下一個案例">›</button>
              </div>
            </div>

            <div class="carousel-cards-container" id="cards-container-${tech.id}">
              ${tech.filmCases.map((c, idx) => {
                const startMatch = (c.embedUrl && c.embedUrl.match(/start=(\d+)/)) || (c.videoUrl && c.videoUrl.match(/[?&]t=(\d+)/));
                const startSec = startMatch ? startMatch[1] : 0;
                return `
                <div class="case-card ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                  <!-- 海報圖片區 (帶有超連結與點擊播放) -->
                  <a href="${c.videoUrl}" class="case-poster-link btn-play-clip"
                    data-title="${c.title}" 
                    data-embed="${c.embedUrl || ''}" 
                    data-url="${c.videoUrl}" 
                    data-desc="${c.scene.replace(/"/g, '&quot;')}"
                    data-start="${startSec}"
                    title="點擊觀看《${c.title}》電影片段">
                    <div class="case-poster-wrapper">
                      <img src="${c.posterUrl}" alt="${c.title} 劇照海報" class="case-poster-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80';">
                      <div class="case-poster-overlay">
                        <div class="play-badge-icon">▶</div>
                        <span class="play-badge-text">觀賞電影片段</span>
                      </div>
                    </div>
                  </a>

                  <!-- 案例說明文字區 -->
                  <div class="case-card-body">
                    <div class="case-meta-row">
                      <h4 class="case-film-name">${c.title}</h4>
                      <span class="case-film-director">${c.director}</span>
                    </div>
                    <p class="case-field"><span>鏡頭：</span>${c.scene}</p>
                    <p class="case-field"><span>語言：</span>${c.effect}</p>
                    
                    <div class="case-bottom-links">
                      <button type="button" class="btn-play-clip btn-case-action"
                        data-title="${c.title}" 
                        data-embed="${c.embedUrl || ''}" 
                        data-url="${c.videoUrl}" 
                        data-desc="${c.scene.replace(/"/g, '&quot;')}"
                        data-start="${startSec}">
                        ▶ 播放示範片段
                      </button>
                      <a href="${c.videoUrl}" target="_blank" rel="noopener noreferrer" class="link-external-clip" title="前往 YouTube 觀賞高畫質正片片段">
                        YouTube 正片 ↗
                      </a>
                    </div>
                  </div>
                </div>
              `;
              }).join("")}
            </div>
          </div>
        ` : ""}

        <div class="tech-warning">
          <strong>⚠️ 避雷點：</strong>${tech.commonMistakes}
        </div>
      </article>
    `).join("");
  }

  // 渲染對比矩陣
  const compGrid = document.getElementById("comparisons-grid");
  if (compGrid && CAMERA_DATA.comparisons) {
    compGrid.innerHTML = CAMERA_DATA.comparisons.map(item => `
      <div class="compare-card">
        <div class="compare-title">
          <span>${item.title}</span>
          <span class="compare-type">${item.type}</span>
        </div>
        <p class="compare-desc">${item.summary}</p>
      </div>
    `).join("");
  }
}

/**
 * 運鏡模擬器控制系統
 */
function initSimulator() {
  const buttons = document.querySelectorAll(".sim-btn");
  const stageFg = document.querySelector(".layer-foreground");
  const stageMg = document.querySelector(".layer-midground");
  const stageBg = document.querySelector(".layer-bg");
  const cameraModel = document.querySelector(".camera-model");
  const infoAction = document.getElementById("sim-current-action");
  const infoDesc = document.getElementById("sim-current-desc");
  const infoType = document.getElementById("sim-current-type");

  let animationFrameId = null;
  let currentMode = "pan";
  let step = 0;

  // 運鏡預設行為定義
  const movementConfigs = {
    pan: {
      title: "Pan (水平橫搖)",
      type: "原地旋轉 (Rotation - Y 軸)",
      desc: "機位固定不動，鏡頭左右水平轉動。注意背景與主體呈水平平移，如同轉頭環顧四周。",
      update: (t) => {
        const angle = Math.sin(t * 0.002) * 22; // 左右搖擺角度
        // 相機本體水平旋轉示意
        cameraModel.style.transform = `rotateY(${angle}deg)`;
        // 觀景窗圖層視差平移 (前景位移最大，背景最小)
        stageFg.style.transform = `translateX(${-angle * 2.8}px)`;
        stageMg.style.transform = `translateX(${-angle * 1.8}px)`;
        stageBg.style.transform = `translateX(${-angle * 0.6}px)`;
      }
    },
    tilt: {
      title: "Tilt (垂直俯仰)",
      type: "原地旋轉 (Rotation - X 軸)",
      desc: "機位固定，鏡頭上下俯仰。上仰為 Tilt Up，下俯為 Tilt Down。嚴禁誤稱『往上 Pan』！",
      update: (t) => {
        const pitch = Math.sin(t * 0.002) * 18; // 上下俯仰角度
        // 相機本體上下角度變換
        cameraModel.style.transform = `rotate(${pitch * 0.6}deg)`;
        // 觀景窗垂直視差
        stageFg.style.transform = `translateY(${-pitch * 2.5}px)`;
        stageMg.style.transform = `translateY(${-pitch * 1.8}px)`;
        stageBg.style.transform = `translateY(${-pitch * 0.8}px)`;
      }
    },
    boom: {
      title: "Boom / Crane (垂直升降)",
      type: "實體空間位移 (Translation - 垂直)",
      desc: "整台攝影機在空間中由搖臂升起或降下，視點發生高度位移，帶來宏觀至微觀的層次轉換。",
      update: (t) => {
        const offset = Math.sin(t * 0.002) * 35; // 垂直升降公分模擬
        // 相機本體垂直升降
        cameraModel.style.transform = `translateY(${-offset}px)`;
        // 觀景窗垂直空間移動（產生強烈高度視差）
        stageFg.style.transform = `translateY(${offset * 1.6}px) scale(${1 - offset * 0.002})`;
        stageMg.style.transform = `translateY(${offset * 1.1}px)`;
        stageBg.style.transform = `translateY(${offset * 0.3}px)`;
      }
    },
    dolly: {
      title: "Dolly In / Out (軌道推拉)",
      type: "實體空間位移 (Translation - 縱深)",
      desc: "攝影機沿著軌道向前推進 (Dolly In) 或後退 (Dolly Out)。真實空間透視改變，前景急速擴大。",
      update: (t) => {
        const depth = Math.sin(t * 0.002) * 0.35 + 0.35; // 0 ~ 0.7 深度變化
        const camSlide = (depth - 0.35) * 60;
        // 相機模型沿著軌道前後滑移
        cameraModel.style.transform = `translateX(${camSlide}px) scale(${1 + (depth - 0.35) * 0.15})`;
        // 觀景窗透視放大（前景急劇放大，中景適度放大，背景幾乎維持原樣）
        const fgScale = 1 + depth * 0.8;
        const mgScale = 1 + depth * 0.45;
        const bgScale = 1 + depth * 0.1;
        stageFg.style.transform = `scale(${fgScale})`;
        stageMg.style.transform = `scale(${mgScale})`;
        stageBg.style.transform = `scale(${bgScale})`;
      }
    },
    static: {
      title: "Static (固定鏡頭)",
      type: "靜止 (Zero Movement)",
      desc: "『如果不知該怎麼動，不如不要動。』固定鏡位能讓構圖沉澱，給予觀眾專注凝視被攝者呼吸的空間。",
      update: () => {
        cameraModel.style.transform = "none";
        stageFg.style.transform = "none";
        stageMg.style.transform = "none";
        stageBg.style.transform = "none";
      }
    }
  };

  function switchMode(modeKey) {
    currentMode = modeKey;
    const config = movementConfigs[modeKey] || movementConfigs.pan;

    // 更新資訊欄位
    if (infoAction) infoAction.textContent = config.title;
    if (infoDesc) infoDesc.textContent = config.desc;
    if (infoType) infoType.textContent = config.type;

    // 按鈕樣式切換
    buttons.forEach(btn => {
      if (btn.getAttribute("data-mode") === modeKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // 綁定按鈕點擊
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      switchMode(mode);
    });
  });

  // 動態動畫迴圈 (Render Loop)
  function renderLoop(timestamp) {
    if (movementConfigs[currentMode]) {
      movementConfigs[currentMode].update(timestamp);
    }
    animationFrameId = requestAnimationFrame(renderLoop);
  }

  // 預設啟動 Pan 模式
  switchMode("pan");
  requestAnimationFrame(renderLoop);
}

/**
 * 觀景窗 HUD 即時時碼計時器
 */
function startTimecode() {
  const tcElement = document.getElementById("hud-timecode");
  if (!tcElement) return;

  let frames = 0;
  let seconds = 14;
  let minutes = 2;
  let hours = 1;

  setInterval(() => {
    frames += 1;
    if (frames >= 24) { // 24 FPS 電影幀率
      frames = 0;
      seconds += 1;
      if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }
      }
    }

    const pad = (n) => String(n).padStart(2, "0");
    tcElement.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
  }, 1000 / 24);
}

/**
 * 執行環境偵測 (file:// vs http://localhost)
 */
function checkEnvironment() {
  const isFile = window.location.protocol === "file:";
  const banner = document.getElementById("file-env-banner");
  const bannerClose = document.getElementById("file-env-close");
  const tipMessage = document.getElementById("tip-message-text");
  
  if (banner) {
    if (isFile) {
      banner.style.display = "block";
    } else {
      banner.style.display = "none";
    }
  }
  if (bannerClose) {
    bannerClose.addEventListener("click", () => {
      if (banner) banner.style.display = "none";
    });
  }
  
  if (tipMessage && !isFile) {
    tipMessage.innerHTML = "✅ 目前運行於本地伺服器環境，YouTube 播放器具備合法來源標頭，可直接在此頁面播放！";
  }
}

/**
 * 影音播放彈窗控制器 (Video Modal Controller)
 */
function initVideoModal() {
  const modal = document.getElementById("video-modal");
  const modalIframe = document.getElementById("video-modal-iframe");
  const modalTitle = document.getElementById("video-modal-title");
  const modalDesc = document.getElementById("video-modal-scene-desc");
  const modalExtLink = document.getElementById("video-modal-external-link");
  const modalDirectJumpBtn = document.getElementById("video-modal-direct-jump-btn");
  const modalTimecodeDisplay = document.getElementById("modal-timecode-display");
  const btnModalCopyLink = document.getElementById("btn-modal-copy-link");
  const copyToast = document.getElementById("copy-toast");
  const closeBtn = document.getElementById("video-modal-close");

  if (!modal || !modalIframe) return;

  let currentVideoUrl = "";

  function formatTime(seconds) {
    const s = parseInt(seconds, 10);
    if (isNaN(s) || s <= 0) return "片頭起 (00:00)";
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    if (mins === 0) return `${rem} 秒處起`;
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")} 處起 (${s}s)`;
  }

  function showToast(msg) {
    if (!copyToast) return;
    copyToast.textContent = msg || "已複製精準時間連結！";
    copyToast.classList.add("show");
    setTimeout(() => {
      copyToast.classList.remove("show");
    }, 2000);
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand("copy");
      showToast("已成功複製精準時間連結！");
    } catch (err) {
      showToast("複製失敗，請手動複製網址。");
    }
    document.body.removeChild(tempInput);
  }

  function openVideoModal(title, embedUrl, videoUrl, desc, startSec) {
    currentVideoUrl = videoUrl || "#";
    if (modalTitle) modalTitle.textContent = `🎬 ${title} - 經典片段觀看`;
    if (modalDesc) modalDesc.textContent = desc || "";
    if (modalExtLink) modalExtLink.href = currentVideoUrl;
    if (modalDirectJumpBtn) modalDirectJumpBtn.href = currentVideoUrl;

    // 解析時間戳
    let sec = startSec;
    if (!sec) {
      const match = (embedUrl && embedUrl.match(/start=(\d+)/)) || (videoUrl && videoUrl.match(/[?&]t=(\d+)/));
      if (match) sec = match[1];
    }

    const timeStr = formatTime(sec);
    if (modalTimecodeDisplay) {
      modalTimecodeDisplay.textContent = timeStr;
    }
    if (modalDirectJumpBtn) {
      modalDirectJumpBtn.innerHTML = `▶ 以精準時間軸開啟觀賞 (${timeStr}) ↗`;
    }

    // 載入 iframe，確保精確時間軸與自動播放參數完整保留
    if (embedUrl) {
      let finalEmbed = embedUrl;
      if (!finalEmbed.includes("autoplay=")) {
        finalEmbed += (finalEmbed.includes("?") ? "&" : "?") + "autoplay=1";
      }
      modalIframe.src = finalEmbed;
    } else if (videoUrl) {
      modalIframe.src = videoUrl;
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // 防止背景滾動
  }

  function closeVideoModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalIframe.src = ""; // 停止播放
    document.body.style.overflow = "";
  }

  // 監聽所有影片播放按鈕與海報點擊 (透過事件委派)
  document.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".btn-play-clip");
    if (playBtn) {
      e.preventDefault(); // 防止超連結直接跳轉，改由彈窗播放
      const title = playBtn.getAttribute("data-title") || "影視案例";
      const embedUrl = playBtn.getAttribute("data-embed") || "";
      const videoUrl = playBtn.getAttribute("data-url") || "";
      const desc = playBtn.getAttribute("data-desc") || "";
      const start = playBtn.getAttribute("data-start") || "";
      openVideoModal(title, embedUrl, videoUrl, desc, start);
    }
  });

  // 複製時間連結按鈕
  if (btnModalCopyLink) {
    btnModalCopyLink.addEventListener("click", () => {
      if (!currentVideoUrl || currentVideoUrl === "#") return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentVideoUrl).then(() => {
          showToast("已成功複製精準時間連結！");
        }).catch(() => {
          fallbackCopyText(currentVideoUrl);
        });
      } else {
        fallbackCopyText(currentVideoUrl);
      }
    });
  }

  // 關閉按鈕點擊
  if (closeBtn) {
    closeBtn.addEventListener("click", closeVideoModal);
  }

  // 點擊彈窗外陰影區域關閉
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });

  // 按下 ESC 鍵關閉
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeVideoModal();
    }
  });
}

/**
 * 影視作品案例卡片輪播控制器 (Case Carousel Controller)
 */
function initCaseCarousels() {
  // 記錄每個運鏡當前顯示的案例索引
  const carouselStates = {};

  document.addEventListener("click", (e) => {
    const navBtn = e.target.closest(".carousel-nav-btn");
    if (!navBtn) return;

    e.preventDefault();
    const techId = navBtn.getAttribute("data-tech");
    const dir = parseInt(navBtn.getAttribute("data-dir"), 10) || 1;

    const container = document.getElementById(`cards-container-${techId}`);
    const counter = document.getElementById(`counter-${techId}`);
    if (!container) return;

    const cards = container.querySelectorAll(".case-card");
    const total = cards.length;
    if (total <= 1) return;

    // 取得當前索引
    if (typeof carouselStates[techId] === "undefined") {
      carouselStates[techId] = 0;
    }

    // 計算下一個或上一個索引（循環循環）
    let currentIndex = carouselStates[techId];
    cards[currentIndex].classList.remove("active");

    let nextIndex = (currentIndex + dir + total) % total;
    cards[nextIndex].classList.add("active");

    carouselStates[techId] = nextIndex;

    // 更新指示器文字，如 "2 / 3"
    if (counter) {
      counter.textContent = `${nextIndex + 1} / ${total}`;
    }
  });
}
