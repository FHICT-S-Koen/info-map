export default class Map {
  private id!: string
  private userId!: string

  constructor(userId: string) {
    this.userId = userId
  }

  public get getId(): string {
    return this.id
  }

  public set setId(id: string) {
    this.id = id
  }

  public get getUserId(): string {
    return this.userId
  }

  public set setUserId(userId: string) {
    this.userId = userId
  }
}