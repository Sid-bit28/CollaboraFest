import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Event';

function Event({ _id, title, description, intake, eventSkill, createdAt }) {
    const { setEditEvent, deleteEvent } = useAppContext();

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
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            #SKILLS
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
                            {eventSkill}
                        </span>
                        <div className="flex items-center">
                            <div className="text-sm">
                                <p className="text-gray-900 leading-none">
                                    Jonathan Reinink
                                </p>
                                <p className="text-gray-600">{date}</p>
                            </div>
                        </div>
                    </div>
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
                </div>
            </header>
        </Wrapper>
    );
}

export default Event;
