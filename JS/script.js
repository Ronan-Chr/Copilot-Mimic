const posts = [
  {
    id: 1,
    username: "AvaRift",
    handle: "@avarift",
    time: "2h ago",
    tag: "Valorant • Ranked grind",
    avatar: "A",
    avatarTone: "linear-gradient(135deg, #60a5fa, #8b5cf6)",
    media: "linear-gradient(145deg, rgba(17,24,39,0.2), rgba(76,29,149,0.68)), url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
    caption: "Late-night squad queue with the best comms in the lobby. Nothing beats landing a clutch round and celebrating on stream.",
    likes: 1842,
    comments: 92,
    saved: false,
    liked: true,
    savedState: false,
  },
  {
    id: 2,
    username: "JaxPilot",
    handle: "@jaxpilot",
    time: "5h ago",
    tag: "Space PVP • New build",
    avatar: "J",
    avatarTone: "linear-gradient(135deg, #f59e0b, #f97316)",
    media: "linear-gradient(145deg, rgba(15,23,42,0.2), rgba(234,88,12,0.55)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
    caption: "Tested a full mobility build in the arena and it feels wild. Anyone else rocking the burst route this week?",
    likes: 1260,
    comments: 58,
    saved: false,
    liked: false,
    savedState: false,
  },
  {
    id: 3,
    username: "MilaLoop",
    handle: "@milaloop",
    time: "1d ago",
    tag: "Co-op build • Showcase",
    avatar: "M",
    avatarTone: "linear-gradient(135deg, #22c55e, #14b8a6)",
    media: "linear-gradient(145deg, rgba(15,23,42,0.15), rgba(12,74,110,0.5)), url('https://images.unsplash.com/photo-1600861194949-f0834c303b44?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat",
    caption: "Our base setup finally hit the sweet spot for raids. We made the whole squad feel stronger without overcomplicating the build.",
    likes: 2174,
    comments: 131,
    saved: false,
    liked: false,
    savedState: false,
  }
];

const recommended = [
  { title: "Rift Watchers", meta: "1.4k members" },
  { title: "Night Raid Club", meta: "980 members" },
  { title: "Build Lab", meta: "2.3k followers" },
  { title: "Team Finder", meta: "New tonight" }
];

const feed = document.getElementById("feed");
const recommendedList = document.getElementById("recommended-list");

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
            <div class="post-overlay">
              <span class="post-tag">${post.tag}</span>
            </div>
          </div>

          <div class="post-body">
            <p class="post-copy">${post.caption}</p>

            <div class="post-actions">
              <div class="action-group">
                <button class="action-button liked ${post.liked ? "active" : ""}" data-action="like" data-id="${post.id}">
                  ${post.liked ? "♥" : "♡"} ${formatCount(post.likes)}
                </button>
                <button class="action-button" data-action="comment" data-id="${post.id}">
                  💬 ${formatCount(post.comments)}
                </button>
              </div>

              <button class="action-button saved ${post.savedState ? "active" : ""}" data-action="save" data-id="${post.id}">
                ${post.savedState ? "✓ Saved" : "Save"}
              </button>
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

  const id = Number(target.dataset.id);
  const action = target.dataset.action;
  const currentPost = posts.find((post) => post.id === id);

  if (!currentPost) return;

  if (action === "like") {
    currentPost.liked = !currentPost.liked;
    currentPost.likes += currentPost.liked ? 1 : -1;
  }

  if (action === "save") {
    currentPost.savedState = !currentPost.savedState;
  }

  renderPosts();
});

renderRecommended();
renderPosts();
