import React, {useEffect, useRef} from "react";
import css from './chat.module.css'
import ChatReduxForm from "./chatForm";
import {connect} from 'react-redux'
import {getChat, getMessage, sendMessage} from "../../../redux/dispatches/userDispatch";
import {WS_URL} from "../../../constants";

const Chat = (props) => {
    const ws = useRef(null);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [props.chats]);

    useEffect(() => {
        props.getChat()
        ws.current = new WebSocket(WS_URL);

        ws.current.onmessage = (evt) => {
            const data = JSON.parse(evt.data)
            props.getMessage(data.user, data.message)
        }

        return () => {
            ws.current.close();
        };
    }, [])


    const onSubmitMessage = ({message}) => {
        props.sendMessage(props.user.id, message).then(res => {
            ws.current.send(JSON.stringify({user: {name: res.data.user.name}, message}))
        })
    }

    return (
        <div className={'container'}>
            <div className={css.titleChat}>General Chat</div>
            <div className={css.messagesChat}>
                {props.chats.map(chat => <div key={chat._id} className={`row ${css.message}`}>
                    <span className={css.senderName}>{chat.user && chat.user.name}:</span>{chat.message}
                    <span className={'ml-auto'}> {new Date(chat.created_at).toLocaleString()}</span>
                </div>)}
                <div ref={messagesEndRef} />
            </div>
            <ChatReduxForm onSubmit={onSubmitMessage}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        chats: state.userReducer.chat,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, {getChat, sendMessage, getMessage})(Chat)
