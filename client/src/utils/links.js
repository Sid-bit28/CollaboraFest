import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
    {
        id: 1,
        text: 'All Events',
        path: '/',
        icons: <MdQueryStats />,
    },
    {
        id: 2,
        text: 'Add Event',
        path: 'add-event',
        icons: <FaWpforms />,
    },
    {
        id: 3,
        text: 'My Events',
        path: 'my-events',
        icons: <IoBarChartSharp />,
    },
    {
        id: 4,
        text: 'Profile',
        path: 'profile',
        icons: <ImProfile />,
    },
];

export default links;
