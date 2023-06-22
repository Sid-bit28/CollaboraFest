import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Event';

function Event({
    edit,
    _id,
    title,
    description,
    intake,
    eventSkill,
    createdAt,
}) {
    const { user, setEditEvent, deleteEvent } = useAppContext();

    // Date formated using momentjs 👇
    let date = moment(createdAt);
    date = date.format('MMM d, YYYY');

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
                        <p className="text-gray-700 text-base">{description}</p>
                    </div>
                    <div>
                        <div>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                                #SKILL : {eventSkill}
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                                #CREATED BY : {user.name}
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
                </div>
            </header>
        </Wrapper>
    );
}

export default Event;
