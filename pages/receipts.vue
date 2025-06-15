<template>
  <div class="">
    <!-- Mobile Overlay -->

    <!-- Main Content -->
    <div class="">


      <!-- Receipts Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <!-- Search Bar -->
        <div class="max-w-md mx-auto mb-8">
          <div class="relative">
            <input v-model="searchQuery" type="text" placeholder="Search by vendor..."
              class="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Receipts Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div v-for="receipt in filteredReceipts" :key="receipt.id"
            class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div class="flex items-start space-x-4">
              <!-- Receipt Icon -->
              <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>

              <!-- Receipt Details -->
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ receipt.vendor }}</h3>
                <p class="text-sm text-gray-500 mb-2">{{ receipt.date }}</p>
                <p class="text-xl font-bold text-blue-600">${{ receipt.amount }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center space-x-2">
          <button @click="previousPage" :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-4 h-4 mr-1 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
            Previous
          </button>

          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="[
            'px-3 py-2 text-sm font-medium rounded-md',
            currentPage === page
              ? 'text-blue-600 bg-blue-50 border border-blue-300'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          ]">
            {{ page }}
          </button>

          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            Next
            <svg class="w-4 h-4 ml-1 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
definePageMeta({
  name: 'All Receipts'
})

const sidebarOpen = ref(false)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 4

// Sample receipt data
const receipts = ref([
  { id: 1, vendor: 'Starbucks', date: '2024-06-10', amount: '12.60' },
  { id: 2, vendor: 'Amazon', date: '2024-06-09', amount: '29.99' },
  { id: 3, vendor: 'Walmart', date: '2024-06-06', amount: '56.12' },
  { id: 4, vendor: 'CVS Pharmacy', date: '2024-06-02', amount: '18.75' },
  { id: 5, vendor: 'Target', date: '2024-06-01', amount: '45.30' },
  { id: 6, vendor: 'McDonald\'s', date: '2024-05-30', amount: '8.99' },
  { id: 7, vendor: 'Home Depot', date: '2024-05-28', amount: '127.45' },
  { id: 8, vendor: 'Costco', date: '2024-05-25', amount: '89.67' }
])

// Computed properties
const filteredReceipts = computed(() => {
  let filtered = receipts.value

  if (searchQuery.value) {
    filtered = filtered.filter(receipt =>
      receipt.vendor.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  const filtered = searchQuery.value
    ? receipts.value.filter(receipt =>
      receipt.vendor.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    : receipts.value

  return Math.ceil(filtered.length / itemsPerPage)
})

// Methods
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Reset to first page when searching
const resetPage = () => {
  currentPage.value = 1
}

// Watch for search changes
import { watch } from 'vue'
watch(searchQuery, resetPage)
</script>

<style scoped>
/* Additional custom styles if needed */
</style>