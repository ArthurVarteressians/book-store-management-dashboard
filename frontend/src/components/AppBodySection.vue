<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
  import { useToast } from 'vue-toastification';
  import SkeletonLoader from '@/components/SkeletonLoader.vue';

  interface Book {
    _id: string;
    title: string;
    author: string;
    price: number;
    description: string;
    category: string;
  }

  interface FilterResponse {
    categories: string[];
    authors: string[];
  }

  // Initialize Vue Router and Toast
  const toast = useToast();

  // Reactive State Variables with proper types
  const books = ref<Book[]>([]);
  const searchQuery = ref<string>('');
  const selectedCategory = ref<string>('All Categories');
  const selectedAuthor = ref<string>('All Authors');
  const categories = ref<string[]>([]);
  const authors = ref<string[]>([]);
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(1);
  const isCategoryDropdownActive = ref<boolean>(false);
  const isAuthorDropdownActive = ref<boolean>(false);
  const isSearchButtonActive = ref<boolean>(false);
  const welcomeShown = ref<boolean>(false);
  const isLoading = ref<boolean>(true); // Track loading state

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success',
  ): void => {
    if (type === 'success') {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const fetchBooks = async (
    page = 1,
    query = '',
    category = '',
    author = '',
  ): Promise<void> => {
    try {
      isLoading.value = true; // Set loading state to true
      const response = await fetch(
        `http://localhost:3000/books?page=${page}&title=${query}&category=${category}&author=${author}`,
      );
      const data = await response.json();
      if (data && Array.isArray(data.books)) {
        books.value = data.books;
        currentPage.value = data.currentPage;
        totalPages.value = data.totalPages;
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      showToast('Failed to load books. Please try again later.', 'error');
    } finally {
      isLoading.value = false; // Set loading state to false after fetch completes
    }
  };

  // Fetch categories and authors for dropdown filters
  const fetchFilters = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/books/filters');
      const data: FilterResponse = await response.json();
      categories.value = ['All Categories', ...data.categories];
      authors.value = ['All Authors', ...data.authors];
    } catch (error) {
      console.error('Error fetching filters:', error);
      showToast('Failed to load filters. Please try again later.', 'error');
    }
  };

  // Handle search and filter functionality on button click
  const handleFilter = (page = 1): void => {
    const category =
      selectedCategory.value === 'All Categories' ? '' : selectedCategory.value;
    const author =
      selectedAuthor.value === 'All Authors' ? '' : selectedAuthor.value;
    fetchBooks(page, searchQuery.value, category, author);
  };

  // Clear all filters and reset to default values
  const clearFilters = (): void => {
    searchQuery.value = '';
    selectedCategory.value = 'All Categories';
    selectedAuthor.value = 'All Authors';
    handleFilter(1);
    showToast('Search again', 'success');
  };

  // Pagination logic
  const nextPage = (): void => {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
      handleFilter(currentPage.value);
    }
  };

  const previousPage = (): void => {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
      handleFilter(currentPage.value);
    }
  };

  // Toggle dropdown for category
  const toggleCategoryDropdown = (): void => {
    isCategoryDropdownActive.value = !isCategoryDropdownActive.value;
    isAuthorDropdownActive.value = false;
  };

  // Toggle dropdown for author
  const toggleAuthorDropdown = (): void => {
    isAuthorDropdownActive.value = !isAuthorDropdownActive.value;
    isCategoryDropdownActive.value = false;
  };

  // Close dropdowns when clicking outside
  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      isCategoryDropdownActive.value = false;
      isAuthorDropdownActive.value = false;
    }
  };

  // Watch for changes to enable/disable the "Show Results" button
  watch([searchQuery, selectedCategory, selectedAuthor], () => {
    isSearchButtonActive.value =
      searchQuery.value.trim() !== '' ||
      selectedCategory.value !== 'All Categories' ||
      selectedAuthor.value !== 'All Authors';
  });

  // Lifecycle hook: Runs when the component mounts
  onMounted(async () => {
    await fetchBooks(1);
    await fetchFilters();
    if (!welcomeShown.value) {
      showToast('Welcome to the Book Store!', 'success');
      welcomeShown.value = true;
    }
    document.addEventListener('click', handleClickOutside);
  });

  // Lifecycle hook: Runs before the component unmounts
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
</script>

