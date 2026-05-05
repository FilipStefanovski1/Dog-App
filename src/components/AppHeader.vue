<template>
  <header class="header">
    <div class="header-inner">
      <router-link to="/" class="logo">
        <span class="logo-text">Dogger</span>
        <span class="logo-sub">by Filip</span>
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link" exact-active-class="active">
          Breeds
        </router-link>
        <router-link to="/categories" class="nav-link" active-class="active">
          Categories
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  background: #ffffff;
  border-bottom: 1px solid #ececf0;
  position: sticky;
  top: 0;
  z-index: 10;
}
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 0.3px;
  color: #2b2f36;
}
.logo-sub {
  font-size: 13px;
  font-weight: 400;
  color: #8a90a0;
}
.nav {
  display: flex;
  gap: 6px;
}
.nav-link {
  color: #5b6270;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 14px;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}
.nav-link:hover {
  background: #f0f2f6;
  color: #2b2f36;
}
.nav-link.active {
  background: #eef1f6;
  color: #2b2f36;
}
</style>
