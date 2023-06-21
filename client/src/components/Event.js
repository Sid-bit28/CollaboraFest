import moment from 'moment';

function Event({ title, createdAt }) {
    let date = moment(createdAt);
    date = date.format('MMM d, YYYY');
    return (
        <h5>
            {title}
            {date}
        </h5>
    );
}

export default Event;
