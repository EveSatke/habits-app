import { defineStore } from 'pinia';
import { format, isToday, isYesterday } from 'date-fns';

export const useDateStore = defineStore('dateStore', {
  state: () => ({
    currentDate: new Date().toISOString().split('T')[0],
  }),

  getters: {
    weekDates() {
      const dates: string[] = [];
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
      const dates: string[] = [];
      const current = new Date(this.currentDate);
      current.setHours(12, 0, 0, 0);

      for (let i = -2; i <= 2; i++) {
        const date = new Date(current);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    },

    formattedDate(): string {
      return format(new Date(this.currentDate), 'MMMM d, yyyy');
    },

    isToday(): boolean {
      return isToday(new Date(this.currentDate));
    },

    isYesterday(): boolean {
      return isYesterday(new Date(this.currentDate));
    },

    isDateSelectable:
      () =>
      (date: string): boolean => {
        const today = new Date().toISOString().split('T')[0];
        return date <= today;
      },
  },

  actions: {
    setDate(date: string) {
      this.currentDate = date;
    },

    setDateFromRouter(routeDate: string) {
      this.currentDate = routeDate;
    },
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return {
        date: dateString,
        dayName: format(date, 'EEE'),
        dayNumber: format(date, 'd'),
        monthName: format(date, 'MMM'),
        isToday: isToday(date),
        isSelected: this.currentDate === dateString,
      };
    },
  },
});
