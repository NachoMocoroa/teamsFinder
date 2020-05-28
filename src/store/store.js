import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    conferences: [],
    conference: null,
    teams: null,
    favorites: null
  },
  mutations: {
    setConference(state, conference) {
      state.conference = conference;
    },
    setTeams(state, teams) {
      state.teams = teams;
    },
    setFavorites(state, teams) {
      state.favorites = teams;
      localStorage.setItem('teamsSelected', JSON.stringify(teams));
    },
    setConferences(state, conferences) {
      state.conferences = conferences;
      localStorage.setItem('conferences', JSON.stringify(state.conferences));
    }
  },
  getters: {
    conferences: state => state.conferences,
    conference: state => state.conference,
    teams: state => state.teams,
    favorites: state => state.favorites
  }
})