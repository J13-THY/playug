import { useState, useRef } from 'react'
import { STORIES, INITIAL_POSTS, TRENDING_TAGS, SUGGESTED_USERS } from '../data/communityData'

function Avatar({ letter, color, size = 40, ring = false }) {
  return (
    <div
      className={`comm-avatar${ring ? ' ring' : ''}`}
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}
    >
      {letter}
    </div>
  )
}

function PostCard({ post, onLike, onRepost }) {
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [localComments, setLocalComments] = useState([])

  const submitComment = () => {
    if (!commentText.trim()) return
    setLocalComments(prev => [...prev, { id: Date.now(), text: commentText.trim(), user: 'You' }])
    setCommentText('')
  }

  return (
    <article className="comm-post">
      <div className="comm-post-left">
        <Avatar letter={post.avatar} color={post.color} size={44} />
        <div className="comm-post-thread-line" />
      </div>
      <div className="comm-post-body">
        <div className="comm-post-header">
          <span className="comm-post-name">
            {post.user}
            {post.verified && <span className="comm-verified" title="Verified">✓</span>}
          </span>
          <span className="comm-post-handle">{post.handle}</span>
          <span className="comm-post-dot">·</span>
          <span className="comm-post-time">{post.time}</span>
        </div>
        <p className="comm-post-text">{post.content}</p>
        <span className="comm-post-tag">{post.tag}</span>
        {post.image && <img src={post.image} alt="" className="comm-post-image" />}
        <div className="comm-post-actions">
          <button
            className={`comm-action-btn${post.liked ? ' active-like' : ''}`}
            onClick={() => onLike(post.id)}
            title="Like"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={post.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span>{post.likes + (post.liked ? 1 : 0)}</span>
          </button>
          <button
            className="comm-action-btn"
            onClick={() => setShowCommentBox(v => !v)}
            title="Comment"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span>{post.comments + localComments.length}</span>
          </button>
          <button
            className={`comm-action-btn${post.reposted ? ' active-repost' : ''}`}
            onClick={() => onRepost(post.id)}
            title="Repost"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            <span>{post.reposts + (post.reposted ? 1 : 0)}</span>
          </button>
          <button className="comm-action-btn" title="Share">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        </div>

        {showCommentBox && (
          <div className="comm-comment-box">
            <input
              className="comm-comment-input"
              placeholder="Write a comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitComment()}
            />
            <button className="comm-comment-submit" onClick={submitComment}>Post</button>
          </div>
        )}

        {localComments.length > 0 && (
          <div className="comm-local-comments">
            {localComments.map(c => (
              <div key={c.id} className="comm-local-comment">
                <Avatar letter="Y" color="#0a84ff" size={28} />
                <div className="comm-local-comment-bubble">
                  <span className="comm-local-comment-user">You</span>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default function CommunityPage() {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [postText, setPostText] = useState('')
  const [activeStory, setActiveStory] = useState(null)
  const textareaRef = useRef(null)

  const submitPost = () => {
    if (!postText.trim()) return
    const newPost = {
      id: `p-${Date.now()}`,
      user: 'You',
      avatar: 'Y',
      color: '#0a84ff',
      handle: '@you',
      time: 'now',
      verified: false,
      content: postText.trim(),
      tag: '#LudoChampion',
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
      reposted: false,
      image: null,
    }
    setPosts(prev => [newPost, ...prev])
    setPostText('')
  }

  const handleLike = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked } : p))
  }

  const handleRepost = (id) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, reposted: !p.reposted } : p))
  }

  return (
    <main className="main-content">
      <div className="comm-layout">

        {/* Main feed */}
        <div className="comm-feed-col">
          {/* Stories */}
          <section className="comm-stories-bar">
            <div className="comm-stories-scroll">
              {/* Add your own story */}
              <div className="comm-story-item">
                <div className="comm-story-add">
                  <Avatar letter="Y" color="#0a84ff" size={52} />
                  <div className="comm-story-plus">+</div>
                </div>
                <span className="comm-story-label">Your Story</span>
              </div>
              {STORIES.map(s => (
                <div key={s.id} className="comm-story-item" onClick={() => setActiveStory(s)}>
                  <div className={`comm-story-ring${s.hasNew ? ' new' : ''}`}>
                    <Avatar letter={s.avatar} color={s.color} size={52} />
                  </div>
                  <span className="comm-story-label">{s.user}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Compose box */}
          <section className="comm-compose">
            <Avatar letter="Y" color="#0a84ff" size={44} />
            <div className="comm-compose-body">
              <textarea
                ref={textareaRef}
                className="comm-compose-input"
                placeholder="What's happening in your game world?"
                value={postText}
                onChange={e => setPostText(e.target.value)}
                rows={2}
              />
              <div className="comm-compose-footer">
                <div className="comm-compose-tags">
                  <button className="comm-compose-tag-btn" title="Add image">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </button>
                  <button className="comm-compose-tag-btn" title="Add gif">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="6" width="20" height="12" rx="2"/>
                      <path d="M8 12h2v2H8v-4h4M14 10h2M14 12h2M14 14h2"/>
                    </svg>
                  </button>
                  <button className="comm-compose-tag-btn" title="Add poll">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  </button>
                </div>
                <button
                  className="comm-post-btn"
                  onClick={submitPost}
                  disabled={!postText.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </section>

          {/* Feed */}
          <div className="comm-feed-divider">
            <span>For You</span>
            <span>Following</span>
          </div>
          <div className="comm-feed">
            {posts.map(p => (
              <PostCard key={p.id} post={p} onLike={handleLike} onRepost={handleRepost} />
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <aside className="comm-right-sidebar">
          {/* Trending */}
          <div className="comm-widget">
            <h3 className="comm-widget-title">Trending in Gaming</h3>
            {TRENDING_TAGS.map(({ tag, posts: count }) => (
              <button key={tag} className="comm-trend-row">
                <span className="comm-trend-tag">{tag}</span>
                <span className="comm-trend-count">{count} posts</span>
              </button>
            ))}
          </div>

          {/* Suggested */}
          <div className="comm-widget">
            <h3 className="comm-widget-title">Who to Follow</h3>
            {SUGGESTED_USERS.map(({ name, handle, avatar, color }) => (
              <div key={handle} className="comm-suggest-row">
                <Avatar letter={avatar} color={color} size={40} />
                <div className="comm-suggest-info">
                  <span className="comm-suggest-name">{name}</span>
                  <span className="comm-suggest-handle">{handle}</span>
                </div>
                <button className="comm-follow-btn">Follow</button>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Story viewer modal */}
      {activeStory && (
        <div className="comm-story-modal" onClick={() => setActiveStory(null)}>
          <div className="comm-story-viewer" onClick={e => e.stopPropagation()}>
            <div className="comm-story-progress">
              <div className="comm-story-progress-fill" />
            </div>
            <div className="comm-story-viewer-header">
              <Avatar letter={activeStory.avatar} color={activeStory.color} size={36} />
              <span className="comm-story-viewer-name">{activeStory.user}</span>
              <button className="comm-story-close" onClick={() => setActiveStory(null)}>✕</button>
            </div>
            <div className="comm-story-content" style={{ background: `linear-gradient(135deg, ${activeStory.color}, #1a1a2e)` }}>
              <p className="comm-story-text">🎮 {activeStory.user}'s latest game story</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
