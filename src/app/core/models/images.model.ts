export class Image {
  constructor(
    public _id?: string,
    public caption = "",
    public path = "",
    public description = "",
    public editable = false
  ) {}
}
