class Todo {

    static PRIORITY = {
        low: { order: 0, name: 'Bassa', color: '#498467', },
        medium: { order: 1, name: 'Media', color: '#EFD780' },
        high: { order: 2, name: 'Alta', color: 'darkorange' },
        veryHigh: { order: 3, name: 'Molto Alta', color: 'red' },
    }

    constructor(creationDate = new Date(), name, tags = [], priority = Todo.PRIORITY.low) {
        this._creationDate = creationDate.getTime();
        this.name = name;
        this.tags = tags;
        this.priority = priority;
    }


    set creationDate(date) {
        this._creationDate = date.getTime();
    }


    get creationDate() {
        return new Date(this._creationDate);
    }


    static fromDbObj(obj) { 
        const todo = new Todo(new Date(obj.creationDate * 1000), obj.name, obj.tags);
        todo.id = obj.id;
        if (obj.priority === 1) {
            todo.priority = Todo.PRIORITY.medium;
        } else if (obj.priority === 2) {
            todo.priority = Todo.PRIORITY.high;
        } else if (obj.priority === 3) {
            todo.priority = Todo.PRIORITY.veryHigh;
        }
        return todo;
    }

      static orderTodoByPriority(t1, t2) {
        return t2.priority.order - t1.priority.order;
      }
}