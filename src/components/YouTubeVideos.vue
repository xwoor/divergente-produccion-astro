<template>
  <section class="youtube-section">
    <div class="youtube-container">  
      <div class="videos-grid">
        <div 
          v-for="(video, index) in displayedVideos" 
          :key="video.id"
          class="video-card"
          data-aos="zoom-in"
          :data-aos-delay="index * 100"
          @click="openVideo(video.id)"
        >
          <div class="video-thumbnail">
            <img 
              :src="`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`" 
              :alt="video.title"
              loading="lazy"
              @error="handleImageError"
            />
            
          </div>
          <h3 class="video-title">{{ video.title }}</h3>
        </div>
      </div>

      <div class="load-more-container" v-if="!showAll && videos.length > initialCount">
        <button class="btn-load-more" @click="loadMore">
          ver más
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// Array de videos cargado desde archivo JSON externo
const videos = ref([]);

const showAll = ref(false);
const isMobile = ref(false);

const initialCount = computed(() => {
  return isMobile.value ? 4 : 6; // 2 filas: móvil 2x2=4, desktop 3x2=6
});

const displayedVideos = computed(() => {
  if (showAll.value) {
    return videos.value;
  }
  return videos.value.slice(0, initialCount.value);
});

const loadMore = () => {
  showAll.value = true;
};

const openVideo = (videoId) => {
  window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
};

const handleImageError = (event) => {
  // Si falla la imagen de alta calidad, usar la estándar
  const img = event.target;
  const videoId = img.src.match(/\/vi\/([^\/]+)\//)[1];
  img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Cargar videos desde el archivo JSON
const loadVideos = async () => {
  try {
    const response = await fetch('/videos.json');
    const data = await response.json();
    videos.value = data;
  } catch (error) {
    console.error('Error cargando videos:', error);
  }
};

onMounted(() => {
  checkMobile();
  loadVideos();
  window.addEventListener('resize', checkMobile);
});
</script>

<style scoped>
.youtube-section {
  background-color: #000;
  padding: 80px 20px;
  min-height: 80vh;
}

.youtube-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  color: #00CAD3;
  font-family: 'Breymont-light', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  letter-spacing: 3px;
  margin-bottom: 60px;
  text-transform: lowercase;
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.video-card {
  cursor: pointer;
  transition: transform 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  background-color: #1a1a1a;
}

.video-card:hover {
  transform: translateY(-8px);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  background-color: #000;
}

.video-thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.video-card:hover .video-thumbnail img {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.video-card:hover .play-overlay {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

.video-title {
  padding: 15px;
  color: #fff;
  font-family: 'Akzidenz-grotesk-light', sans-serif;
  font-size: 15px;
  line-height: 1.4;
  min-height: 65px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
}

.load-more-container {
  text-align: center;
  margin-top: 40px;
}

.btn-load-more {
  background-color: #00CAD3;
  color: #fff;
  padding: 12px 40px;
  border: none;
  border-radius: 30px;
  font-size: 1em;
  font-family: 'Breymont-light', sans-serif;
  letter-spacing: 2px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: lowercase;
}

.btn-load-more:hover {
  background-color: #00b2b2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 202, 211, 0.3);
}

/* Responsive para móvil */
@media (max-width: 768px) {
  .youtube-section {
    padding: 60px 15px;
  }

  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .section-title {
    margin-bottom: 40px;
    font-size: 1.2rem;
  }

  .video-title {
    font-size: 12px;
    padding: 10px;
    min-height: 55px;
  }

  .play-overlay svg {
    width: 48px;
    height: 34px;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .videos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
