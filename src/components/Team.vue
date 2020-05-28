<template>
  <div class="team-item my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" v-if="team">
    <article class="p-4 md:p-2 overflow-hidden rounded-lg shadow-lg border-solid border-2 border-gray-300">
      <header class="flex items-center justify-start leading-tight p-2 md:p-4 pb-1 md:pb-2 pb-0 md:pb-0">
        <img :alt="teamPlaceholder" :title="teamPlaceholder" class="block h-12 w-12 mr-4" :src="teamImage" />
        <h1 class="font-black text-2xl">{{ team.school }}</h1>
      </header>
      <section class="flex flex-row items-center justify-end leading-tight p-2 md:p-4 pt-0 md:pt-0">
        <router-link
          :to="{name: 'team', params: { id: team.id }}"
          class="no-underline hover:underline text-grey-darker hover:text-red-dark ml-2"
        >{{ seeInfoText }}</router-link>
      </section>
      <section class="flex flex-row items-center justify-between leading-tight px-2 md:px-4 pt-2 md:pt-2">
        <p class="text-sm"><strong>{{ identificatorText }}:</strong> {{ team.id }}</p>
        <div class="flex flex-row items-center justify-end">
          <p class="text-sm"><strong>{{ colorText }}:</strong></p>
          <span class="ml-2 rounded-full h-4 w-4 flex items-center justify-center" :style="teamColor"></span>
        </div>
      </section>
      <section class="flex flex-row items-center justify-between leading-tight p-2 md:p-4 pt-1 md:pt-2">
        <p class="text-sm"><strong>{{ abbreviationText }}:</strong> {{ team.abbreviation }}</p>
        <p v-if="team.division" class="ml-2 text-sm"><strong>{{ divisionText }}:</strong> {{ team.division }}</p>
      </section>
      <footer class="flex items-center justify-between leading-none p-2 md:p-4 pt-1 md:pt-2">
        <button
          v-if="select"
          :class="{'bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded': true, ' opacity-50 cursor-not-allowed': team.favorite}"
          @click="selectFavorite(team)"
        >{{ favoriteButtonText }}</button>
        <span v-if="select && team.favorite">
          <img :alt="favoriteText" :title="favoriteText" class="block h-8 w-8" src="../assets/images/star.png" />
        </span>
        <button
          v-if="note"
          :class="{'bg-orange-500 hover:bg-orange-700 text-white font-bold p-2 rounded': true, ' opacity-50 cursor-not-allowed': noteVisible}"
          @click="addNote()"
        >{{ addNoteButton }}</button>
        <button
          v-if="deselect"
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded"
          @click="deselectFavorite(team)"
        >{{ deselectButtonText }}</button>
      </footer>
      <div class="team-note-text flex flex-col p-2 md:p-4 pt-0 md:pt-0" v-show="note && team.note !== null">
        <div>{{ team.note }}</div>
      </div>
      <div class="flex flex-col p-2 md:p-4 pt-0 md:pt-0" v-if="noteVisible">
        <div class="flex items-center justify-start">
          <textarea ref="textnote" class="text-grey-darkest flex-1 p-2 mb-2 bg-transparent border-solid border-2 border-gray-300"></textarea>
        </div>
        <div class="flex items-center justify-between leading-none pt-1 md:pt-2">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            @click="saveNote(team)"
          >{{ saveNoteButtonText }}</button>
          <button
            class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-2 border border-blue-500 hover:border-transparent rounded"
            @click="cancelNote()"
          >{{ cancelNoteButtonText }}</button>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "Team",
  props: ["team", "select", "deselect", "note", "favorite"],
  data() {
    return {
      noteVisible: false,
      noteActive: false,
      seeInfoText: "See info",
      identificatorText: "Identificator",
      colorText: "Color",
      abbreviationText: "Abbreviation",
      divisionText: "Division",
      favoriteButtonText: "Select favorite",
      deselectButtonText: "Deselect favorite",
      addNoteButton: "Add a note",
      saveNoteButtonText: "Save",
      cancelNoteButtonText: "Cancel",
      favoriteText: "Favorite"
    };
  },
  computed: {
    teamPlaceholder() {
      return this.team.school;
    },
    teamImage() {
      return this.team.logos[0];
    },
    teamColor() {
      return {
        backgroundColor: this.team.color
      };
    }
  },
  methods: {
    selectFavorite(team) {
      this.$emit("select", team);
    },
    deselectFavorite(team) {
      this.$emit("deselect", team);
    },
    addNote() {
      this.noteVisible = true;
    },
    saveNote(team) {
      team.note = this.$refs["textnote"].value;
      this.noteVisible = false;
      this.$emit("savenote", team);
    },
    cancelNote() {
      this.$refs["textnote"].value = "";
      this.noteVisible = false;
    }
  }
};
</script>