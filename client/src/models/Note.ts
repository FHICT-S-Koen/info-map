export default class Note {
  private id!: string
  private title!: string

  constructor(id: string, title: string) {
    this.id = id
    this.title = title
  }

  public get getId(): string {
    return this.id
  }

  public set setId(id: string) {
    this.id = id;
  }

  public get getTitle(): string {
    return this.title
  }

  public set setTitle(title: string) {
    this.title = title;
  }

}