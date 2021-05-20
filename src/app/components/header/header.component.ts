import { EventEmitter, Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() limit?: number;
  @Output() limitChange = new EventEmitter<number | undefined>();
  limits = [10, 50, undefined];

  onLimitChange(target: EventTarget | null) {
    const { value } = target as HTMLInputElement;

    this.limitChange.emit(value ? +value : undefined);
  }
}
