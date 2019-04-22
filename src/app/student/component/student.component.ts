import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'student-form',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  public allData = [
    {
      "Sem": "Курс 1 Семестр 1",
      "disciplines": [
        "Мат Анализ",
        "Физкультура",
        "Руский  язык",
        "Английский",
        "Информатика"
      ]
    },
    {
      "Sem": "Курс 1 Семестр 2",
      "disciplines": [
        "Алгебра",
        "Дискретная математика",
        "Базы Данных",
        "Философия",
        "Психология"
      ]
    },
    {
      "Sem": "Курс 2 Семестр 1",
      "disciplines": [
        "Ассемблер",
        "Теория графов",
        "Мат Логика",
        "Мат статистика",
        "ОБЖ"
      ]
    },
    {
      "Sem": "Курс 2 Семестр 2",
      "disciplines": [
        "Ассемблер",
        "Теория графов",
        "Мат Логика",
        "Мат статистика",
        "ОБЖ"
      ]
    },
    {
      "Sem": "Курс 3 Семестр 1",
      "disciplines": [
        "Ассемблер",
        "Теория графов",
        "Мат Логика",
        "Мат статистика",
        "ОБЖ"
      ]
    },
    {
      "Sem": "Курс 3 Семестр 2",
      "disciplines": [
        "Ассемблер",
        "Теория графов",
        "Мат Логика",
        "Мат статистика",
        "ОБЖ"
      ]
    },
    {
      "Sem": "Курс 4 Семестр 1",
      "disciplines": [
        "Ассемблер",
        "Теория графов",
        "Мат Логика",
        "Мат статистика",
        "ОБЖ"
      ]
    },
    {
      "Sem": "Курс 4 Семестр 2",
      "disciplines": [
        "Ассемблер",
        "Теория графов",
        "Мат Логика",
        "Мат статистика",
        "ОБЖ"
      ]
    }
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
