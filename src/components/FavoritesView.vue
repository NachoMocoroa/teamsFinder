<template>
  <section>
    <section class="section-container">
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="teamsStored && teamsStored.length >= 1">
        <Team
          v-for="team in teamsStored"
          :team="team"
          :key="team.id"
          :deselect="true"
          :note="true"
          :favorite="team.favorite"
          @deselect="emitDeselected"
          @savenote="emitSaveNote"
        ></Team>
      </div>
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="!teamsStored">
        <h2 class="my-8 mx-auto font-black text-base">{{ noFavoritesText }}</h2>
      </div>
    </section>
  </section>
</template>

<script>
import Team from "./Team";

export default {
  name: "FavoritesView",
  components: {
    Team
  },
  data() {
    return {
      noFavoritesText: "No favorites yet"
    };
  },
  computed: {
    teamsStored() {
      return this.$store.getters.favorites;
    },
    selectedConference() {
      return this.$store.getters.conference;
    }
  },
  methods: {
    emitDeselected(team) {
      this.processTeam(team, "setDeselect");
    },
    emitSaveNote(team) {
      this.processTeam(team, "setNote");
    },
    processTeam(team, action) {
      const confsObj = JSON.parse(localStorage.getItem("conferences"));
      const foundConference = confsObj.conferences.find(elem => elem.conference === confsObj.selected);
      const teamFound = foundConference.teams.find(elem => elem.abbreviation === team.abbreviation);
      if (action === "setNote") {
        teamFound.note = team.note;
      } else if (action === "setDeselect") {
        teamFound.favorite = false;
      } else {
        console.log("Action not registered");
      }
      const teamsFoundSelected = foundConference.teams.filter(elem => elem.favorite === true);
      foundConference.favorites = teamsFoundSelected;
      this.setStoreValues(confsObj, foundConference.teams, teamsFoundSelected);
    },
    setStoreValues(obj, teams, favorites) {
      this.$store.commit("setConferences", obj);
      this.$store.commit("setTeams", teams);
      this.$store.commit("setFavorites", favorites);
    }
  }
};
</script>