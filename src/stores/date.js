import { defineStore } from 'pinia';
import { format, isToday } from 'date-fns';

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    currentDate: new Date().toISOString().split('T')[0],
  }),

  getters: {
    weekDates: state => {
      const dates = new Set();
      for (let i = -3; i <= 3; i++) {
        const date = new Date(state.currentDate);
        date.setDate(date.getDate() + i);
        dates.add(date.toISOString().split('T')[0]);
      }
      return Array.from(dates);
    },

    formattedDate: state => {
      return format(new Date(state.currentDate), 'MMMM d, yyyy');
    },

    isToday: state => {
      return isToday(new Date(state.currentDate));
    },

    isDateSelectable(date) {
      const dateString = date.toISOString().split('T')[0];
    },
  },

  actions: {
    setDate(date) {
      this.currentDate = date;
    },

    nextDay() {
      const date = new Date(this.currentDate);
      date.setDate(date.getDate() + 1);
      this.currentDate = date.toISOString().split('T')[0];
    },

    previousDay() {
      const date = new Date(this.currentDate);
      date.setDate(date.getDate() - 1);
      this.currentDate = date.toISOString().split('T')[0];
    },

    goToToday() {
      this.currentDate = new Date().toISOString().split('T')[0];
    },

    setDateFromRouter(routeDate) {
      this.currentDate = routeDate;
    },
    formatDate(date) {
      return {
        date: date,
        dayName: format(new Date(date), 'EEE'),
        dayNumber: format(new Date(date), 'd'),
        isToday: isToday(new Date(date)),
        isSelected: this.currentDate === date,
      };
    },
  },
});
