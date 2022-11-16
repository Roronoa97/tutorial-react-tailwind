import React, { useContext, useEffect, useRef } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

const TransitionContext = React.createContext({
    parent: {}
})

function useIsInitialRender(){
    const isInitialRender = useRef(true);

    useEffect(() => {
        isInitialRender.current = false;
    }, [])

    return isInitialRender.current;
}

function CSSTransition({
    show,
    enter = '',
    enterStart = '',
    enterEnd = '',
    leave = '',
    leaveStart = '',
    leaveEnd = '',
    appear,
    unmountOnExit,
    tag = 'div',
    children,
    ...rest
}){
    // SPLIT - RETURN ARRAY
    // FILTER - RETURN ARRAY WITH PASSED CONDITION
    const enterClasses = enter.split(' ').filter((s) => s.length);
    const enterStartClasses = enterStart.split(' ').filter((s) => s.length);
    const enterEndClasses = enterEnd.split(' ').filter((s) => s.length);
    const leaveClasses = leave.split(' ').filter((s) => s.length);
    const leaveStartClasses = leaveStart.split(' ') .filter((s) => s.length);
    const leaveEndClasses = leaveEnd.split(' ').filter((s) => s.length);
    const removeFromDom = unmountOnExit;

    const nodeRef = React.useRef(null);
    const Component = tag;

    function addClasses(node, classes){
        classes.length && node.classList.add(...classes);

        // return classes.length if the value empty or '';
        // return node.classList.add(...classes) if the precedence is true;
    }

    function removeClasses(node, classes){
        classes.length && node.classList.remove(...classes);

        // return classes.length if the value empty or '';
        // return node.classList.add(...classes) if the precedence is true;
    }

    return (
        <ReactCSSTransition
            appear={appear}
            nodeRef={nodeRef}
            unmountOnExit={removeFromDom}
            in={show}
            addEndListener={(done) => { 
                nodeRef.current.addEventListener('transitionend', done, false)
            }}
            onEnter={() => {
                if(!removeFromDom) nodeRef.current.style.display = null;
                addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses])
            }}
            onEntering={() => {
                removeClasses(nodeRef.current, enterStartClasses)
                addClasses(nodeRef.current, enterEndClasses)
            }}
            onEntered={() => {
                removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses])
            }}
            onExit={() => {
                addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses])
            }}
            onExiting={() => {
                removeClasses(nodeRef.current, leaveStartClasses)
                addClasses(nodeRef.current, leaveEndClasses);
            }}
            onExited={() => {
                removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses])
                if(!removeFromDom) nodeRef.current.style.display = 'none';
            }}
        >
            <Component ref={nodeRef} {...rest} style={{ display: !removeFromDom ? 'none' : null }}>{children}</Component>
        </ReactCSSTransition>
    )
}

function Transition({ show, appear, ...rest }) {
    const { parent } = useContext(TransitionContext);
    const isInitialRender = useIsInitialRender();
    const isChild = show === undefined // TRUE / FALSE

    if(isChild){
        return (
            <CSSTransition appear={ parent.appear || !parent.isInitialRender } show={parent.show} {...rest} />
        )
    }

    return (
        <TransitionContext.Provider
            value={{
                parent: {
                    show,
                    isInitialRender,
                    appear
                }
            }}
        >
            <CSSTransition appear={appear} show={show} {...rest} />
        </TransitionContext.Provider>
    )
}

export default Transition