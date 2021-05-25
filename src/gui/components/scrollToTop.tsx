import React, { useEffect, Fragment } from 'react';
import { History } from "history";
import { withRouter } from 'react-router-dom';

interface ScrollToTopProps {
    history: History
    children?: React.ReactNode
}

const ScrollToTop = ({ history, children }: ScrollToTopProps) => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        }
    }, [history]);

    return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);