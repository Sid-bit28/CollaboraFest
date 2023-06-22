import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import { Loading, Event, PageButtonContainer } from '../components';
import Wrapper from '../assets/wrappers/JobsContainer';

function EventsContainer() {
    const {
        getEvents,
        events,
        isLoading,
        page,
        totalEvents,
        search,
        searchEventSkill,
        sort,
        numOfPages,
    } = useAppContext();

    useEffect(() => {
        getEvents();
    }, [page, search, searchEventSkill, sort]);

    if (isLoading) {
        return <Loading center />;
    }

    if (events.length === 0) {
        return (
            <Wrapper>
                <h2>No Events</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalEvents} event{events.length > 1 && 's'} found.
            </h5>
            <div className="events">
                {events.map((event) => {
                    return <Event apply="yes" key={event._id} {...event} />;
                })}
            </div>
            {numOfPages > 1}
            <PageButtonContainer />
            {/* pagination daalne ka soche hain */}
        </Wrapper>
    );
}

export default EventsContainer;
