import { defineStore } from 'pinia';

export const useHabitsStore = defineStore('habitsStore', {
  state: () => ({
    habits: [],
    completions: {},
  }),
  actions: {
    addHabit(name) {
      this.habits.push({ id, name, created_at });
    },
    toggleHabitCompletion(habitId, date) {
      if (this.completions[date]?.[habitId]) {
      }
    },
    loadFromLocalStorage() {
      const storedData = localStorage.getItem('habits');
      if (storedData) {
        this.habits = JSON.parse(storedData);
      } else {
        this.habits = [];
      }
      const storedCompletions = localStorage.getItem('completions');
      if (storedCompletions) {
        this.completions = JSON.parse(storedCompletions);
      } else {
        this.completions = {};
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('habits', JSON.stringify(this.habits));
      localStorage.setItem('completions', JSON.stringify(this.completions));
    },
  },
  getters: {
    getHabitsForDate(date) {
      const dateString = date.toISOString().split('T')[0];
      return this.habits.filter(habit => habit.created_at <= dateString);
    },
    isHabitCompleted(date, habitId) {},
  },
});
