<template>
  <section>
    <div v-show="selectVisible" class="flex flex-wrap -mx-3 my-3 md:my-6">
      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <SelectComponent
          :ref="'conferencesSelect'"
          :selectString="selectString"
          :selectLabel="selectLabel"
          :options="selectOptions"
          @optionSelected="emitOptionSelected"
        ></SelectComponent>
      </div>
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import axios from "axios";
import Global from "../Globals";
import SelectComponent from "./SelectComponent";

export default {
  name: "MainComponent",
  components: {
    SelectComponent
  },
  data() {
    return {
      url: Global.url,
      conferenceRef: null,
      selectOptions: null,
      selectString: "Select",
      selectLabel: "Conference",
      urlSelect: "conferences",
      selectVisible: true
    };
  },
  mounted() {
    this.setSelect();
  },
  methods: {
    emitOptionSelected(opt) {
      this.getTeams(opt.value);
    },
    setSelect() {
      axios.get(this.url + this.urlSelect).then(
        response => {
          if (response.status === 200) {
            this.selectOptions = response.data;
          } else {
            console.log("err: ", response.status);
          }
        },
        err => {
          console.log("err", err);
        }
      );
    },
    getTeams(conference) {
      axios.get(this.url + "teams?conference=" + conference).then(
        response => {
          if (response.status === 200) {
            this.processData(conference, response.data);
          } else {
            console.log("err: ", response.status);
          }
        },
        err => {
          console.log("err", err);
        }
      );
    },
    getConferencesObject() {
      if (!localStorage.getItem("conferences")) {
        const obj = {
          selected: null,
          conferences: []
        };
        this.$store.commit("setConferences", obj);
      }
      return JSON.parse(localStorage.getItem("conferences"));
    },
    setTeamProp(teams) {
      for (let i = 0; i < teams.length; i++) {
        Object.assign(teams[i], { favorite: false, note: null });
      }
      return teams;
    },
    getConferenceExists(conf, id) {
      for (let i = 0; i < conf.length; i++) {
        if (conf[i].conference === id) return true;
      }
      return false;
    },
    setNewConference(obj, conference, teams) {
      const objTeams = this.setTeamProp(teams);
      const arrConf = {
        conference: conference,
        teams: objTeams,
        favorites: null
      };

      obj.selected = conference;
      obj.conferences.push(arrConf);
      this.setStoreValues(obj, conference, objTeams, arrConf.favorites);
    },
    setConference(obj) {
      const foundConference = obj.conferences.find(elem => elem.conference === obj.selected);
      this.setStoreValues(obj, obj.selected, foundConference.teams, foundConference.favorites);
    },
    processData(conference, teams) {
      const objConference = this.getConferencesObject();
      const conferenceExists = this.getConferenceExists(
        objConference.conferences,
        conference
      );

      if (!conferenceExists) {
        this.setNewConference(objConference, conference, teams);
      } else {
        objConference.selected = conference;
        this.setConference(objConference);
      }
    },
    setStoreValues(obj, conference, teams, favorites) {
      this.conferenceRef = conference;
      this.$router.push('/teams/' + this.conferenceRef);
      this.$store.commit("setConferences", obj);
      this.$store.commit("setConference", conference);
      this.$store.commit("setTeams", teams);
      this.$store.commit("setFavorites", favorites);
    }
  },
  watch: {
    $route(to, from) {
      this.selectVisible = to.name !== 'team';
      if (from.name === 'favorites') {
        this.$router.push('/teams/' + this.conferenceRef);
      }
    }
  }
};
</script>