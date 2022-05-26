class Todo {

    static PRIORITY = {
        low: { order: 0, name: 'Bassa', color: 'green', },
        medium: { order: 1, name: 'Media', color: '#FAC748' },
        high: { order: 2, name: 'Alta', color: 'darkorange' },
        veryHigh: { order: 3, name: 'Molto alta', color: 'red' },
    }

    constructor(name, creationDate = new Date(), tags = [], priority = Todo.PRIORITY.low) {
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


    set priorityOrder(order){
        if (order === 0) {
            this.priority = Todo.PRIORITY.low;
        } else if (order === 1) {
            this.priority = Todo.PRIORITY.medium;
        }else if (order === 2) {
            this.priority = Todo.PRIORITY.high;
        } else if (order === 3) {
            this.priority = Todo.PRIORITY.veryHigh;
        }
    }

    static fromDbObj(obj) { 
        const todo = new Todo( obj.name, new Date(obj.creationDate * 1000), obj.tags);
        todo.id = obj.id;
        todo.priorityOrder = obj.priority;
        return todo;
    }

     toDbObj() { 
        const obj = {name: this.name, tags: this.tags, priority: this.priority.order, creationDate: this._creationDate/1000 };
        return obj;
    }

      static orderTodoByPriority(t1, t2) {
        return t2.priority.order - t1.priority.order;
      }
}