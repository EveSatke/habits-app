import { defineStore } from 'pinia';
import { format, isToday } from 'date-fns';

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    currentDate: new Date().toISOString().split('T')[0],
  }),

  getters: {
    weekDates() {
      const dates = [];
      const current = new Date(this.currentDate);

      for (let i = -3; i <= 3; i++) {
        const date = new Date(current);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    },

    formattedDate() {
      return format(new Date(this.currentDate), 'MMMM d, yyyy');
    },

    isToday() {
      return isToday(new Date(this.currentDate));
    },

    isDateSelectable(date) {
      const dateString = date.toISOString().split('T')[0];
    },
  },

  actions: {
    setDate(dateString) {
      this.currentDate = dateString;
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
    formatDate(dateString) {
      const date = new Date(dateString);
      return {
        date: dateString,
        dayName: format(date, 'EEE'),
        dayNumber: format(date, 'd'),
        isToday: isToday(date),
        isSelected: this.currentDate === dateString,
      };
    },
  },
});
