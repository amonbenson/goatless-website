import { ref, onMounted, onUnmounted } from "vue";

export const useIntersectionObserver = (callback, options) => {
  const observer = ref(null);

  const observe = (element) => {
    if (observer.value) {
      observer.value.observe(element)
    }
  };

  const unobserve = (element) => {
    if (observer.value) {
      observer.value.unobserve(element)
    }
  };

  onMounted(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    }, options)
  });

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect()
    }
  });

  return {
    observe,
    unobserve,
  };
};
