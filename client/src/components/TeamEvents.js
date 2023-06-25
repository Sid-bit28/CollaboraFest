import moment from 'moment';
import Wrapper from '../assets/wrappers/Event';
import { useState } from 'react';
import { FormRow } from '../components';

function TeamEvents({
    title,
    description,
    intake,
    eventSkill,
    createdAt,
    creator,
}) {
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
                                #CREATED BY : {creator}
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
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => console.log(12)}
                        >
                            Message
                        </button>
                    </div>
                </div>
            </header>
        </Wrapper>
    );
}

export default TeamEvents;
