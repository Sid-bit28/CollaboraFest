import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats, MdPendingActions } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { SiMicrosoftteams } from 'react-icons/si';

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
        id: 5,
        text: 'Pending Req',
        path: 'pending-requests',
        icons: <MdPendingActions />,
    },
    {
        id: 6,
        text: 'My Teams',
        path: 'my-teams',
        icons: <SiMicrosoftteams />,
    },
    {
        id: 4,
        text: 'Profile',
        path: 'profile',
        icons: <ImProfile />,
    },
];

export default links;
