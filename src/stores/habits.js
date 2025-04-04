import { defineStore } from 'pinia';

export const useHabitsStore = defineStore('habitsStore', {
  state: () => ({
    habits: [],
    completions: {},
  }),
  getters: {
    getHabitsForDate(date) {
      const dateString = date.toISOString().split('T')[0];
      return this.habits.filter(habit => habit.created_at <= dateString);
    },
    isHabitCompleted: state => (date, habitId) => {
      return Boolean(state.completions[date]?.[habitId]);
    },
  },
  actions: {
    addHabit(name, date) {
      const habit = {
        id: Date.now().toString(),
        name: name.trim(),
        created_at: date,
      };
      console.log('Adding habit:', habit);
      this.habits.push(habit);
      this.saveToLocalStorage();
    },
    toggleHabitCompletion(habitId, date) {
      if (!this.completions[date]) {
        this.completions[date] = {};
      }
      this.completions[date][habitId] = !this.completions[date][habitId];
      this.saveToLocalStorage();
    },
    removeHabit(habitId) {
      this.habits = this.habits.filter(habit => habit.id !== habitId);
      Object.keys(this.completions).forEach(date => {
        if (this.completions[date][habitId]) {
          delete this.completions[date][habitId];
        }
      });
      this.saveToLocalStorage();
    },
    loadFromLocalStorage() {
      const storedData = localStorage.getItem('habits-data');
      if (storedData) {
        const data = JSON.parse(storedData);
        this.habits = data.habits || [];
        this.completions = data.completions || {};
      }
    },
    saveToLocalStorage() {
      localStorage.setItem(
        'habits-data',
        JSON.stringify({ habits: this.habits, completions: this.completions })
      );
    },
  },
});