<template>
  <div class="w-full bg-slate-100 flex flex-col min-h-full">
    <!-- Search and Filter Section -->
    <div
      class="bg-slate-100 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0 md:space-x-4 max-w-full"
    >
      <!-- Search Field -->
      <div class="w-full md:w-3/12">
        <label class="block mb-2 text-sm md:text-base">Search by Title:</label>
        <input
          v-model="searchQuery"
          placeholder="Enter book title"
          class="p-2 border rounded w-full text-sm md:text-base"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full md:w-3/12 relative dropdown-container">
        <label class="block mb-2 text-sm md:text-base"
          >Filter by Category:</label
        >
        <div
          @click="toggleCategoryDropdown"
          class="p-2 border rounded w-full text-sm md:text-base bg-white cursor-pointer"
        >
          {{ selectedCategory || 'All Categories' }}
        </div>
        <ul
          v-if="isCategoryDropdownActive"
          class="absolute bg-gray-300 w-full max-h-[30vh] p-2 rounded-lg overflow-y-auto mt-2 z-50 shadow-lg"
        >
          <li
            v-for="category in categories"
            :key="category"
            @click="
              selectedCategory = category;
              toggleCategoryDropdown();
            "
            class="p-2 cursor-pointer hover:bg-gray-400"
          >
            {{ category }}
          </li>
        </ul>
      </div>

      <!-- Author Filter -->
      <div class="w-full md:w-3/12 relative dropdown-container">
        <label class="block mb-2 text-sm md:text-base">Filter by Author:</label>
        <div
          @click="toggleAuthorDropdown"
          class="p-2 border rounded w-full text-sm md:text-base bg-white cursor-pointer"
        >
          {{ selectedAuthor || 'All Authors' }}
        </div>
        <ul
          v-if="isAuthorDropdownActive"
          class="absolute bg-gray-300 w-full max-h-[30vh] p-2 rounded-lg overflow-y-auto mt-2 z-50 shadow-lg"
        >
          <li
            v-for="author in authors"
            :key="author"
            @click="
              selectedAuthor = author;
              toggleAuthorDropdown();
            "
            class="p-2 cursor-pointer hover:bg-gray-400"
          >
            {{ author }}
          </li>
        </ul>
      </div>

      <!-- Filter Results Button -->
      <div class="w-full md:w-auto flex justify-center md:justify-start">
        <button
          @click="() => handleFilter()"
          :disabled="!isSearchButtonActive"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full md:w-auto text-sm md:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Show Results
        </button>
      </div>

      <!-- Clear Filters Button -->
      <div class="w-full md:w-auto flex justify-center md:justify-start">
        <button
          @click="clearFilters"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full md:w-auto text-sm md:text-base"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Main Content Section -->
    <main class="flex-1 bg-slate-300 p-4 md:p-6">
      <div v-if="isLoading">
        <SkeletonLoader />
      </div>
      <div
        v-if="books.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="book in books"
          :key="book._id"
          class="bg-white p-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <h3 class="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            {{ book.title }}
          </h3>
          <p class="text-base sm:text-lg">Author: {{ book.author }}</p>
          <p class="text-base sm:text-lg">Price: ${{ book.price }}</p>
          <p class="text-base sm:text-lg">Category: {{ book.category }}</p>
          <p class="text-sm text-gray-600 mt-2">{{ book.description }}</p>
        </div>
      </div>
    </main>

    <!-- Pagination Buttons -->
    <div class="bg-gray-100 p-4">
      <div
        class="flex flex-col md:flex-row justify-center md:space-x-4 space-y-2 md:space-y-0 my-4 md:my-6"
      >
        <button
          @click="() => previousPage()"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-sm md:text-base"
        >
          Previous
        </button>
        <span class="text-center text-sm md:text-base"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          @click="() => nextPage()"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full md:w-auto text-sm md:text-base"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
