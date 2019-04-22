import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'student-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  @Input()
  public items: any[];

  @Input()
  public title: any;

  @Output()
    public dropEvent: EventEmitter<any> = new EventEmitter();

  drop(event: CdkDragDrop<string[]>) {
   this.dropEvent.emit(event);
  }
}
