import { Col, Row, Input, Button, Select, Tag } from 'antd';
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { addTodo } from '../../redux/action';
import { v4 as uuidv4} from 'uuid';
import { useState } from 'react';
import { todoListSelectors, searchTextSelector } from '../../redux/selectors';

export default function TodoList() {
  const [todoName, setTodoName]=useState('');
  const [priority, setPriority]=useState('Medium');
  const searchText=useSelector(searchTextSelector);
  const todoList=useSelector(todoListSelectors);
  console.log(todoList, searchText );
  const dispatch=useDispatch();
  const handleAddButtonClick= ()=>{
    dispatch(addTodo(
      {
        id: uuidv4(),
        name: todoName,
        priority: priority,
        completed: false,
      }
    ))
    setTodoName('');
    setPriority('Medium')
  }
  const hadleInputChange=(e)=>{
    setTodoName(e.target.value);
  }
  const hadlePriorityChange=(value)=>{
    setPriority(value)
  }
  return (
    <Row style={{ height: 'calc(100% - 40px)' }}>
      <Col span={24} style={{ height: 'calc(100% - 40px)', overflowY: 'auto' }}>
        {todoList.map(todo=><Todo key={todo.id} name={todo.name} prioriry={todo.priority} />)}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: 'flex' }} compact>
          <Input value={todoName} onChange={hadleInputChange} />
          <Select defaultValue="Medium" value={priority} onChange={hadlePriorityChange}>
            <Select.Option value='High' label='High'>
              <Tag color='red'>High</Tag>
            </Select.Option>
            <Select.Option value='Medium' label='Medium'>
              <Tag color='blue'>Medium</Tag>
            </Select.Option>
            <Select.Option value='Low' label='Low'>
              <Tag color='gray'>Low</Tag>
            </Select.Option>
          </Select>
          <Button type='primary' onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
