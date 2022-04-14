import { render } from '@testing-library/react';
import { describe, test, vi } from 'vitest';
import { Provider } from 'react-redux';

import { store } from 'state/store';
import { Task } from '+TaskList/types';
import { TaskListTable } from './TaskListTable';

const mockTaskList: Task[] = [
  { id: '1', title: 'title 1', is_complete: false, created_at: new Date().getTime(), user_id: '10' },
  { id: '2', title: 'title 2', is_complete: false, created_at: new Date().getTime(), user_id: '20' },
];

describe('<TaskListTable>', () => {
  test('renders all tasks titles in task list with action buttons', async () => {
    const refetch = vi.fn();
    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <TaskListTable refetch={refetch} taskList={mockTaskList} isLoading={false} />
      </Provider>,
    );

    expect(getByText('title 1'));
    expect(getByText('title 2'));
    expect(getByTestId('delete-1'));
    expect(getByTestId('delete-2'));
    expect(getByTestId('edit-1'));
    expect(getByTestId('edit-2'));
  });
});
