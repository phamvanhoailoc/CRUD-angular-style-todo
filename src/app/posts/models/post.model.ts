export class Post {
  id: number | undefined;
  title: string;
  body: string;

  constructor(_id: number | undefined, _title: string, _body: string) {
    this.id = _id;
    this.title = _title;
    this.body = _body;
  }

  get _id(): number {
    return this._id;
  }

  get _title(): string {
    return this._title;
  }

  set _title(newTitle: string) {
    this.title = newTitle;
  }

  get _body(): string {
    return this._body;
  }

  set _body(newBody: string) {
    this.body = newBody;
  }
}
