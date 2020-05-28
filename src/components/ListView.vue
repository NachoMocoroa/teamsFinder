<template>
  <section>
    <div v-show="selectedConference" class="flex flex-wrap -mx-3 mb-2">
      <div class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
        <h1 class="mb-2 font-black text-3xl">{{ selectedConference }}</h1>
      </div>
      <div v-show="isConferenceSelected" class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
        <SelectComponent
          :ref="'orderSelect'"
          :selectString="selectString"
          :selectLabel="selectLabel"
          :options="selectOptions"
          @optionSelected="emitOrderSelected"
        ></SelectComponent>
      </div>
      <div v-show="isConferenceSelected" class="w-full md:w-1/3 px-3 mb-2 md:mb-0">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-search">
          {{ searchLabel }}
        </label>
        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-search" type="text" v-model="searchQuery" placeholder="Search">
      </div>
    </div>
    <section class="section-container">
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="teamsObject && teamsObject.length >= 1">
        <Team
          v-for="team in teamsObject"
          :team="team"
          :key="team.id"
          :select="true"
          :favorite="team.favorite"
          @select="emitSelected"
        ></Team>
      </div>
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="isSearchEmpty">
        <h2 class="my-8 mx-auto font-black text-base">{{ noTeamsSearchText }}</h2>
      </div>
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="teamsObject && teamsObject.length === 0 && !isSearchEmpty">
        <h2 class="my-8 mx-auto font-black text-base">{{ noTeamsLoadedText }}</h2>
      </div>
      <div class="flex flex-wrap -mx-1 lg:-mx-4" v-if="!teamsObject && !isSearchEmpty">
        <h2 class="my-8 mx-auto font-black text-base">{{ selectToLoadText }}</h2>
      </div>
    </section>
  </section>
</template>

<script>
import Team from "./Team";
import SelectComponent from "./SelectComponent";

export default {
  name: "ListView",
  components: {
    Team,
    SelectComponent
  },
  data() {
    return {
      previousStore: null,
      teamsObject: null,
      selectOptions: null,
      noTeamsLoadedText: "There are no teams in conference. Please select another one.",
      selectToLoadText: "Please, select conference to load teams.",
      noTeamsSearchText: "There are no teams for search.",
      selectString: "Select",
      selectLabel: "Order",
      searchLabel: "Search",
      searchQuery: "",
      selectOrders: [
        { id: 0, abbreviation: "school", name: "School" },
        { id: 1, abbreviation: "abbreviation", name: "Abbreviation" },
        { id: 2, abbreviation: "id", name: "Identificator" },
        { id: 3, abbreviation: "division", name: "Division" }
      ]
    };
  },
  computed: {
    selectedConference() {
      return this.$store.getters.conference;
    },
    isConferenceSelected() {
      return this.$store.getters.conference !== null && this.$store.getters.teams && this.$store.getters.teams.length > 0;
    },
    isSearchEmpty() {
      return this.$store.getters.conference !== null && this.teamsObject && this.teamsObject.length === 0 && this.searchQuery && this.searchQuery.length > 0;
    }
  },
  mounted() {
    this.teamsObject = this.$store.getters.teams;
  },
  updated() {
    this.checkUpdates();
  },
  methods: {
    checkUpdates() {
      if (this.$store.getters.conference !== null && this.$store.getters.conference !== this.previousStore) {
        this.configOptions();
        this.previousStore = this.$store.getters.conference;
      }
    },
    configOptions() {
      const arrProps = [];
      for (const prop in this.teamsObject[0]) {
        for (let j = 0; j < this.selectOrders.length; j++) {
          if (this.selectOrders[j].abbreviation === prop && this.teamsObject[0][prop] !== null) {
            arrProps.push(this.selectOrders[j]);
          }
        }
      }
      this.selectOptions = arrProps;
    },
    orderBy(property) {
      return (a, b) => {
        return a[property] < b[property]
          ? -1
          : a[property] > b[property]
          ? 1
          : 0;
      };
    },
    emitOrderSelected(opt) {
      const confsObj = JSON.parse(localStorage.getItem("conferences"));
      const conferenceFound = confsObj.conferences.find(
        elem => elem.conference === confsObj.selected
      );
      this.teamsObject = conferenceFound.teams.sort(this.orderBy(opt.value));
      this.$store.commit("setTeams", this.teamsObject);
    },
    emitSelected(team) {
      const confsObj = JSON.parse(localStorage.getItem("conferences"));
      const conferenceFound = confsObj.conferences.find(
        elem => elem.conference === confsObj.selected
      );
      const teamFound = conferenceFound.teams.find(
        elem => elem.abbreviation === team.abbreviation
      );
      teamFound.favorite = true;
      const teamsFoundSelected = conferenceFound.teams.filter(
        elem => elem.favorite === true
      );
      conferenceFound.favorites = teamsFoundSelected;
      this.teamsObject = conferenceFound.teams;
      this.setStoreValues(confsObj, conferenceFound.teams, teamsFoundSelected);
    },
    setStoreValues(obj, teams, favorites) {
      this.$store.commit("setConferences", obj);
      this.$store.commit("setTeams", teams);
      this.$store.commit("setFavorites", favorites);
    }
  },
  watch: {
    $route() {
      this.teamsObject = this.$store.getters.teams;
    },
    searchQuery() {
      const obj = this.$store.getters.teams;
      if (this.searchQuery) {
        this.teamsObject = obj.filter(team => {
          return team.school.toLowerCase().startsWith(this.searchQuery);
        });
      } else {
        this.teamsObject = obj;
      }
    }
  }
};
</script>