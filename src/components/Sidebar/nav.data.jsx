import { LuListTodo } from 'react-icons/lu';
import { LiaStickyNoteSolid } from 'react-icons/lia';
import { IoSettingsOutline } from 'react-icons/io5';

export const navElements = [
  {
    title: 'Todolist',
    link: '/todo',
    icon: (
      <LuListTodo
        size={32}
        color="#ffffff"
      />
    ),
  },
  {
    title: 'Notes',
    link: '/notes',
    icon: (
      <LiaStickyNoteSolid
        size={32}
        color="#ffffff"
      />
    ),
  },
  {
    title: 'Settings',
    link: '/settings',
    icon: (
      <IoSettingsOutline
        size={32}
        color="#ffffff"
      />
    ),
  },
];
