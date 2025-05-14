import { defineStore } from 'pinia';

export interface Habit {
  id: string;
  name: string;
  created_at: string;
  stopped_at?: string | null;
}

export const useHabitsStore = defineStore('habitsStore', {
  state: () => ({
    habits: [] as Habit[],
    completions: {} as Record<string, Record<string, boolean>>,
  }),
  getters: {
    getHabitsForDate:
      state =>
      (date: string): Habit[] => {
        return state.habits.filter(habit => {
          return habit.created_at <= date;
        });
      },
    isHabitCompleted:
      state =>
      (date: string, habitId: string): boolean => {
        return Boolean(state.completions[date]?.[habitId]);
      },
    doesHabitExist:
      state =>
      (name: string): boolean => {
        return state.habits.some(
          habit => habit.name.toLowerCase() === name.toLowerCase().trim()
        );
      },
  },
  actions: {
    addHabit(name: string, date: string): void {
      const habit: Habit = {
        id: Date.now().toString(),
        name: name.trim(),
        created_at: date,
        stopped_at: null,
      };
      this.habits.push(habit);
      this.saveToLocalStorage();
    },

    toggleHabitCompletion(habitId: string, date: string): void {
      if (!this.completions[date]) {
        this.completions[date] = {};
      }
      this.completions[date][habitId] = !this.completions[date][habitId];
      this.saveToLocalStorage();
    },

    editHabit(habitId: string, newName: string): boolean {
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

    toggleHabitStatus(habitId: string, date: string): void {
      const habit = this.habits.find(h => h.id === habitId);
      if (habit) {
        habit.stopped_at = habit.stopped_at ? null : date;
        this.saveToLocalStorage();
      }
    },

    removeHabit(habitId: string): void {
      this.habits = this.habits.filter(habit => habit.id !== habitId);
      Object.keys(this.completions).forEach(date => {
        delete this.completions[date][habitId];

        if (Object.keys(this.completions[date]).length === 0) {
          delete this.completions[date];
        }
      });
      this.saveToLocalStorage();
    },

    loadFromLocalStorage(): void {
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

    saveToLocalStorage(): void {
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
