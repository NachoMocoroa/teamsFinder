<template>
  <header class="container mx-auto py-5">
    <nav class="flex items-center justify-between">
      <div>
        <h1 class="leading-none text-2xl text-grey-darkest">TeamsFinder</h1>
      </div>
      <ul class="flex flex-row">
        <li class="pr-5">
          <router-link to="/teams" active-class="active-link">Teams</router-link>
        </li>
        <li>
          <router-link to="/favorites" active-class="active-link">Favorites</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
};
</script>