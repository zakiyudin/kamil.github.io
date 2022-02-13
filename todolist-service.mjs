export class TodoListService{
    todoList = ["Zaki", "Kamil", "Majd"];

    getJsonTodoList(){
        return JSON.stringify({
            code : 200,
            status : "OK",
            data : this.todoList.map((value, index) => {
                return {
                    id : index,
                    todo : value
                }
            })
        });
    }


    getTodoList(req, res){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(this.getJsonTodoList());
        res.end();
    }

    createTodoList(req, res){
        req.addListener('data', (chunk) => {
            const body = JSON.parse(chunk.toString());
            this.todoList.push(body.todo);

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(this.getJsonTodoList());
            res.end();
        });
    }

    updateTodoList(req, res){
        req.addListener('data', (chunk) => {
            const body = JSON.parse(chunk.toString());
            if(this.todoList[body.id]){
                this.todoList[body.id] = body.todo;
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(this.getJsonTodoList());
            res.end();
        });
    }

    deleteTodoList(req, res){
        req.addListener('data', (chunk) => {
            const body = JSON.parse(chunk.toString());
            if(this.todoList[body.id]){
                this.todoList.splice(body.id, 1);
            }

            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(this.getJsonTodoList());
            res.end();
        });
    }
}