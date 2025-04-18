import { defineStore } from 'pinia';

export const useHabitsStore = defineStore('habitsStore', {
  state: () => ({
    habits: [],
    completions: {},
  }),
  getters: {
    getHabitsForDate: state => dateString => {
      return state.habits.filter(habit => {
        return habit.created_at <= dateString;
      });
    },
    isHabitCompleted: state => (date, habitId) => {
      return Boolean(state.completions[date]?.[habitId]);
    },
  },
  actions: {
    addHabit(name, dateString) {
      const habit = {
        id: Date.now().toString(),
        name: name.trim(),
        created_at: dateString,
        stopped_at: null,
      };
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

    editHabit(habitId, newName) {
      const habitIndex = this.habits.findIndex(h => h.id === habitId);

      if (habitIndex !== -1) {
        this.habits[habitIndex] = {
          ...this.habits[habitIndex],
          name: newName.trim(),
        };
        this.saveToLocalStorage();
        return true;
      }
      return false;
    },

    toggleHabitStatus(habitId, date) {
      const habit = this.habits.find(h => h.id === habitId);
      if (habit) {
        habit.stopped_at = habit.stopped_at ? null : date;
        this.saveToLocalStorage();
      }
    },

    removeHabit(habitId) {
      this.habits = this.habits.filter(habit => habit.id !== habitId);
      Object.keys(this.completions).forEach(date => {
        delete this.completions[date][habitId];

        if (Object.keys(this.completions[date]).length === 0) {
          delete this.completions[date];
        }
      });
      this.saveToLocalStorage();
    },

    loadFromLocalStorage() {
      try {
        const storedData = localStorage.getItem('habits-data');
        if (storedData) {
          const data = JSON.parse(storedData);
          this.habits = data.habits || [];
          this.completions = data.completions || {};
        }
      } catch (error) {
        console.error('Failed to load habits', error);
        this.habits = [];
        this.completions = {};
      }
    },

    saveToLocalStorage() {
      try {
        localStorage.setItem(
          'habits-data',
          JSON.stringify({ habits: this.habits, completions: this.completions })
        );
      } catch (error) {
        console.error('Failed to save habits', error);
      }
    },
  },
});
