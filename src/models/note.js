export default class Note {
  constructor({
    id,
    title,
    desc,
    createdAt,
    editedAt,
    categories,
    author,
    pictures,
    status
  } = {}) {
    this.id = id || "";
    this.title = title || "";
    this.desc = desc || "";
    this.categories = categories || [];
    this.author = author || "";
    this.pictures = pictures || [];
    this.status = status || "Active";
    this.createdAt = createdAt ? new Date(createdAt) : null;
    this.editedAt = editedAt ? new Date(editedAt) : null;
  }
}
