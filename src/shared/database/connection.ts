// import TodoRepository from './repositories/TodoRepository';
import { Todo } from './entities/Todo';
import { createConnection } from 'typeorm';
// TODO: read config from ormconfig.json and override database field

createConnection()
  .then(async conn => {
    console.log(conn.isConnected);
    console.log(conn.options);
    const repo = conn.getRepository(Todo);
    
    let todo: Todo = {
      title: 'New Todo',
      done: false,
    };

    await repo.save(todo);
    console.log('Todo has been saved');
    
  })
  .catch(console.log);

// if (isDevEnvironment) {
//   createConnection()
// } else {
//   fetch('ormconfig.json')
//     .then((res) => res.json())
//     .then((ormConfig: ConnectionOptions) => {
//       const options: ConnectionOptions = ormConfig;
//       options.database = '';
//       createConnection({
//         ...ormConfig,
//         database: ''
//       })
//     })
// }
