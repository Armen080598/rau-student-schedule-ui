import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'student-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {
  @Input()
  set items(items: any[]){
    this._items = items.map(item => {
      const examText = item.exam ? 'Экзамен' : 'Зачёт';
      if(item.time){
        return `${item.name} (${item.time} часов,${examText})`;
      } else {
        return `${item.name} (${examText})`;
      }
    });
  }
  get items(){
    return this._items;
  }
  public _items: any[];

  @Input()
  public title: any;

  @Output()
    public dropEvent: EventEmitter<any> = new EventEmitter();

  drop(event: CdkDragDrop<string[]>) {
   this.dropEvent.emit(event);
  }
}
