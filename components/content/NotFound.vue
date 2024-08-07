<template>
  <h1 class="text-center"><span class="font-thin">404</span> Not Found</h1>
  <nuxt-link class="text-center" to="/" :target="newTab ? '_blank' : '_self'" :rel="newTab ? 'noopener noreferrer' : ''">
    Go back to the home page
  </nuxt-link>
</template>
