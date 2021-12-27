import { EntityRepository, Repository, getCustomRepository } from "typeorm";
import { Todo } from "../entities/Todo";

@EntityRepository(Todo)
export default class TodoRepository extends Repository<Todo> {

}