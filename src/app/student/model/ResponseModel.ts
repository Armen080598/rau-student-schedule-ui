export class ResponseModel {
  semester: string;
  discipline: DisciplineModel;
}

class DisciplineModel {
  id: string;
  name: string;
  time: string;
  exam: boolean;
}
