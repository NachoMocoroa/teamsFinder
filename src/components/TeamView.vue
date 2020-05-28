<template>
  <section v-if="teamData">
    <div class="max-w-lg shadow-lg rounded overflow-hidden m-4 sm:flex mx-auto border-solid border-2 border-gray-300">
      <div
        class="h-24 sm:h-auto sm:w-24 md:w-36 md:h-36 flex-none bg-contain bg-center bg-no-repeat rounded rounded-t sm:rounded sm:rounded-l text-center overflow-hidden m-2 sm:m-4 sm:mr-2"
        :style="teamImage"
      ></div>
      <div class="w-full px-6 py-4">
        <h1 class="mb-2 font-black text-3xl">{{ teamData.school }}</h1>
        <h2 class="mb-2 font-black text-base pt-4">{{ informationText }}</h2>
        <section class="flex flex-row items-center justify-between leading-tight">
          <p class="text-sm"><strong>{{ identificatorText }}:</strong> {{ teamData.id }}</p>
          <p class="text-sm"><strong>{{ abbreviationText }}:</strong> {{ teamData.abbreviation }}</p>
        </section>
        <section class="flex flex-row items-center justify-between leading-tight pt-4">
          <p class="text-sm"><strong>{{ conferenceText }}:</strong> {{ teamData.conference }}</p>
          <p class="text-sm"><strong>{{ divisionText }}:</strong> {{ teamData.division }}</p>
        </section>
        <section class="flex flex-row items-center justify-between leading-tight pt-4">
          <p class="text-sm"><strong>{{ mascotText }}:</strong> {{ teamData.mascot }}</p>
        </section>
        <h2 class="mb-2 font-black text-base pt-4">{{ colorsText }}</h2>
        <section class="flex flex-row items-center justify-start leading-tight pb-4">
          <div class="flex flex-col items-center justify-start leading-tight pr-2">
            <p class="mb-2 font-black text-xs">{{ principalColorText }}</p>
            <div class="rounded-full h-6 w-6 flex items-center justify-center border-solid border-2 border-gray-300" :style="teamColor"></div>
          </div>
          <div class="flex flex-col items-center justify-start leading-tight pl-2">
            <p class="mb-2 font-black text-xs">{{ alternativeColorText }}</p>
            <div class="rounded-full h-6 w-6 flex items-center justify-center border-solid border-2 border-gray-300" :style="teamSecondColor"></div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TeamView",
  data() {
    return {
      teamData: null,
      teamColor: null,
      teamSecondColor: null,
      teamImage: null,
      informationText: "Information",
      identificatorText: "Identificator",
      conferenceText: "Conference",
      abbreviationText: "Abbreviation",
      divisionText: "Division",
      mascotText: "Mascot",
      colorsText: "Colors",
      principalColorText: "Principal",
      alternativeColorText: "Alternative"
    };
  },
  mounted() {
    const teamId = this.$route.params.id;
    this.getTeam(teamId);
  },
  methods: {
    getTeam(teamId) {
      const teamFound = this.$store.getters.teams.find(elem => elem.id === teamId);
      if (teamFound) {
        this.teamData = teamFound;
        this.teamColor = "backgroundColor: " + this.teamData.color + ";";
        this.teamSecondColor = "backgroundColor: " + this.teamData.alt_color + ";";
        this.teamImage = "backgroundImage: url(" + this.teamData.logos[0] + ")"
      }
    }
  }
};
</script>