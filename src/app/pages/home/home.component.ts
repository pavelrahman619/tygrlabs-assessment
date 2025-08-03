import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { ProgressHeaderComponent } from './components/progress-header/progress-header.component';
import { TimeDisplayComponent } from './components/time-display/time-display.component';
import { HourSliderComponent } from './components/hour-slider/hour-slider.component';
import { TimeCalculationService } from '../../services/time-calculation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressHeaderComponent, TimeDisplayComponent, HourSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private timeService = inject(TimeCalculationService);

  selectedHours = signal(6);

  // Computed values for time display
  gameStartTime = computed(() => this.timeService.getGameStartTime());
  rideStartTime = computed(() => this.timeService.getRideStartTime(this.selectedHours()));
  rideEndTime = computed(() => this.timeService.getRideEndTime(this.selectedHours()));

  onHoursChanged(hours: number): void {
    this.selectedHours.set(hours);
  }
}
