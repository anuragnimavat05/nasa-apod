import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY
const app = document.querySelector('#app')

async function getAPOD() {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('NASA API request failed')
    }

    const data = await response.json()

    displayAPOD(data)
  } catch (error) {
    app.innerHTML = `
      <div class="error">
        <h2>🚀 Houston, we have a problem</h2>
        <p>${error.message}</p>
      </div>
    `
  }
}

function displayAPOD(data) {
  let media = ''

  if (data.media_type === 'image') {
    media = `
      <div class="media-card">
        <img
          src="${data.hdurl || data.url}"
          alt="${data.title}"
          class="apod-image"
        />

        <div class="media-overlay">
          <span>NASA APOD</span>
          <span>${data.date}</span>
        </div>
      </div>
    `
  } else if (data.media_type === 'video') {
    media = `
      <div class="media-card video-card">
        <div class="video-content">
          <div class="play-circle">▶</div>

          <a
            href="${data.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="watch-button"
          >
            🎥 Watch NASA's APOD Video
            <span>↗</span>
          </a>

          <p>Opens NASA's official APOD video</p>
        </div>
      </div>
    `
  }

  app.innerHTML = `
    <!-- Space background -->
    <div class="space-background">
      <div class="stars"></div>

      <div class="nebula nebula-one"></div>
      <div class="nebula nebula-two"></div>

      <!-- Animated comet -->
      <div class="comet">
        <div class="comet-tail"></div>
        <div class="comet-head"></div>
      </div>

      <!-- Floating space particles -->
      <div class="space-rock rock-one"></div>
      <div class="space-rock rock-two"></div>
      <div class="space-rock rock-three"></div>
    </div>

    <header class="navbar">
      <div class="brand">
        <div class="brand-icon">✦</div>

        <div>
          <strong>NASA APOD</strong>
          <span>Astronomy Picture of the Day</span>
        </div>
      </div>

      <nav>
        <a href="#home">Home</a>
        <a href="#apod">Explore</a>
        <a href="#about">About</a>
        <a
          href="https://science.nasa.gov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          NASA
        </a>
      </nav>

      <div class="date-pill">
        📅 ${data.date}
      </div>
    </header>

    <main id="home" class="container">

      <!-- Hero -->
      <section class="hero">

        <div class="hero-content">

          <p class="eyebrow">
            A WINDOW TO OUR UNIVERSE
          </p>

          <h1>
            ${data.title}
          </h1>

          <p class="hero-description">
            Discover today's journey through space with NASA's
            Astronomy Picture of the Day.
          </p>

          <div class="metadata">
            <span>📅 ${data.date}</span>
            <span>✦ ${data.media_type}</span>
            <span>🚀 NASA</span>
          </div>

        </div>

        <div class="quote">
          <p>
            “Somewhere, something incredible
            is waiting to be known.”
          </p>

          <span>— Carl Sagan</span>
        </div>

      </section>

      <!-- Main content -->
      <section id="apod" class="content-grid">

        <div class="media-section">
          ${media}
        </div>

        <article id="about" class="about-card">

          <div class="section-title">
            <span>◈</span>
            <h2>About today's image</h2>
          </div>

          <p>
            ${data.explanation}
          </p>

          <div class="source">
            Source: NASA Astronomy Picture of the Day
          </div>

        </article>

      </section>

      <!-- Bottom section -->
      <section class="bottom-message">

        <div>
          <span>EXPLORE</span>
          <span>•</span>
          <span>DISCOVER</span>
          <span>•</span>
          <span>LEARN</span>
          <span>•</span>
          <span>BE INSPIRED</span>
        </div>

        <p>
          Curiosity today. A brighter tomorrow.
        </p>

      </section>

    </main>

    <footer>
      <span>NASA</span>
      <span>For a better understanding of our universe</span>

      <span class="footer-credit">
        Data provided by NASA's APOD API 🚀
      </span>
    </footer>
  `
}

getAPOD()     