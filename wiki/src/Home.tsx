import React from 'react';

const Home: React.FC = (props: any) => {
    return (
        <div>
            <p>
                This wiki serves as a reference for various technological principals and configuration procedures that I have collected over the years as a software engineer
            </p>
            <p>
                If you have any questions about any of the content or requests for more information, feel free to contact me at {<a href="mailto:oleg3790@gmail.com">oleg3790@gmail.com</a>}
            </p>
        </div>
    );
}

export default Home;