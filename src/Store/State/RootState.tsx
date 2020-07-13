interface IInitState{
  myTodoList: Object[],
}

export const initState:IInitState = {
  myTodoList: [
    {id: 0, work: 'Đi học'},
    {id: 1, work: 'Đi làm'}
  ]
}
