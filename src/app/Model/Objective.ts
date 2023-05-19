export class Objective {
  id?: number;
  title?: string;
  description?: string;
  completeByDate?: Date;
  completedDate?: Date;
  createdDate?: Date;
  updatedDate?: Date;

  constructor(id?: number, title?: string, description?: string, completeByDate?: Date, completedDate?: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completeByDate = completeByDate;
    this.completedDate = completedDate;
  }

}
