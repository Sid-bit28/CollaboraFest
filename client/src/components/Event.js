import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Event';
import { FormRow } from '../components';
import { useState } from 'react';

function Event({
    edit,
    _id,
    title,
    description,
    intake,
    eventSkill,
    createdAt,
    creator,
    apply,
    pending,
    message,
    name,
}) {
    const { setEditEvent, deleteEvent, sendRequest } = useAppContext();

    const [msg, handleMsgChange] = useState('Message..');

    // Date formated using momentjs 👇
    let date = moment(createdAt);
    date = date.format('MMM d, YYYY');

    const handleChange = (e) => {
        handleMsgChange(e.target.value);
    };

    let content = description;
    let contentt = creator;
    if (pending === 'yes') {
        content = message;
        contentt = name;
    }

    return (
        <Wrapper>
            <header>
                <div>
                    <header>
                        <div className="font-bold text-xl mb-2 uppercase info">
                            <span>{title}</span>
                        </div>
                    </header>
                    <div className="content">
                        <p className="text-gray-700 text-base">{content}</p>
                    </div>
                    <div>
                        <div>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                                #SKILL : {eventSkill}
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                                {pending === 'yes'
                                    ? '#SEND BY: '
                                    : '#CREATED BY : '}
                                {contentt}
                            </span>
                        </div>
                        <div>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                #INTAKE: {intake}
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                                #CREATED AT : {date}
                            </span>
                        </div>
                    </div>
                    {edit === 'yes' ? (
                        <div className="footer">
                            <div className="actions">
                                <Link
                                    to="/add-event"
                                    className="btn edit-btn"
                                    onClick={() => setEditEvent(_id)}
                                >
                                    Edit
                                </Link>
                                <button
                                    type="button"
                                    className="btn delete-btn"
                                    onClick={() => deleteEvent(_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {apply === 'yes' ? (
                        <div>
                            <FormRow value={msg} handleChange={handleChange} />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => sendRequest({ _id, msg })}
                            >
                                Apply
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                    {pending === 'yes' ? (
                        <div className="footer">
                            <div className="actions">
                                <Link
                                    to="/add-event"
                                    className="btn edit-btn"
                                    onClick={() => setEditEvent(_id)}
                                >
                                    Accept
                                </Link>
                                <button
                                    type="button"
                                    className="btn delete-btn"
                                    onClick={() => deleteEvent(_id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </header>
        </Wrapper>
    );
}

export default Event;
