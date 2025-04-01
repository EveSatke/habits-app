import { defineStore } from 'pinia';

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    currentDate: new Date(),
  }),
  actions: {
    setDate(date) {
      this.currentDate = date;
    },
    nextDay() {},
    previousDay() {},
  },
  getters: {
    weekdates() {
      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(this.currentDate);
      }
    },
    isDateSelectable(date) {
      const dateString = date.toISOString().split('T')[0];
    },
  },
});
