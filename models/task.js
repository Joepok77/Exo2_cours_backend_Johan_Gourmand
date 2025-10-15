/**
 Cette classe définit la structure des données d'une tâche stockée dans l'application
 */
class Task {
  static idCounter = 1;

  constructor(title, description = '') {
    this.id = Task.idCounter++;
    this.title = title;
    this.description = description;
    this.createdAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt.toISOString()
    };
  }
}

module.exports = Task;