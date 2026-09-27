<script setup>
import { computed, ref } from 'vue'
import * as Sentry from '@sentry/vue'

const books = ref([
  { title: '置身事内', author: '兰小欢', borrowed: false },
  { title: '月亮与六便士', author: '毛姆', borrowed: false },
  { title: '额尔古纳河右岸', author: '迟子建', borrowed: false },
])

const borrowedCount = computed(() => books.value.filter((book) => book.borrowed).length)

function borrowBook(book) {
  Sentry.setTag('action', 'borrow_book')

  Sentry.setContext('book', {
    title: book.title,
    author: book.author,
    borrowed: book.borrowed,
  })

  Sentry.addBreadcrumb({
    category: 'library',
    message: `用户借阅了《${book.title}》`,
    level: 'info',
  })

  book.borrowed = true
}

function returnBook(book) {
  book.borrowed = false
}

function testSentry() {
  Sentry.setTag('action', 'test_sentry')

  Sentry.setContext('test_info', {
    page: 'library',
    action: 'click_test_button',
    version: '1.0.0',
  })

  Sentry.addBreadcrumb({
    category: 'library',
    message: '用户点击了测试 Sentry 按钮',
    level: 'info',
  })

  throw new Error(`Sentry 用户测试 ${Date.now()}`)
}
</script>

<template>
  <main class="page-shell">
    <section class="reading-list">
      <header class="page-header">
        <p class="eyebrow">COMMUNITY LIBRARY</p>
        <h1>社区图书馆</h1>
        <p>浏览书籍并管理你的借阅。</p>
      </header>

      <div class="book-list">
        <article v-for="book in books" :key="book.title" class="book-item">
          <div>
            <h2>{{ book.title }}</h2>
            <p>{{ book.author }}</p>
          </div>
          <div class="book-actions">
            <span :class="['status', book.borrowed ? 'status-borrowed' : 'status-available']">
              {{ book.borrowed ? '借阅中' : '可借阅' }}
            </span>
            <button v-if="!book.borrowed" type="button" @click="borrowBook(book)">借阅</button>
            <button v-else type="button" @click="returnBook(book)">归还</button>
          </div>
        </article>
      </div>

      <section class="borrow-summary">
        <span>当前借阅：{{ borrowedCount }} 本</span>
        <span>借阅期限：30 天</span>
        <button type="button" @click="testSentry">测试 Sentry</button>
      </section>
    </section>
  </main>
</template>
