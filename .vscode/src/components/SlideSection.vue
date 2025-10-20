<template>
  <img
    src="/images/tentaculo-1.png"
    alt="Tentáculo izquierdo"
    class="tentaculo tentaculo-left"
    style="--offset: -50%;" />

  <div class="slide-container" data-aos="fade-up">
    <div class="titles">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        class="title"
        :class="{ active: activeSlide === index }"
        @click="activeSlide = index"
      >
        {{ slide.title }}
        <span v-if="activeSlide === index" class="active-indicator"></span>
      </button>
    </div>
    <div class="content">
      <div :class="{ 'animate__animated animate__fadeIn': activeSlideChanged } + ' p-10'">
        <p v-for="(paragraph, i) in slides[activeSlide].content.split('|||')" :key="i">
          {{ paragraph }}
        </p>
      </div>
      <button class="boton-cotizar animate__animated animate__fadeInUp">
        <a target="_blank" href="https://api.whatsapp.com/send?phone=573027212221&text=!Hola%2C%20quiero%20conocerlos%20mejor!">cotizar</a>
      </button>
    </div>
  </div>
</template>

<script setup>

import { ref, watch } from 'vue';

const slides = [
  {
    title: 'TradE',
    content: `Nada es al azar, todo responde a una estrategia. Cada activación está diseñada para cumplir los KPIs de nuestros clientes.|||Contamos con tropas de perfil comercial, alineadas con la estrategia, creatividad y objetivos para maximizar el impacto. Desde tomas de espacios hasta activaciones de producto y dinámicas promocionales, creamos experiencias que convierten y dejan huella.`
  },
  {
    title: 'digital',
    content: `¿Recuerdas cuando nos preguntamos cómo sería el futuro?|||Lo estamos viviendo ahora, la era digital, la inteligencia artificial y la itinerancia virtual, han llegado para quedarse. Una presencia online no es solo una vitrina que arroja información, es una herramienta clave para conectar, convertir y posicionar. Diseñamos, conceptualizamos y programamos espacios digitales optimizados para que se muevan a toda máquina. Desde Sitios web, apps, landing pages e intranets para que tu marca se destaque en los motores de búsqueda. `,
  },
  {
    title: 'streaming',
    content: 'Nos encargamos de todo para que cada transmisión en YouTube y otras plataformas sea impecable y refleje la identidad de la marca.|||Si es en vivo, tiene que salir perfecto. Nos encargamos de conectar con tu audiencia a través de experiencias en tiempo real, de alta calidad y desde cualquier lugar del mundo.',
  },
  {
    title: 'eventos',
    content: 'Hacemos que cualquier idea cobre vida (y si llueve, le rezamos al dios del clima). Creamos estrategias y conceptos únicos alineados con los objetivos de cada cliente, transformando eventos en experiencias.|||Nos encargamos de convenciones, lanzamientos, aperturas de tiendas, eventos para clientes y mucho más. Con un equipo experto en producción y logística, cubrimos todo: sonido, iluminación, escenografía,audiovisual,catering y lo que haga falta. Nada queda al azar, todo lleva nuestro ADN Divergente.',
  },
  {
    title: 'stands',
    content: 'Soñamos en grande y hacemos que cada idea cobre vida con precisión.Tenemos experiencia en arquitectura efímera, conceptualizamos y producimos stands, puntos de venta, escenarios para conciertos y eventos que no solo impactan, sino que generan una conexión real con la audiencia.',
  },
  {
    title: 'nosotros',
    content: 'Somos una agencia creativa de experiencias con 8 años de trayectoria. Nos diferenciamos del BTL tradicional porque nuestra creatividad está siempre alineada a los objetivos de nuestros clientes. Conceptualizamos, diseñamos y ejecutamos estrategias que generan experiencias extraordinarias a marcas como la tuya.',
  },
];

const activeSlide = ref(0);
const activeSlideChanged = ref(false);

watch(activeSlide, () => {
  activeSlideChanged.value = true;
  setTimeout(() => {
    activeSlideChanged.value = false;
  }, 300); // Duración de la animación (ajusta según necesites)
});
</script>

<style scoped>
@import 'animate.css';
.p-10{
  padding: 15px;
}
.slide-container {
  display: flex;
  color: #fff;
  font-family: sans-serif;
  padding: 100px 10px 20px;
  max-width: 1080px;
  margin: 0 auto;
}

.titles {
  display: flex;
  flex-direction: column;
  padding-right: 6px;
  width: 35%;
  margin: auto;
  position: relative;
}

.titles button {
  font-family: "Breymont-light", sans-serif;
  letter-spacing: 3px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.title {
  background: none;
  border: none;
  color: #525355;
  cursor: pointer;
  padding: 10px;
  text-align: right;
  font-size: 1.1em;
  transition: color 0.3s ease;
  margin-right: 15px;
}

.title.active {
  color: #00CAD3;
}

.content {
  flex: 1;
  padding: 0px 25px;
  width: 66%;
  border-left: 2px solid #525355;
  margin: auto;
  min-height: 250px;
}

.content h3 {
  font-family: "Akzidenz-grotesk-light", sans-serif;
  text-transform: uppercase;
  font-size: 18px;
  line-height: 22px;
}

.content p {
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 20px;
  font-family: 'Akzidenz-grotesk-light';
}

.boton-cotizar {
  background-color: #00CAD3;
  color: #fff;
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none; /* Para el enlace dentro del botón */
  display: inline-block;
  margin-left: 15px;
}

.boton-cotizar a {
  color: inherit; /* Hereda el color del botón */
  text-decoration: none; /* Elimina el subrayado del enlace */
}

.boton-cotizar:hover {
  background-color: #00b2b2;
}

.active-indicator {
  position: absolute;
  top: 50%;
  right: -38px;
  transform: translateY(-50%);
  width: 31px;
  height: 31px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 202, 211, 0.36);
  transition: transform 0.2s ease-in-out;
}

.active-indicator::before {
  content: '';
  width: 15px;
  height: 15px;
  background-color: #00cad3;
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

/* Animación de pulso sutil */
@keyframes pulse {
  0%, 100% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .slide-container {
    flex-direction: column;
    padding: 20px 10px;
  }

  .titles {
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    margin-bottom: 20px;
    padding-right: 0;
    border-bottom: 1px solid #525355;
  }

  .titles::-webkit-scrollbar {
    display: none;
  }

  .titles button {
    flex: 0 0 auto;
    margin: 0 10px 0 0;
    white-space: nowrap;
    justify-content: center;
    text-align: center;
  }

  .active-indicator {
    display: none;
  }
  .boton-cotizar{
    margin-left: 0px;
  }

  .content {
    width: 100%;
    border-left: none;
    padding: 0px;
    text-align: center;
  }
  .content p{
    text-align: center;
  }
}

</style>