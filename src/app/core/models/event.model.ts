// src/app/core/models/event.model.ts
class EventModel {
  constructor(
    public title: string,
    public location: string,
    public groupSize: string,
    public eventType: string,
    public price: number,
    public purpose: string,
    public viewPublic: boolean,
    public thumbnail: string,
    public description?: string,
    public editable = false,
    public _id?: string
  ) {}
}

class FormEventModel {
  constructor(
    public title: string,
    public location: string,
    public viewPublic: boolean,
    public description?: string
  ) {}
}

export { EventModel, FormEventModel };
