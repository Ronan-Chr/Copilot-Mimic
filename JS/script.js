function createAttachmentImage(primary, secondary, accent) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900" role="img" aria-label="Post attachment">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${primary}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="900" height="900" fill="url(#bg)"/>
      <rect width="900" height="900" fill="url(#glow)"/>
      <g opacity="0.28">
        <path d="M120 640L420 220L780 640Z" fill="${accent}"/>
        <path d="M0 720L220 420L520 720Z" fill="#0b1020"/>
        <path d="M420 720L900 420L900 720Z" fill="#111827"/>
      </g>
      <g fill="none" stroke="#E2E8F0" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">
        <path d="M250 610c34-90 78-140 140-170 74-36 148-34 214 12 52 36 90 101 128 194"/>
        <circle cx="420" cy="360" r="120"/>
        <path d="M300 360h240M420 240v240"/>
      </g>
      <g fill="#0f172a" opacity="0.72">
        <rect x="150" y="650" width="600" height="120" rx="24"/>
      </g>
      <text x="450" y="705" text-anchor="middle" font-size="58" font-family="Arial, sans-serif" font-weight="700" fill="#E2E8F0" letter-spacing="3">LEVEL UP</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const posts = [
  {
    id: 1,
    username: "AvaRift",
    handle: "@avarift",
    time: "2h ago",
    tag: "Valorant • Ranked grind",
    avatar: "A",
    avatarTone: "linear-gradient(135deg, #60a5fa, #8b5cf6)",
    media: "linear-gradient(145deg, rgba(17,24,39,0.2), rgba(76,29,149,0.68)), radial-gradient(circle at top, rgba(96,165,250,0.7), transparent 40%)",
    mediaImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
    caption: "Late-night squad queue with the best comms in the lobby. Nothing beats landing a clutch round and celebrating on stream.",
    likes: 1842,
    comments: 92,
    saved: false,
    liked: true,
    savedState: false,
    commentsList: ["Great setup.", "Squad was on fire."],
  },
  {
    id: 2,
    username: "JaxPilot",
    handle: "@jaxpilot",
    time: "5h ago",
    tag: "Space PVP • New build",
    avatar: "J",
    avatarTone: "linear-gradient(135deg, #f59e0b, #f97316)",
    media: "linear-gradient(145deg, rgba(15,23,42,0.2), rgba(234,88,12,0.55)), radial-gradient(circle at center, rgba(249,115,22,0.7), transparent 38%)",
    mediaImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80",
    caption: "Tested a full mobility build in the arena and it feels wild. Anyone else rocking the burst route this week?",
    likes: 1260,
    comments: 58,
    saved: false,
    liked: false,
    savedState: false,
    commentsList: ["This build is clean."],
  },
  {
    id: 3,
    username: "MilaLoop",
    handle: "@milaloop",
    time: "1d ago",
    tag: "Co-op build • Showcase",
    avatar: "M",
    avatarTone: "linear-gradient(135deg, #22c55e, #14b8a6)",
    media: "linear-gradient(145deg, rgba(15,23,42,0.15), rgba(12,74,110,0.5)), radial-gradient(circle at center, rgba(45,212,191,0.7), transparent 38%)",
    mediaImage: "Moments-clip-from-Jul-24-2026.mov",
    caption: "Our base setup finally hit the sweet spot for raids. We made the whole squad feel stronger without overcomplicating the build.",
    likes: 2174,
    comments: 131,
    saved: false,
    liked: false,
    savedState: false,
    commentsList: ["Perfect for co-op raids."],
  }
];

const recommended = [
  { title: "Rift Watchers", meta: "1.4k members" },
  { title: "Night Raid Club", meta: "980 members" },
  { title: "Build Lab", meta: "2.3k followers" },
  { title: "Team Finder", meta: "New tonight" }
];

const clubs = [
  { name: "PixelParty", news: ["New co-op raid scheduled.", "Members sharing build comps."] },
  { name: "RiftWatchers", news: ["Clan tournament drops Friday.", "New strategy guide live."] },
  { name: "Arena Crew", news: ["Ranked scrims open.", "Matchmaking update posted."] }
];

const feed = document.getElementById("feed");
const recommendedList = document.getElementById("recommended-list");
const favoritesList = document.getElementById("favorites-list");
const clubList = document.getElementById("club-list");
const clubNewsPanel = document.getElementById("club-news-panel");
const favoriteAssets = {
  favorite: "Images/Favorite.svg",
  comment: "Images/Comment.svg",
  announcement: "Images/announcements.png"
};

function commentIcon() {
  return `
    <svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18.5L4.5 20v-8.1A5.4 5.4 0 0 1 9.9 6.5h5.2A5.4 5.4 0 0 1 20.5 12v.2a5.4 5.4 0 0 1-5.4 5.4H7Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.5 10.5h7M8.5 14h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    </svg>
  `;
}

function saveIcon() {
  return `
    <svg class="action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v13.2l-6.5-4.3-6.5 4.3V6A1.5 1.5 0 0 1 7 4.5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
}

let favorites = [];

function formatCount(value) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value;
}

function renderRecommended() {
  recommendedList.innerHTML = recommended
    .map(
      (item) => `
        <article class="recommended-card">
          <div class="reco-thumb" aria-hidden="true"></div>
          <div class="reco-copy">
            <div class="reco-title">${item.title}</div>
            <div class="reco-meta">${item.meta}</div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderFavorites() {
  if (!favorites.length) {
    favoritesList.innerHTML = '<li class="favorite-empty">No favorites saved yet.</li>';
    return;
  }

  favoritesList.innerHTML = favorites
    .map((favorite) => `<li><span>${favorite}</span></li>`)
    .join("");
}

function renderClubList() {
  clubList.innerHTML = clubs
    .map(
      (club, index) => `
        <li class="club-item">
          <div class="club-main">
            <span><span class="dot ${index % 3 === 0 ? "purple" : index % 3 === 1 ? "cyan" : "orange"}"></span> ${club.name}</span>
            <button type="button" class="announcement-btn" data-action="announce" data-club="${club.name}" aria-label="Announcements for ${club.name}">
              <img src="${favoriteAssets.announcement}" alt="Announcements" />
            </button>
          </div>
        </li>
      `
    )
    .join("");
}

function renderClubNews(activeClubName = "") {
  const activeClub = clubs.find((club) => club.name === activeClubName) || clubs[0];

  clubNewsPanel.innerHTML = `
    <div class="club-news-item"><strong>${activeClub.name}</strong></div>
    ${activeClub.news
      .map((item) => `<div class="club-news-item">• ${item}</div>`)
      .join("")}
  `;
}

function renderPosts() {
  feed.innerHTML = posts
    .map(
      (post) => `
        <article class="post" data-id="${post.id}">
          <header class="post-header">
            <div class="post-user">
              <div class="post-avatar" style="background: ${post.avatarTone};">${post.avatar}</div>
              <div>
                <div class="post-name">${post.username}</div>
                <div class="post-meta">${post.handle} • ${post.time}</div>
              </div>
            </div>
            <button class="more-button" aria-label="More options">•••</button>
          </header>

          <div class="post-media" style="background: ${post.media};">
            ${post.mediaImage && post.mediaImage.endsWith('.mov') || post.mediaImage && post.mediaImage.endsWith('.mp4') || post.mediaImage && post.mediaImage.endsWith('.webm') ? `
              <video class="post-photo" autoplay muted loop playsinline preload="metadata" src="${post.mediaImage}"></video>
            ` : `
              <img class="post-photo" src="${post.mediaImage || "Images/Profile.svg"}" alt="${post.username} post" />
            `}
            <div class="post-overlay">
              <span class="post-tag">${post.tag}</span>
            </div>
          </div>

          <div class="post-body">
            <p class="post-copy">${post.caption}</p>

            <div class="post-footer">
              <div class="post-actions">
                <button type="button" class="action-button liked ${post.liked ? "active" : ""}" data-action="like" data-id="${post.id}" aria-label="Like this post">
                  <span class="icon-heart">${post.liked ? "♥" : "♡"}</span>
                  <span>${formatCount(post.likes)}</span>
                </button>

                <button type="button" class="action-button comment-btn" data-action="comment" data-id="${post.id}" aria-label="Comment on this post">
                  ${commentIcon()}
                  <span>${formatCount(post.comments)}</span>
                </button>

                <button type="button" class="action-button favorite-btn saved ${post.savedState ? "active" : ""}" data-action="save" data-id="${post.id}" aria-label="Save this post">
                  ${saveIcon()}
                  <span>${post.savedState ? "Saved" : "Save"}</span>
                </button>
              </div>

              <div class="comment-stack">
                <div class="comment-list">
                  ${post.commentsList
                    .map((comment) => `<div class="comment-item"><strong>${post.username}</strong> • ${comment}</div>`)
                    .join("")}
                </div>

                <div class="comment-form hidden">
                  <input type="text" placeholder="Add a comment..." data-comment-input="${post.id}" />
                  <button type="button" data-action="post-comment" data-id="${post.id}">Post</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

feed.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;

  if (action === "announce") {
    const clubName = target.dataset.club;
    renderClubNews(clubName);
    return;
  }

  const id = Number(target.dataset.id);
  const currentPost = posts.find((post) => post.id === id);

  if (!currentPost) return;

  if (action === "like") {
    currentPost.liked = !currentPost.liked;
    currentPost.likes += currentPost.liked ? 1 : -1;
  }

  if (action === "comment") {
    const postCard = target.closest(".post");
    const form = postCard ? postCard.querySelector(".comment-form") : null;
    const input = postCard ? postCard.querySelector(`[data-comment-input="${id}"]`) : null;

    if (form && input) {
      form.classList.toggle("hidden");
      if (!form.classList.contains("hidden")) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    return;
  }

  if (action === "save") {
    currentPost.savedState = !currentPost.savedState;
    const postLabel = `${currentPost.username} • ${currentPost.tag}`;
    if (currentPost.savedState && !favorites.includes(postLabel)) {
      favorites.unshift(postLabel);
    } else if (!currentPost.savedState) {
      favorites = favorites.filter((favorite) => favorite !== postLabel);
    }
    renderFavorites();
  }

  if (action === "post-comment") {
    const postCard = target.closest(".post");
    const input = postCard ? postCard.querySelector(`[data-comment-input="${id}"]`) : null;
    const form = postCard ? postCard.querySelector(".comment-form") : null;
    const value = input ? input.value.trim() : "";
    if (!value) return;

    currentPost.commentsList.push(value);
    currentPost.comments += 1;
    input.value = "";
    if (form) form.classList.add("hidden");
  }

  renderPosts();
});

const clubButtons = document.querySelectorAll("[data-action='announce']");
clubButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const clubName = button.dataset.club;
    renderClubNews(clubName);
  });
});

renderRecommended();
renderFavorites();
renderClubList();
renderClubNews();
renderPosts();
