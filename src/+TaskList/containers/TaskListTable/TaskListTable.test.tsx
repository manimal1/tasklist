import { fireEvent, render, waitFor } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import { Provider } from 'react-redux';

import { store } from 'state/store';
import { Task } from '+TaskList/types';
import { TaskListTable } from './TaskListTable';

const refetch = vi.fn();
vi.mock('+TaskList/services', () => {
  return { taskAction: () => ({ delete: () => Promise.resolve() }) };
});

const mockTaskList: Task[] = [
  { id: '1', title: 'title 1', is_complete: false, created_at: new Date().getTime(), user_id: '10' },
  { id: '2', title: 'title 2', is_complete: false, created_at: new Date().getTime(), user_id: '20' },
];

const renderedTaskListTable = () =>
  render(
    <Provider store={store}>
      <TaskListTable refetch={refetch} taskList={mockTaskList} isLoading={false} />
    </Provider>,
  );

describe('<TaskListTable>', () => {
  test('renders all tasks titles in task list', async () => {
    const { getByText } = renderedTaskListTable();

    expect(getByText('title 1'));
    expect(getByText('title 2'));
  });

  test('displays delete button and handles its api query and refetch function', async () => {
    vi.clearAllMocks();
    const { getByTestId } = renderedTaskListTable();

    expect(getByTestId('delete-1'));
    expect(getByTestId('delete-2'));
    expect(refetch).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('delete-1'));
    waitFor(() => expect(refetch).toHaveBeenCalledTimes(1));
  });
});
