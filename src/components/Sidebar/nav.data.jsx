import { LuListTodo } from 'react-icons/lu';
import { LiaStickyNoteSolid } from 'react-icons/lia';
import { IoSettingsOutline } from 'react-icons/io5';
import { NotebookTabs } from 'lucide-react';

export const navElements = [
  {
    title: 'Todolist',
    link: '/todo',
    icon: LuListTodo,
  },
  // {
  //   title: 'Lists',
  //   link: '/lists',
  //   icon: NotebookTabs,
  // },
  {
    title: 'Notes',
    link: '/notes',
    icon: LiaStickyNoteSolid,
  },
  {
    title: 'Settings',
    link: '/settings/profile',
    icon: IoSettingsOutline,
  },
];
