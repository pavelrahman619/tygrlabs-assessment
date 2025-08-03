import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeCalculationService {

  getGameStartTime(): string {
    return '8:00 PM';
  }

  getRideStartTime(hours: number): string {
    // Start time is based on selected hours: 6 hours = 6:00 PM, etc.
    const startHour = 12 + hours; // 12 + 6 = 18 (6:00 PM)

    if (startHour === 12) {
      return '12:00 PM';
    } else if (startHour > 12 && startHour < 24) {
      return `${startHour - 12}:00 PM`;
    } else if (startHour >= 24) {
      const adjustedHour = startHour - 24;
      if (adjustedHour === 0) {
        return '12:00 AM';
      } else if (adjustedHour < 12) {
        return `${adjustedHour}:00 AM`;
      } else {
        return `${adjustedHour - 12}:00 PM`;
      }
    } else {
      if (startHour === 0) {
        return '12:00 AM';
      }
      return `${startHour}:00 AM`;
    }
  }

  getRideEndTime(hours: number): string {
    const gameStartHour = 20; // 8 PM
    const rideStartHour = gameStartHour - hours;
    const rideEndHour = rideStartHour + hours;
    const additionalTime = hours / 2;
    const totalExperienceEndHour = rideEndHour + Math.floor(additionalTime);
    const minutes = Math.round((additionalTime % 1) * 60);

    let finalEndHour = totalExperienceEndHour;

    if (finalEndHour >= 24) {
      finalEndHour = finalEndHour - 24;
    }

    const minutesStr =
      minutes === 0 ? '00' : minutes.toString().padStart(2, '0');

    if (finalEndHour === 0) {
      return `12:${minutesStr} AM`;
    } else if (finalEndHour <= 12) {
      if (finalEndHour === 12) {
        return `12:${minutesStr} PM`;
      }
      return `${finalEndHour}:${minutesStr} AM`;
    } else {
      return `${finalEndHour - 12}:${minutesStr} PM`;
    }
  }
}
