import { defineStore } from 'pinia';
import { format, isToday, isYesterday } from 'date-fns';

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    currentDate: new Date().toISOString().split('T')[0],
  }),

  getters: {
    weekDates() {
      const dates = [];
      const current = new Date(this.currentDate);
      current.setHours(12, 0, 0, 0);

      for (let i = -3; i <= 3; i++) {
        const date = new Date(current);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    },

    compactWeekDates() {
      const dates = [];
      const current = new Date(this.currentDate);
      current.setHours(12, 0, 0, 0);

      for (let i = -2; i <= 2; i++) {
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

    isYesterday() {
      return isYesterday(new Date(this.currentDate));
    },

    isDateSelectable: () => dateString => {
      const today = new Date().toISOString().split('T')[0];
      return dateString <= today;
    },
  },

  actions: {
    setDate(dateString) {
      this.currentDate = dateString;
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
