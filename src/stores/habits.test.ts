import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useHabitsStore } from './habits';

describe('Habits Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  describe('getHabitsForDate', () => {
    it('should return only habits that are active for a given date', () => {
      const store = useHabitsStore();
      const today = '2025-05-14';
      const tomorrow = '2025-05-15';

      store.addHabit('Test Habit 1', today);
      store.addHabit('Test Habit 2', tomorrow);

      const todayHabits = store.getHabitsForDate(today);
      expect(todayHabits).toHaveLength(1);
      expect(todayHabits[0].name).toBe('Test Habit 1');

      const tomorrowHabits = store.getHabitsForDate(tomorrow);
      expect(tomorrowHabits).toHaveLength(2);
    });

    it('should not return stopped habits', () => {
      const store = useHabitsStore();
      const today = '2025-05-14';
      const tomorrow = '2025-05-15';

      store.addHabit('Test Habit', today);

      const habit = store.habits[0];
      store.toggleHabitStatus(habit.id, today);

      const tomorrowHabits = store.getHabitsForDate(tomorrow);
      expect(tomorrowHabits).toHaveLength(0);
    });
  });

  describe('toggleHabitCompletion', () => {
    it('should correctly toggle habit completion status', () => {
      const store = useHabitsStore();
      const today = '2025-05-14';

      store.addHabit('Test Habit', today);
      const habit = store.habits[0];

      expect(store.isHabitCompleted(today, habit.id)).toBe(false);

      store.toggleHabitCompletion(habit.id, today);
      expect(store.isHabitCompleted(today, habit.id)).toBe(true);

      store.toggleHabitCompletion(habit.id, today);
      expect(store.isHabitCompleted(today, habit.id)).toBe(false);
    });
  });
});
