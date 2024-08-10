import { onMounted, onUnmounted, ref } from "vue";

export function useIntersectionObserver(callback, options) {
  const observer = ref(null);

  const observe = (element) => {
    if (observer.value) {
      observer.value.observe(element);
    }
  };

  const unobserve = (element) => {
    if (observer.value) {
      observer.value.unobserve(element);
    }
  };

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries
        .filter(entry => entry.isIntersecting)
        .forEach(entry => callback(entry.target));
    }, options);
  });

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  return {
    observe,
    unobserve
  };
}
